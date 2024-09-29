"use strict";

window.measurementId = window.measurementId ?? document.currentScript.dataset.measurementId;
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments) }

function DOMReady(callback) {
    let { readyState } = document; 

    if ( readyState === "complete" || readyState === "interactive" )
        callback(); 
    else
        document.addEventListener("DOMContentLoaded", callback)
}

DOMReady(() => {

    (function formTracking () {

        const fields = {
            get cached() {
                try {
                    let cachedData = sessionStorage.getItem("rwd-info");
                        cachedData = JSON.parse(atob(cachedData));

                    return [...cachedData]
                } catch (e) { return [] }
            },
            /**
             * @see https://help.instapage.com/hc/en-us/articles/115005969527-Passing-UTM-parameters-from-the-URL-to-a-hidden-field
             */
            region            : [...document.getElementsByName("region")],
            timezone          : [...document.getElementsByName("timezone")],
            clientId          : [...document.getElementsByName("ga_client_id")],
            usertoken         : [...document.getElementsByName("usertoken")]
        }

        async function getHsUserToken() {
            const _hsq      = window._hsq = window._hsq || [];
            const usertoken = await new Promise((resolve, reject) => {
                try {
                    resolve(__hsUserToken)
                } catch(e) {
                    _hsq.push(['addIdentityListener', (hstc, hssc, hsfp) => {
                        resolve(__hsUserToken || hstc.match(/\.(\w+)\./i)[1])
                    }]);
                }
            });

            return usertoken
                
        }

        /**
         * @todo Acronym Standardization
         * @returns Product Acronym :: Google Analytics Client ID
         */
        async function getClientId(measurementId) {
            return await new Promise(resolve => {
                gtag("get", measurementId, "client_id", (clientId) => {
                    const product = location.host.includes("tidalsoftware.com") ? "TS" : ( location.host.includes("finance.redwood" ) ? "FA" : "RMJ");
                    resolve(`${product}::${clientId}`);
                })
            })
        }

        async function geoLookup() {

            async function getGeo() {
                try {
                    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
                    if (!response.ok) 
                        throw new Error('Geo response was not OK');
                    const geo = await response.json();

                    return { country: geo.country_code, timezone: geo.timezone };
                } catch (e) { 
                    return { country: "N/A", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone } 
                }
            }

            async function getRegion(ISO3166) {
                try {
                    const response = await fetch(`https://redwood.com/wp-json/utilities/geo/v1/region/${ISO3166}`);
                    if (!response.ok) 
                        throw new Error('Region response was not OK');
                    const region = response.json();

                    return region;
                } catch (e) { 
                    return "NA"
                }
            }

            const {timezone, country} = await getGeo();
            const region              = await getRegion(country);

            return {region, timezone}
        }

        if ( !!fields.usertoken.length ) {
            getHsUserToken().then(usertoken => {
                console.log(usertoken)
                fields.usertoken.forEach(field => { field.value = usertoken })
            })
        }

        if ( !!fields.clientId.length ) {
            getClientId().then(clientId => {
                fields.clientId.forEach(field => { field.value = clientId })
            })
        }

        if ( !!fields.region.length || !!fields.timezone.length ) {
            geoLookup().then(({timezone, region}) => {
                fields.region.forEach( (field)   => { field.value = region } );
                fields.timezone.forEach( (field) => { field.value = timezone } );
            })
        }

        if ( !!fields.cached.length ) {
            fields.cached.forEach(({name, value}) => {
                document.getElementsByName(name).forEach(input => {
                    input.value = input.value || value;
                })
            })
        }

    })();

    /**
     * Appends URL params to links pointing to external websites
     * @todo Replace patch with consolidated cross-domain tracking method
     */
    (function crossDomainTrackingPatch() {
        const URLParams   = location.search ? new URLSearchParams(location.search) : false;
        const rootDomain  = location.hostname.split(".").slice(-2).join(".");
        const targetLinks = document.querySelectorAll(`[href^='https://'][href*='${rootDomain}'][target='_blank']`);
        if ( URLParams ) {
            targetLinks.forEach( link => {
                link.search = (() => {
                    const linkParams = new URLSearchParams(link.search);
                    for ( const [key, value] of URLParams ) {
                        linkParams.append(key, value)
                    }
                    return linkParams;
                })()
            })
        }
    })();
    
});

(function onFormSubmit () {

    /**
     * @see https://help.instapage.com/hc/en-us/articles/115001889787-Form-Submission-tracking-for-Google-Tag-Manager
     */

    window.instapageFormSubmitSuccess = (form) => {

        const formData = new FormData(form);
        const blacklist = [
            "salesforce-integration", 
            "lpsSubmissionConfig", 
            "thank-you-message", 
            "thank-you-message-timeout",
            "redirect",
            "hubspot-integration"
        ];

        let cacheable, 
            personalizationPayload = {
                firstName: formData.get("First Name"),
                lastName : formData.get("Last Name"),
                email    : formData.get("Company Email"),
                funnel   : formData.get("Lead Funnel"),
                product  : formData.get("Product Source"),
                company: {
                    name  : formData.get("Company"),
                }
            };

        /* Set cached fields */
        cacheable = Array.from(formData, ([name, value]) => ({name, value}));
        cacheable = cacheable.filter(({name, value}) => (!!value && !blacklist.includes(name)));
        cacheable = JSON.stringify(cacheable);
        cacheable = btoa(cacheable);
        sessionStorage.setItem("rwd-info", cacheable);

        /** 
         * Send Data to Mutiny
         * @see https://support.mutinyhq.com/en/articles/3431667-mutiny-identify-sdk
         */

        window.mutiny && window.mutiny.client.identify(null, personalizationPayload).then(() => { console.log(personalizationPayload) })

        /* Marked for deletion */
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'instapageFormSubmissionSuccess',
            'instapageSubmittedForm': form
        }); /* Marked for deletion */

    };

})();    
