(function() {

    var calendlyDomElements = document.querySelectorAll("[data-calendly]");

    if ( !!calendlyDomElements.length ) {
        
        var calendlyScript     = document.createElement("script");
            calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
            calendlyScript.async = true; 
            calendlyScript.defer = true;

        const style = document.createElement('style');

        style.textContent = `
            [data-calendly] {
                width: min(1000px, 90vw);
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                min-height: 650px;
                height: 100%;
            }

            [data-calendly] iframe {
                min-height: 650px;
                height: 100%;
            }
        `;
            
        calendlyScript.addEventListener("load", function(event) {
            renderCalendars(calendlyDomElements);            
        });

        document.head.appendChild(calendlyScript);
        document.head.appendChild(style);
    }

    

    function maybeSanitizeColor(color) {
        if (typeof color !== "string" || /var\(--\w+\)/i.test(color) ) 
            return false;

        if ( color.includes("--") )
            color = getComputedStyle(document.documentElement).getPropertyValue(color);
        
        return color.replace("#", "");
    }

    function parseOptions(options) {
        /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval! */

        try {
            const styles = Function('"use strict";return (' + options + ')')();
            for ( var prop in styles ) styles[prop] = maybeSanitizeColor(styles[prop]);
            return styles;
        } catch (e) {
            console.trace("Expression must be an Object/JSON-like String")
            return false
        }
    }

    function renderCalendars (calendars) {
        calendars.forEach(function (instance) {

            var options  = new URLSearchParams( parseOptions(instance.dataset.options) ).toString(),
                settings = {
                    parentElement: instance,
                    url: instance.dataset.fallback + "?" + options,
                    prefill: JSON.parse(instance.dataset?.prefill?.replaceAll("'", "\"") ?? "{}")
                };
                

            try {
                let cached = JSON.parse( atob(sessionStorage.getItem("rwd-info")) );
                    cached = cached.filter(({name}) => (["First Name", "Last Name", "Company Email"].includes(name)));
                    cached = cached.map(({name, value}) => ([name, value]));
                    cached = new Map(cached);
                
                settings.prefill.email = cached.get("Company Email");
                settings.prefill.name  = `${cached.get("First Name")} ${cached.get("Last Name")}`;
            } catch (error) {
                console.warn(error)
            }

            fetch('https://get.geojs.io/v1/ip/geo.json')
                .then( function(response) { 
                    if (!response.ok) 
                        throw new Error('Network response was not OK');
                    return response.json(); 
                })
                .then( function(data) {
                    
                    var query = {
                        product: instance.dataset.product,
                        funnel : instance.dataset.funnel,
                        country: data.country_code
                    };

                    var ENDPOINT = "https://www.redwood.com/wp-json/utilities/calendly/v1/?";
                        ENDPOINT += "product=" + query.product + "&funnel=" + query.funnel + "&country=" + query.country

                    fetch(ENDPOINT)
                        .then( function (response) { 
                            if (!response.ok) 
                                throw new Error('Network response was not OK');
                            return response.json(); 
                        })
                        .then( function (calendar) {
                            if ( !!calendar ) {
                                settings.url = calendar.url + "?" + options;
                                Calendly.initInlineWidget(settings);
                            } else {
                                throw new Error('No results for this query');
                            }
                        })
                        .catch( function(error) { Calendly.initInlineWidget(settings) } );
                } )
                .catch( function(error) { Calendly.initInlineWidget(settings) } );
            
            window.addEventListener("message", function (e) {
                if ( e.data.event === "calendly.event_type_viewed" )
                    instance.dataset.calendly = "loaded"; 
                if ( e.data.event === "calendly.event_scheduled" && instance.dataset.successUrl ) 
                    window.location.replace(instance.dataset.successUrl);
            });

        });
    }
    
})();