"use strict";

this != this.top && this.top.postMessage("From Frame", "https://videos.redwood.com");

this.addEventListener("message", event => {
    console.log(event);
    if (event.origin !== "https://play.vidyard.com")
        return;

    event.source.postMessage("From Top", event.origin);
});

window.onVidyardAPI = (vidyardEmbed) => {
    vidyardEmbed.api.addReadyListener((_, player) => {
        fetch(`https://www.redwood.com/wp-json/utilities/vidyard/v1/users/${player.uuid}`)
            .then( response => response.json() )
            .then( result => {
                window.user = result.data;
                const sidebar = document.createElement("sidebar");
                sidebar.classList.add("rw-sidebar");
                sidebar.innerHTML = `
                    <div class="rw-sidebar__box">
                        <h3>Schedule a meeting</h3>
                        <p>Ready to See How Redwood Can Orchestrate Your Entire Tech Stack?</p>
                        <a class="rw-btn" href="https://${window.user.calendar_link}" target="_blank">Put Time On My Calendar →</a>
                    </div>
                `;

                document.getElementById("year").innerHTML = new Date().getFullYear();
                document.getElementById("main-content").appendChild(sidebar);

            })
            .catch( error => console.warn(error) );
    });
}