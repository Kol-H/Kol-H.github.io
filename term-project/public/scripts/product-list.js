"use strict";

(function() {
    let products = document.getElementsByClassName("product");

    Array.from(products).forEach(product => {
        product.addEventListener("click", function(e) {
            e.preventDefault();
            productDetails(product.id);
        })
    })

    function productDetails(productId) {
        location.assign("http://localhost:3000/broadleaf/product/"+productId);
    }
}());