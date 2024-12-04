"use strict";

window.onload = init;

function init() {
    let paybtn = document.getElementById("proceedToPay");

    paybtn.addEventListener("click", function (e) {
        let totalCost = document.getElementById("total").innerText.substring(1);
        e.preventDefault();
        location.assign("http://localhost:3000/broadleaf/checkout/" + totalCost);
    });

    // quantity
    let products = document.getElementsByClassName("product");
    
    Array.from(products).forEach(product => {
        let quantity = product.getElementsByClassName("quantity")[0];
        
        product.getElementsByClassName("dec")[0].addEventListener("click", function() {
            quantity.value = Number(quantity.value) - 1;
        });
        product.getElementsByClassName("inc")[0].addEventListener("click", function() {
            quantity.value = Number(quantity.value) + 1;
        });

        product.addEventListener("focusout", function(e){
            e.preventDefault();
            let updateForm = product.getElementsByClassName("quantity-grp")[0];
            updateQuantity(updateForm);
            product.getElementsByClassName("total-product-cost")[0].value = product.getElementsByClassName("product-cost")[0] + quantity;
        });
        
    });

    function updateQuantity(updateForm) {
        let params = new FormData(updateForm);
        let jsonBody = JSON.stringify(Object.fromEntries(params));
        fetch("http://localhost:3000/broadleaf/updateCart", {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
        .then(reload)
        .catch(alert);
    }
    function reload() {
        window.reload();
    }


}
