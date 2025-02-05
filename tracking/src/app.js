/*
* debugger
* http://localhost/?utm_term=jams%20scheduler&utm_campaign=13699724608&utm_content=530384573472&utm_source=adwords&utm_medium=cpc&utm_adgroup=123858829893&gclid=CjwKCAjwhaaKBhBcEiwA8acsHGsnkHqaSdqOekxUVztueP13ol2SqyovYUGiAcKEW4IuLcJbbMDP-BoCdMcQAvD_BwE
*/
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments) }

class UTMCookie {
    constructor() {
        this.ver = '2.2.0';
        this.targetKeys = [
            "email",
            "firstname",
            "lastname",
            "ga_client_id",
            "utm_source",
            "utm_term",
            "utm_campaign",
            "utm_content",
            "utm_medium",
            "utm_adgroup",
            "utm_network",
            "gclid",
            "msclkid"
        ]
        this.trackingData = this.getUrlVars();
        this.cookiePacking(this.trackingData);
    }
    
    saveCookie(name, value, days = 7, path = "/") {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            var expires = ";Expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + ";Path=" + path + ";SameSite=Lax;Secure";
    }
    
    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    /**
     * @todo use URLSearchParams
     */
    getUrlVars() {
        let entries = Object.fromEntries(new URLSearchParams(window.location.search));
        return entries;
    }
    
    isBase64(str) {
        if (str === "" || str.trim() === "") return false;
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }

    sanitizeData(iterator, whitelist = this.targetKeys) {
        let data = Array.from(iterator);
            data = data.filter(([key, value]) => (value && whitelist.includes(key)));
            data = Object.fromEntries(data);
        return data;
    }
    
    formUnpack(form) {
        const cookies = this.cookieUnpack();
        for (let prop in cookies) {
            const val = cookies[prop];
            const target = form.querySelector('[name="' + prop + '" i]');
            if (val && target) {
                target.value = val;
            }
        }
    }
    
    formPacking(form) {
        const data = this.sanitizeData(new FormData(form).entries());
        this.cookiePacking(data);
    }
    
    cookieUnpack() {
        const fromCookie = this.getCookie("rwd-info");
        if (!fromCookie) return;
        
        let CookiedData = {};
        
        if (this.isBase64(fromCookie)) {
            // OLD unmanggled base64
            CookiedData = JSON.parse(atob(fromCookie));
        } else {
            // manggled base64
            let DecodedCookie = fromCookie.replace("ReDW00d", "");
            CookiedData = JSON.parse(atob(DecodedCookie));
        }
        
        return this.sanitizeData(Object.entries(CookiedData));
    }
    
    cookiePacking(newData) {
        const OldData = this.cookieUnpack();
        const cleanedData = Object.fromEntries(Object.entries(newData).filter(([_, v]) => v != null && v != ""));
        let result;
        if (OldData) {
            result = Object.assign(OldData, cleanedData);
        } else result = newData;
        let encoded = btoa(JSON.stringify(result));
        const rng = Math.floor(Math.random() * encoded.length);
        encoded = encoded.substring(0, rng) + "ReDW00d" + encoded.substr(rng);
        this.saveCookie("rwd-info", encoded, 28);
    }
}

window.utms = new UTMCookie();
