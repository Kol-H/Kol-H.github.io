"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/broadleaf.controller");
const adminController = require("../controllers/admin.controller")

//Homepage
router.get("/", controller.homePage);

// PRODUCT
//list products in category
router.get("/products/:categoryID", ensureAuth, controller.getProductsByCategory);
//get product details
router.get("/product/:productID", ensureAuth, controller.getProductDetails); 
//add to cart
router.post("/addToCart", ensureAuth, controller.addToCart); 
//update cart product
router.put("/updateCart", controller.updateCart);

// CART
//view cart
router.get("/cart", ensureAuth, controller.cart);
//go to checkout page
router.get("/checkout/:totalCost", ensureAuth, controller.goToCheckout);
//checkout
router.post("/checkout", controller.checkout);

// ORDER
//list orders
//router.get("/orders/all", controller.listOrders);
//get order details
//router.get("/orders/:orderID", controller.orderDetails);

// ADMIN
router.get(["/admin/products", "/admin"], adminController.productsPage);

router.get("/admin/upload", adminController.uploadPage);

router.get("/admin/:productID", adminController.editPage);

router.put("/admin/:productID", adminController.editProduct);

router.delete("/admin/:productID", adminController.deleteProduct);

router.post("/admin/new", adminController.createProduct);


// AUTH
function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }  
    next();
}

module.exports = router;