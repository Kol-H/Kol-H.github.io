let navs = document.getElementsByClassName("nav");
let editBtns = document.getElementsByClassName("edit");
let deleteBtns = document.getElementsByClassName("delete");


Array.from(navs).forEach(nav => {
    nav.addEventListener("click", function (e) {
        e.preventDefault();
        goToPage(nav.name);
    });
});
function goToPage(page) {
    location.assign("http://localhost:3000/broadleaf/admin/" + page);
}

let logo = document.getElementById("logo");
logo.addEventListener("click", function(e) {
    e.preventDefault();
    location.assign("http://localhost:3000/broadleaf/admin");
});

Array.from(editBtns).forEach(btn => {
    btn.addEventListener("click", function(e) {
        console.log(btn.name);
        e.preventDefault();
        editPage(btn.name);
    })
});
function editPage(productID) {
    console.log("Editing product with ID: " + productID);
    location.assign("http://localhost:3000/broadleaf/admin/" + productID);
}

Array.from(deleteBtns).forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        deletePage(btn.name);
    })
});
function deletePage(productID) {
    let jsonBody = JSON.stringify({productID: productID});
    fetch("http://localhost:3000/broadleaf/admin/" + productID, {
        method: "DELETE",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body:jsonBody
    });
}