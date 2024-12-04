"use strict";
const create = require("prompt-sync");
const model = require("../models/broadleaf.model");

function productsPage(req, res, next) {
    let products = model.getProductsAll()
    res.render("admin/admin-products", {products:products});
}

function uploadPage(req, res, next) {
    res.render("admin/admin-upload");
}

function editPage(req, res, next) {
    let product = model.getProductDetails(req.params.productID);
    res.render("admin/product-edit", {product : product});
}

function editProduct(req, res, next) {
    let productID = req.body.productID;
    let product_name = req.body.product_name;
    let description = req.body.description;
    let price = req.body.price;
    let img_url = req.body.img_url;
    let categoryID = req.body.categoryID;
    console.log("EDITING");
    console.log("ID: " + productID + "\nName: " + product_name + "\nDesc: " + description
        + "\nPrice: " + price + "\nIMG: " + img_url + "\nCat: " + categoryID
);
    let result = false;
    try {
        result = model.editProduct(productID, product_name, description, price, img_url, categoryID);
        /*if (req.query.categoryID === 1 || req.query.categoryID === 3) {
            model.editProduct(productID, product_name, description, price, img_url, category, filter1, filter2, filter3);
        } else if (req.query.categoryID === 2) {
            model.editProduct(productID, product_name, description, price, img_url, category, filter1);
        }*/
    } catch (err) {
        res.type("text");
        res.status(500).send("Server error: " + err);
        console.log(err);
    }
    console.log(result);
    res.redirect("http://localhost:3000/broadleaf/admin");
}

function deleteProduct(req, res, next) {
    model.deleteProduct(req.params.productID);
    res.redirect("http://localhost:3000/broadleaf/admin");
}

function createProduct(req, res, next) {
    let productName = req.body.productName;
    let desc = req.body.description;
    let img_url = req.body.imgUrl;
    let price = req.body.price;
    let categoryID = req.body.category;

    console.log("creating product \"" + productName + "\" with categoryID: " + categoryID + "...");
    let result = model.createProduct(productName, desc, img_url, price, categoryID);
    console.log(result);
    //res.redirect("http://localhost:3000/broadleaf/admin");
}


module.exports = {
    productsPage,
    uploadPage,
    editPage,
    editProduct,
    deleteProduct,
    createProduct
}