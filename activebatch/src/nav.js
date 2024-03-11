"use strict";
const megaMenu = {
	initialized: false,
	megaHeader: null,
	menuItems: null,
	megaMenu: null,
	subMenus: null,
	megaMenuHeight: null,
	currentMenu: '',
	currentType: '',
	extraMenu: null,
	mobileTarget: null,
	bodyY: 0,
    overlay: null,

	backBtn: function () {
		this.megaHeader.querySelector('.mega_navigation__back').addEventListener('click', (event) => {
			event.preventDefault();
			this.closeMenu();

		});
	},
	toggleBtn: function () {
		this.megaHeader.querySelector('.mega_navigation__toggle').addEventListener('click', (event) => {
			event.preventDefault();
			this.closeMenu();
			this.megaHeader.classList.toggle('menu-visible');
			this.lockBody( this.megaHeader.classList.contains('menu-visible'), true );
		});
	},
	lockBody: function ( toggle, scrolLock ) {
		// Body lock down with prevent layout shift so it doesn't scroll when menu is open.
		if ( toggle ) {
			this.bodyY = document.documentElement.scrollTop || 0;
			document.body.style.setProperty('position', 'fixed');
			document.body.style.setProperty('top', `-${this.bodyY}px`);
			document.documentElement.style.setProperty('scroll-behavior', 'auto');
			this.megaHeader.insertAdjacentElement('afterend', this.overlay);
		} else {
			document.body.style.removeProperty('position');
			document.body.style.removeProperty('top');
			if( scrolLock ){ 
				document.documentElement.scrollTop = parseInt(this.bodyY);
			 }
			document.documentElement.style.removeProperty('scroll-behavior');
			this.overlay.remove();
		}
	},
	findSibling: function (needle, haystack) {
		let sibling = haystack.nextElementSibling;
		// console.log(sibling);
		while (sibling) {
			if (sibling.dataset.menuTarget === needle) {
				return sibling;
			}
			sibling = sibling.nextElementSibling;
		}
	},
	resizeMega: function (target) {
		if (!this.isMobile()) {
			return;
		}
		const windowHeight = window.innerHeight;
		const submenuHeight = target.offsetHeight;
		this.megaMenuHeight = this.megaMenu.offsetHeight;
		this.megaMenu.scrollTo(0, 0);
		// console.log(`Win: ${windowHeight} Menu: ${this.megaMenuHeight} SubMenu: ${submenuHeight}`);

		if (windowHeight >= this.megaMenuHeight && windowHeight >= submenuHeight && this.megaMenuHeight >= submenuHeight) {
			this.megaMenu.style.setProperty('height', submenuHeight + 'px');
			this.megaMenu.style.setProperty('overflow-y', 'hidden');
		}
	},
	openMenu: function (target) {

		if (!target) {
			return;
		}
		const menuName = target.dataset.menu;
		if (!menuName) {
			return;
		}
		// console.log('Opening', menuName);
		if (this.currentMenu !== menuName) {
			this.closeMenu();
		}
		const subNav = this.findSibling(menuName, target);
		if (subNav) {
			subNav.classList.add('menu--active');
			this.currentMenu = menuName;

			this.resizeMega(subNav);

			if (this.currentType == 'mobile') {
				this.megaHeader.classList.add('mobile-sub-open');
			}
		}
	},
	closeMenu: function () {
		// console.log('Closing');
		this.currentMenu = '';
		this.megaHeader.querySelectorAll('.menu--active').forEach((ele) => {
			ele.classList.remove('menu--active');
		});
		this.megaHeader.classList.remove('mobile-sub-open');
		if (this.isMobile() && Number.isInteger(this.megaMenuHeight)) {
			// for animation
			this.megaMenu.style.setProperty('height', this.megaMenuHeight + 'px');
			this.megaMenu.style.setProperty('overflow-y', 'auto');
		} else {
			this.megaMenu.removeAttribute('style');
		}
	},
	desktopEvent: function () {
		// console.log('desktop event');
		this.menuItems.forEach((menuItem) => {
			const menuName = menuItem.dataset.menu;
			if (menuName) {
				menuItem.addEventListener('mouseover', this.handlers.mouseover);
			} else {
				menuItem.addEventListener('mouseover', this.handlers.mouseleave);
			}
		});
		this.subMenus.forEach((submenu) => {
			submenu.addEventListener('mouseleave', this.handlers.mouseleave);
		});
	},
	mobileEvent: function () {
		// console.log('mobile event');
		this.menuItems.forEach((menuItem) => {
			const menuName = menuItem.dataset.menu;
			if (menuName) {
				menuItem.addEventListener('click', this.handlers.click);
			}
		});
	},
	handlers: {
		mouseover: function (event) {
			megaMenu.openMenu(event.target);
		},
		mouseleave: function () {
			megaMenu.closeMenu();
		},
		click: function (event) {
			event.preventDefault();
			megaMenu.openMenu(event.target);
		},
	},
	isMobile: function () {
		return window.innerWidth < 992;
	},
	menuBinding: function () {
		this.closeMenu();
		this.lockBody(false, false);
		this.megaMenuHeight = null;

		if ( this.isMobile() && this.currentType !== 'mobile' ) {
			this.menuItems.forEach((menuItem) => {
				const menuName = menuItem.dataset.menu;
				if (menuName) {
					menuItem.removeEventListener('mouseover', this.handlers.mouseover);
				} else {
					menuItem.removeEventListener('mouseover', this.handlers.mouseleave);
				}
			});
			this.subMenus.forEach((submenu) => {
				submenu.removeEventListener('mouseleave', this.handlers.mouseleave);
			});
			this.currentType = 'mobile';
			this.mobileEvent();
		} 

		if ( !this.isMobile() && this.currentType !== 'desktop' ){
			this.menuItems.forEach((menuItem) => {
				menuItem.removeEventListener('click', this.handlers.click);
			});
			this.currentType = 'desktop';
			this.desktopEvent();
		}
	},
	init: function () {
		console.log('Lok’tar Ogar v0.31');
		if (this.initialized) {
			return;
		}
		this.megaHeader = document.querySelector('.mega_navigation');
		if (!this.megaHeader) {
			return;
		}
		this.extraMenu = this.megaHeader.querySelector('.extra_menu');
		if (this.extraMenu) {
			this.mobileTarget = this.megaHeader.querySelector('.extra_menu--mobile-target');
			this.mobileTarget.innerHTML = this.extraMenu.outerHTML;
		}
		this.megaMenu = this.megaHeader.querySelector('.mega_menu');
		this.menuItems = this.megaHeader.querySelectorAll('.mega_menu__item');
		this.subMenus = this.megaHeader.querySelectorAll('.mega_menu__sub_container');

        this.overlay = document.createElement('div');
        this.overlay.classList.add('mega_navigation__overlay');

		this.toggleBtn();
		this.backBtn();
		this.menuBinding();

		window.addEventListener('resize', () => {
			this.menuBinding();
		});
		this.initialized = true;
	},
};
document.addEventListener('DOMContentLoaded', () => {
	megaMenu.init();
});
