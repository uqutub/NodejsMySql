/// <reference path="../../../../typings/tsd.d.ts" />
"use strict";
var express = require("express");
var router = express.Router();
router.use(function (err, req, res, next) {
    var role = req.session['User'].role;
    if (role.toUpperCase() == 'ADMIN') {
        next();
    }
    else {
        res.send('Logged In User is not Admin');
    }
});
module.exports = router;
