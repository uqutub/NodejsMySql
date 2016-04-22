/// <reference path="../../../../typings/tsd.d.ts" />
"use strict";
var express = require("express");
var userController_1 = require('./userController');
var router = express.Router();
router.post('/signin', userController_1.userController.userSignin);
router.post('/signup', userController_1.userController.userSignup);
router.get('/categories', userController_1.userController.categories);
router.get('/adds', userController_1.userController.userAdds);
router.post('/adds', userController_1.userController.userPostAdd);
module.exports = router;
