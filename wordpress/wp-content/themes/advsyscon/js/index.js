"use strict";

/**
 * IMPORTANT NOTE
 * This code uses ES6 Features and needs to be compiled using Babel
 */

(function ($) {

    const CookieService = {

        setCookie(name, value, days) {
            let expires = '';
    
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
    
            document.cookie = name + '=' + (value || '')  + expires + ';';
        },
    
        getCookie(name) {
            const cookies = document.cookie.split(';');
    
            for (const cookie of cookies) {
                if (cookie.indexOf(name + '=') > -1) {
                    return cookie.split('=')[1];
                }
            }
    
            return null;
        }
    }

    $(document).ready( function () {

        (function utilityFunctions () {

            $('.cat-toggle').on('click', function() {
                $('.cat-list').slideToggle(300);
            })
    
            $('.sidebar-icon').on('click', function() {
                $(this).toggleClass('changed');
                $('#sidebar').toggleClass('changed');
            });
    
            $(".mobile-trigger").click(function() {
                $(".mobile-trigger i").toggleClass("changed");
                $("header nav").slideToggle();
            });

        })();        

    } );

})(jQuery);