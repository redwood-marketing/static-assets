'use strict';

(function ($) {
	window.jQuery =
		window.jQuery ||
		function ($) {
			return typeof $ === 'string' ? document.querySelector($) : $;
		};

	renderForms();

	function parseOptions(expression) {
		/** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval! */
		try {
			return Function('"use strict";return (' + expression + ')')();
		} catch (e) {
			console.trace('Expression must be an Object/JSON-like String');
			return false;
		}
	}

	function renderForms() {
		document.querySelectorAll('hbspt-form').forEach(function (instance, index) {
			instance.id = 'hs-form-' + index;
			try {
				var options = parseOptions(instance.dataset.settings);
				instance.dataset.state = 'loading';
				var pre = {
					target: '#' + instance.id,
					formInstanceId: instance.id,
					onFormReady: onFormReady,
					onFormSubmit: onFormSubmit,
					onFormSubmitted: onFormSubmit,
				};
				hbspt.forms.create({
					...pre,
					...options,
				});
			} catch (e) {
				console.trace('Invalid Arguments Provided', e);
				return false;
			}
		});
	}

	function onFormReady(form) {
		var form = form[0],
			instance = form.closest('hbspt-form'),
			options = parseOptions(instance.dataset.settings),
			cookieReset = instance.querySelector('.cookie-reset-container'),
			email = instance.querySelector('[type="email"]'),
			submit = instance.querySelector('[type=submit]'),
			button = document.createElement('button');

		instance.dataset.state = 'loaded';
		instance.title = '';

		// replace input with button
		button.type = submit.type;
		button.value = submit.value;
		button.dataset.reactid = submit.dataset.reactid;
		button.innerHTML = submit.value + ' <i class="[ fa-solid fa-arrow-right fa-xs ][ d-none d-sm-inline ][ ml-1 ][ pl-1 ]"></i>';
		button.classList.add('btn', 'c-form__submit');
		submit.replaceWith(button);

		// disable RU emails. - use email, not form, else the field gets reenabled.
		email.addEventListener('input', function (event) {
			return (button.disabled = email.type === 'email' && email.checkValidity() && email.value.endsWith('.ru') ? true : false);
		});
		button.addEventListener('click', function (event) {
			if (email && email.value.endsWith('.ru')) {
				button.setAttribute('disabled', true);
				button.preventDefault();
			}}, 
		false);

		getGeo().then(function (geo) {
			form.elements.timezone.value = geo.timezone;
			form.elements.timezone.dispatchEvent(new Event('input', { bubbles: true }));
			form.elements.region.value = geo.region;
			form.elements.region.dispatchEvent(new Event('input', { bubbles: true }));
		});

		if (options.prefill) {
			for (var field in options.prefill) {
				try {
					var el = form.elements[field];
					el.value = options.prefill[field];
					el.dispatchEvent(new Event('input', { bubbles: true }));
				} catch (e) {
					console.warn("Form Element '" + field + "' doesn't exist");
				}
			}
		}
	}

	function onFormSubmit(form) {
		var form = form[0],
			submit = form.querySelector('[type=submit]'),
			instance = form.closest('hbspt-form');
		instance.dataset.state = 'submitting';
		submit.value = 'Sending';
	}

	function getGeo() {
		return new Promise(function (resolve, reject) {
			fetch('https://get.geojs.io/v1/ip/geo.json')
				.then(function (response) {
					if (!response.ok) throw new Error('Network response was not OK');
					return response.json();
				})
				.then(function (data) {
					fetch('https://www.redwood.com/wp-json/utilities/geo/v1/region/' + data.country_code)
						.then(function (response) {
							if (!response.ok) throw new Error('Network response was not OK');
							return response.json();
						})
						.then(function (region) {
							try {
								resolve({
									region: region,
									timezone: data.timezone,
								});
							} catch (error) {
								resolve({
									region: 'NA',
									timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
								});
							}
						});
				});
		});
	}
})(jQuery);
