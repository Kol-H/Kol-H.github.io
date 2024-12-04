"use strict";
const db = require("./db-conn");

const detail_info = "p.*, cp.quantity";
const cart_info = "p.product_name, p.price, p.img_url, p.categoryID, cp.quantity";

// PRODUCTS
function getProductsByCategory(categoryID) {
    let qry = "SELECT * FROM products WHERE categoryID = ?;";

    let data = db.all(qry, categoryID);
    //console.log(data);
    return data;
}

function getFiltersByCategory(categoryID) {
    let qry = "SELECT * FROM filters f WHERE categoryid = ?;";
    let data = db.all(list_info, categoryID);
    return data;
}

//fix for dynamic filters
function getProductsFiltered(categoryID, ...filters) {
    let qry = "SELECT * FROM products p WHERE categoryID = ? ";
    let data;
    let params = {categoryID};
    if (filters) {
        filters.forEach(filter => params.push(filter));
    }
    switch (categoryID) {
        case 1: //tree
            qry += "AND tree_type = ? AND fruiting = ? AND height = ?;";
            break;
        case 2: //tool
            qry += "AND tool_function = ?;";
            break;
        case 3: //soil
            qry += "AND nitrogen = ? AND phosphorus = ? AND potassium = ?;";
            break;
    }
    data = db.prepare(qry).all(params);
    return data;
}

function getProductDetails(productID) {
    let qry = "SELECT * FROM products WHERE productID = ? ";
    let data = db.get(qry, productID);
    return data;
}

function addToCart(cartid, productid, quantity) {
    let params = [
        quantity, cartid, productid
    ];
    let qryProduct = "select quantity from cartProducts where cartID = ? and productID = ?";
    let qryUpdate = "update cartProducts set quantity = ? where cartID = ? and productID = ?";
    let qryNew = "insert into cartProducts (quantity, cartID, productID) values (?, ?, ?)";
    let res;
    //console.log("Params1: " + params1);
    let q = db.get(qryProduct, cartid, productid);
    try {
        if (q) {
            params = [ Number(quantity) + Number(q.quantity), cartid, productid ];
            db.run(qryUpdate, params);
        } else {
            db.run(qryNew, params);
        }
        res = true;
    } catch (err) {
        res = false;
        console.log(err);
    }
    return res;
}

function updateCart(cartid, productid, quantity) {
    let params = [quantity, cartid, productid];
    let qry = "update cartProducts set quantity = ? where cartID = ? and productID = ?";
    let res;
    try {
        db.run(qry, params)
        res = true;
    }catch (err) {
        res = false;
        console.log(err);
    }
    return res;
}

// CART
function getCart(userID) {
    let qry = "SELECT cp.cartID, cp.quantity, p.* "
            + "FROM users u "
            + "JOIN carts c ON c.userID = u.userID "
            + "JOIN cartProducts cp ON cp.cartID = c.cartID "
            + "JOIN products p ON cp.productID = p.productID "
            + "WHERE u.userID = ?";
    let data = db.all(qry, userID);
    return data;
}

function getCartId(userID) {
    let qry = "select cartID from carts where userID = ?";
    let data = db.get(qry, userID);
    return data;
}

function createCart(userID) {
    let qry = "insert into carts (userID, created_at, status) values (?, datetime('now'), 'new')";
    let res;
    try {
        db.run(qry, userID);
        res = true;
    } catch (err) {
        res = false;
        console.log(err);
    }
    return res;
}

function deleteCart(cartID) {
    let qry1 = "delete from cartProducts where cartID = ?";
    let qry2 = "delete from carts where cartID = ?";
    let res;
    try {
        db.run(qry1, cartID);
        db.run(qry2, cartID);
        res = true;
    } catch (err) {
        res = false;
        console.log(err);
    }
    return res;
}

function checkout(cartID, userID, address, city, state, zip, payment, total) {
    let params1 = [userID, total, address, city, state, zip, payment];
    let qry1 = "INSERT INTO orders(userID, created_at, status, totalcost, address, city, state, zip, cardNum) "
             + "VALUES (?, datetime('now'), 'processing', ?, ?, ?, ?, ?, ?)";

    let params2 = [userID, cartID];
    let qry2 = "INSERT INTO orderProducts(orderID, productID, quantity) "
             + "SELECT (SELECT o.orderID FROM orders o WHERE userID = ? ORDER BY created_at DESC LIMIT 1), " //most recently created order
             + "cp.productID, cp.quantity FROM cartProducts cp WHERE cartID = ?";

    let res;
    try {
        db.run(qry1, params1);
        console.log("order created.");
        db.run(qry2, params2);
        console.log("products passed.");
        deleteCart(cartID);
        console.log("cart and contents deleted.");
        res = true;
    } catch (err) {
        res = false;
        console.log(err);
    }
    return res;
}


// ADMIN
function getProductsAll() {
    let qry = "SELECT * FROM products";
    let data = db.all(qry);
    return data;
}

function deleteProduct(productID) {
    let qry = "DELETE FROM products WHERE productID = ?";
    let data;
    try {
        db.run(qry, productID);
        data = true;
    } catch (error) {
        data = false;
    }
    console.log("Product deleted?  " + data);
    return data;
}

function editProduct(productID, product_name, description, price, img_url, categoryID, /*...filters*/) {

    
    /*
    let qry = "UPDATE products SET product_name = ?, description = ?, price = ?, img_url = ?, categoryID = ?, ";
    let params = [
        product_name,
        description,
        price,
        img_url,
        category,
    ];
    
    if (category === 1) {
        qry += "tree_type = ?, fruiting = ?, height = ?";
        params.push(filters[0], filters[1], filters[2]);
    } else if (category === 2) {
        qry += "function = ?";
        params.push(filters[0]);
    } else if (category === 3) {
        qry += "nitrogen = ?, phosphorus = ?, potassium = ?";
        params.push(filters[0], filters[1], filters[2]);
    }

    qry += " WHERE productID = ?";
    params.push(productID);


    try {
        db.run(qry, params);
        data = "yup!";
    } catch (err) {
        console.log(error);
        data = error;
    }*/
    let params = [
        product_name,
        description,
        price,
        img_url,
        categoryID,
        productID
    ];
    let qry = "UPDATE products SET product_name = ?, description = ?, price = ?, img_url = ?, categoryID = ? WHERE productID = ?";
    let res;
    try {
        db.run(qry, params);
        res = true;
    } catch (err) {
        res = false;
        console.log(err);
    }

    return res;
}

function createProduct (productName, desc, img_url, price, categoryID) {
    let params = [
        productName, desc, img_url, price, categoryID
    ];
    let res;
    let qry = "insert into products (product_name, description, img_url, price, categoryID) values (?, ?, ?, ?, ?);";
    try {
        db.run(qry, params);
        res = true;
    } catch (err) {
        res = false;
        console.log(err);
    }
    console.log("result is " + res);
    return res;
}


module.exports = {
    //products/filters
    getProductsAll,
    getProductsByCategory,
    getFiltersByCategory,
    getProductsFiltered,
    getProductDetails,
    addToCart,
    updateCart,

    //carts
    getCart,
    getCartId,
    createCart,
    deleteCart,
    checkout,

    //admin
    deleteProduct,
    editProduct,
    createProduct
};