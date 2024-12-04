"use strict";
const db = require("./db-conn");


function getUserById(id) {
    let sql = "SELECT * FROM users where userID=?";
    const item = db.get(sql, id);
    return item;
  }
  
  function createNewUser(params) {
    let sql = 'INSERT INTO users ("userID","display_name","first_name","last_name","email") VALUES (?,?,?,?,?);';
    const info = db.run(sql, params);
    return info;
  }

  
module.exports = {
    getUserById,
    createNewUser
  };