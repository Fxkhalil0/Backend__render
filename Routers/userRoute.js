const express = require("express");
const route = express.Router();
const {add} = require("../controller/user")

route.post("/addUser",add)

module.exports = route;

