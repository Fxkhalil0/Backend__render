const express = require("express");
const route = express.Router();
const { add } = require("../controller/user")

route.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header({ "Access-Control-Allow-Credentials": true });
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept');
    res.header("Access-Control-Max-Age", 24 * 60 * 60 * 1000);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")
    next()
})

route.post("/addUser", add)

module.exports = route;

