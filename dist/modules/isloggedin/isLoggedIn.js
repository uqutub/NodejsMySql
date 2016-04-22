/// <reference path="../../../../typings/tsd.d.ts" />
"use strict";
var express = require("express");
var router = express.Router();
router.use(function (err, req, res, next) {
    if (req.session['User']) {
        next();
    }
    else {
        res.redirect('/login');
    }
});
module.exports = router;
