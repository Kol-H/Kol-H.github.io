
let newP = document.getElementById("createNew");
let batchP = document.getElementById("batchUpload");

let newBtn = document.getElementById("newBtn");
let batchBtn = document.getElementById("batchBtn");


// display options for single vs batch upload
newP.style.display = "none";
batchP.style.display = "none";

newBtn.addEventListener("click", function() {
    if (newP.style.display == "none") {
        newP.style.display = "";
        batchP.style.display = "none";
    } else {
        newP.style.display = "none";
    }
});

batchBtn.addEventListener("click", function() {
    if (batchP.style.display == "none") {
        batchP.style.display = "";
        newP.style.display = "none";
    } else {
        batchP.style.display = "none";
    }
});



// POST for single & batch uploads
let createNew = document.getElementById("newSubmit");
createNew.addEventListener("click", function(e) {
    e.preventDefault();
    submitForm();
});
function submitForm() { //Single
    let params = new FormData(document.getElementById("newProduct")); // pass in entire form tag
    let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
    fetch("http://localhost:3000/broadleaf/admin/new", {
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