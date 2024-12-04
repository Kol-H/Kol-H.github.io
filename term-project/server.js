"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//auth
const session = require('express-session');
const passport = require('passport');
require("./auth/passport");
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./auth/auth.route'));

//views
app.set("view engine", "ejs");
app.set("views", __dirname + "/public/views");
//app.set("views", __dirname + "/views/ejs");
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

//routes
const { db_close } = require("./models/db-conn");
const router = require("./routes/broadleaf.route");
app.use("/broadleaf", router);


//Home Page
/*
app.get("/", (req, res) => {
    if (req.session.uuid === undefined || req.session.uuid === "") {
        req.session.uuid = crypto.randomUUID();
    }
    res.redirect("/broadleaf/");
});
*/
app.get("/", (req, res) => {
  req.session.returnTo = req.originalUrl;
  //res.redirect("/broadleaf/");
  res.render("index", { title: 'Broadleaf', user: req.user });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});


process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.")
  })
}