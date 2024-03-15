window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments) }



// dataLayer.push(function() {
//     console.log(2)
// })

gtag("set", {
    "_domain": this.location.host
})

gtag("get", "G-88C86EKJ56", "_domain", function(domain) { console.log(domain) })

// gtag("get", "G-88C86EKJ56", "client_id", function(client_id) {
//     console.log(client_id)
// })


window.addEventListener('message', event => {
    if(event.data.type === 'hsFormCallback') {
        //console.log(event.data, event.data.data);
    }
});
"use strict";
async function getClientId() {
    return await new Promise(resolve => {
        gtag("get", measurementId, "client_id", (clientId) => {
            const product = location.pathname.includes("finance") ? "FA" : "RMJ"
            resolve(`${product}::${clientId}`);
        })
    })
}

getClientId().then((a) => { console.log(a) })