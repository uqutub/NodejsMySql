/// <reference path="../../typings/tsd.d.ts" />
"use strict";
//third party module import
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
//server configuration
var app = express();
var port = process.env.PORT || 9001;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/publisherApp';
mongoose.connect(mongoURI);
//custom module import
var userRouter = require('./modules/user/userRoute');
var errorRouter = require('./modules/error/errorRoute');
//builtin middleware
app.use(express.static(path.join(__dirname, './public')));
//third party middleware
app.use(morgan('dev'));
app.use(cookieParser('fulloffunwithcodingjsints'));
app.use(session({ secret: 'fulloffunwithcodingjsints' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//customer mounted middleware for routing
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/todo', isLoggedIn, todoRouter);
// app.use('/api/v1/book', isLoggedIn, bookRouter);
// app.use('/api/v1/message', isLoggedIn, messageRouter);
app.all('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.use(errorRouter);
//start server
app.listen(port, function () {
    console.log('Express started on Port : ' + port);
});
