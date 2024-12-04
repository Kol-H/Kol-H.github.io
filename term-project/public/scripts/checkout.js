"use strict";

window.onload = init;

function init() {

    let checkout = document.getElementById("checkout");

    checkout.addEventListener("click", function(e) {
        e.preventDefault();
        submitForm();
        location.assign("http://localhost:3000/");
    });
    function submitForm() { //Single
        let params = new FormData(document.getElementById("checkoutForm")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("http://localhost:3000/broadleaf/checkout", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .catch(alert);
    }
}