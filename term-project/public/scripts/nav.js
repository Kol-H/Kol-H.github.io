"use strict";

(function() {
    let logo = document.getElementById("logo");
    let navs = document.getElementsByClassName("nav");
    let cart = document.getElementById("cart");
    let pfp = document.getElementById("pfp");

    Array.from(navs).forEach(nav => {
        nav.addEventListener("click", function (e) {
            e.preventDefault();
            goToCategory(nav.name);
        });
    });
    function goToCategory(categoryID) {
        location.assign("http://localhost:3000/broadleaf/products/" + categoryID);
    }


    logo.addEventListener("click", function(e) {
        e.preventDefault();
        location.assign("http://localhost:3000/");
    });

    cart.addEventListener("click", function(e) {
        e.preventDefault();
        location.assign("http://localhost:3000/broadleaf/cart");
    });

    /*
    pfp.addEventListener("click", function(e) {
        e.preventDefault();
        if (pfp.name == "logout") {
        location.assign("http://localhost:3000/auth/logout");
        } else {
            location.assign("http://localhost:3000/auth/google");
        }
    }); */
}());
    