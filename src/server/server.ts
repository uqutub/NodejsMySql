/// <reference path="../../typings/tsd.d.ts" />

//third party module import
import * as express      from "express";
import * as morgan       from "morgan";
import * as cookieParser from "cookie-parser";
import * as session      from "express-session";
import * as bodyParser   from "body-parser";
import * as path         from "path";
import * as mongoose     from "mongoose";

//server configuration
let app      : express.Express = express();
let port     : number          = process.env.PORT         || 9001;
let mongoURI : string          = process.env.MONGOLAB_URI || 'mongodb://localhost/publisherApp';

mongoose.connect(mongoURI);

//custom module import
import userRouter     = require('./modules/user/userRoute');
// import todoRouter     = require('./modules/todo/todoRoute');
// import bookRouter     = require('./modules/book/bookRoute');
// import messageRouter  = require('./modules/message/messageRoute');
import isLoggedIn     = require('./modules/isloggedin/isLoggedIn');
import errorRouter    = require('./modules/error/errorRoute');

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
app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.use(errorRouter);

//start server
app.listen(port, () => {
  console.log('Express started on Port : ' + port);
});
