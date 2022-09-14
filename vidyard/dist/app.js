"use strict";

this != this.top && this.top.postMessage("From Frame", "https://videos.redwood.com");

this.addEventListener("message", event => {
    console.log(event);
    if (event.origin !== "https://play.vidyard.com")
        return;

    event.source.postMessage("From Top", event.origin);
});