// step
let add1 = document.getElementById("addBy1");
let add5 = document.getElementById("addBy5");
let add100 = document.getElementById("addBy100");
let step = 1;

function getStep() {
    if (add1.checked) {
        step = 1;
    } else if (add5.checked) {
        step = 5;
    } else if (add100.checked) {
        step = 100;
    } else {
        step = 2;
    }
}

// quantity
let dec = document.getElementsByClassName("dec")[0];
let inc = document.getElementsByClassName("inc")[0];
let quantity = document.getElementById("quantity");

dec.addEventListener("click", function() {
    getStep();
    quantity.value = Number(quantity.value) - step;
});
inc.addEventListener("click", function() {
    getStep();
    quantity.value = Number(quantity.value) + step;
});

//addToCart
let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function(e) {
    e.preventDefault();
    submitForm();
    //location.assign("http://localhost:3000/broadleaf/addToCart");
});
function submitForm() { //Single
    let params = new FormData(document.getElementById("addProduct")); // pass in entire form tag
    let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
    fetch("http://localhost:3000/broadleaf/addToCart", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: jsonBody,
    })
        //.then(checkStatus)
        //.then(reload)
        .catch(alert);
}
function reload() {
    location.reload();
}