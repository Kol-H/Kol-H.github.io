"use strict";
const model = require("../models/broadleaf.model");

async function homePage(req, res, next) {
    //console.log(req.session.uuid);
    res.render("index", {title: "Broadleaf Warehouse"});
}



// PRODUCTS

function getProductsByCategory(req, res, next) {
    try {
        let products = model.getProductsByCategory(req.params.categoryID);
        res.render("products", {title: "hello products", products : products, user : req.user});
    } catch (error) {
        next(error);
    }
}

function getProductDetails(req, res, next) {
    try{
        let product = model.getProductDetails(req.params.productID);
        res.render("details", {title: product.product_name, product : product, user : req.user});
    } catch (error) {
        next(error);
    }
}

function addToCart(req, res, next) {
    let userID = req.user.id;
    let productID = req.body.productID;
    let quantity = req.body.quantity;
    //console.log("USer id is: " + userID);

    let cart = model.getCartId(userID);
    
    if (!cart) {
        model.createCart(userID);
        cart = model.getCartId(userID);
    }
    let cartID = cart.cartID;
    model.addToCart(cartID, productID, quantity);
}

function updateCart(req, res, next) {
    let userID = req.user.id;
    let productID = req.body.productID;
    let quantity = req.body.quantity;

    let cart = model.getCartId(userID);
    let cartID = cart.cartID;

    model.updateCart(cartID, productID, quantity);
}

// CART

function cart(req, res, next) {
    try {
        //let user = session.uuid;
        let user = req.user.id;
        let products;
        if (user) {
            products = model.getCart(user);
        }
        res.render("cart", {title: "Cart", products : products, user : req.user});
    } catch (error) {
        next(error);
    }
}

function goToCheckout(req, res, next) {
    let totalCost = req.params.totalCost;
    res.render("checkout", {title : "Checkout", user : req.user, totalCost : totalCost});
}

function checkout(req, res, next) {
    let userID = req.user.id;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zip;
    let totalCost = req.body.total;
    let cardNum = req.body.payment;

    let cart = model.getCartId(userID);
    let cartID = cart.cartID;

    let result = model.checkout(cartID, userID, address, city, state, zip, cardNum, totalCost);
    res.render("index", {title: "Broadleaf", user: req.user});
}


module.exports = {
    homePage,
    getProductsByCategory,
    getProductDetails,
    cart,
    addToCart,
    updateCart,
    goToCheckout,
    checkout
}