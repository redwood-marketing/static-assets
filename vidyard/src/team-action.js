
"use strict";

(()=>{
    const topWindow = [...this.location.ancestorOrigins].at(-1);

    function appendAction(payload) {

        const { full_name, job_title, calendar_link } = payload;
        const action = document.createElement("div");

        action.classList.add("action");
        action.innerHTML = `
            <img
                src="https://cdn.redwood.com/wordpress/redwood-circle.svg"
                width="30"
                height="30"
                loading="lazy"
            >
            <h1 class="action__name">${ full_name }</h1>
            <p class="action__role">${ job_title } | Redwood</p>
            <a
                href="${ calendar_link }"
                class="action__cta"
                target="_blank">Schedule a meeting with me</a>
            <video
                class="action__bg"
                width="160" height="90"
                autoplay loop playsinline muted
            >
                <source
                    src="https://cdn.redwood.com/wordpress/vidyard.mp4"
                    type="video/mp4"
                >
                Sorry, your browser doesn't support embedded videos.
            </video>
        `;

        document.querySelector(".vidyard-cta-holder > div").appendChild(action);
    };

    if (topWindow === "https://videos.redwood.com") {
        this.top.postMessage({
            type: "actionCallback",
            name: "onActionDisplayed",
            signature: "s"
        }, "https://videos.redwood.com");

        this.addEventListener("message", event => {
            if (event.origin !== "https://videos.redwood.com")
                return;

            appendAction(event.data)

        });
    } else if (topWindow === "https://secure.vidyard.com") {
        const videoUUID = this.location.pathname.match(/\/?(\w+)\/cta\/(\d+)/)[1]
        fetch(`https://www.redwood.com/wp-json/utilities/vidyard/v1/users/${videoUUID}`)
            .then( response => response.json() )
            .then( result => {
                appendAction(result.data)
            })
            .catch( error => console.warn(error) );
    }
})();
