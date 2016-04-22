/// <reference path="../../../../typings/tsd.d.ts" />
"use strict";
var userModel_1 = require("./userModel");
var mySql = require("../mysql/mysql");
exports.userController = {
    userSignin: userSignin,
    userSignup: userSignup,
    categories: categories,
    userAdds: userAdds,
    userPostAdd: userPostAdd
};
// usuf ready
function userSignin(req, res) {
    var newUser = req.body;
    // newUser.role = 'MEMBER';
    var query = "SELECT * FROM as_seller WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "' ";
    // check user
    mySql.handle_database(query, function (d) {
        if (d.data.length === 0) {
            res.json({ 'success': false, 'data': null, 'error': "Email or Password not matched!" });
        }
        else {
            delete d.data.password;
            res.json({ 'success': true, 'data': d.data, 'error': "Email or Password not matched!" });
        }
    });
}
// usuf ready
function userSignup(req, res) {
    var newUser = req.body;
    // newUser.role = 'MEMBER';
    var query = "SELECT * FROM as_seller WHERE email = '" + req.body.email + "' ";
    // check user
    mySql.handle_database(query, function (d) {
        if (d.data.length > 0) {
            res.json({ 'success': false, 'data': null, 'error': "Email already exists!" });
        }
        else {
            var email = void 0, password = void 0, itime = void 0, location_1, fname = void 0, lname = void 0, cname = void 0, phone = void 0, mobile = void 0, verified = void 0, look = void 0, utime = void 0, sip = void 0, verify_token = void 0, email_verified = void 0, admin_id = void 0, about = void 0, atype = void 0, ads_package = void 0;
            // let email, password, itime, location, fname, lname, cname, phone, mobile, verified, look, utime, sip, verify_token, email_verified, admin_id, about, atype, ads_package;
            var q = "INSERT INTO as_seller('email', 'password', 'itime', 'location', 'fname', 'lname', 'cname', 'phone', 'mobile', 'verified', 'look', 'utime', 'sip', 'verify_token', 'email_verified', 'admin_id', 'about', 'atype', 'ads_package') VALUES (" + email + "," + password + "," + itime + "," + location_1 + "," + fname + "," + lname + "," + cname + "," + phone + "," + mobile + "," + verified + "," + look + "," + utime + "," + sip + "," + verify_token + "," + email_verified + "," + admin_id + "," + about + "," + atype + "," + ads_package + "); ";
            // create user
            mySql.handle_database(query, function (c) {
                if (c.error) {
                    res.json({ 'success': false, 'data': null, 'error': c.error });
                }
                else {
                    res.json({ 'success': true, 'data': c.data, 'error': null });
                }
            });
        }
    });
    // User.findOne({ username: newUser.username }, (err: Error, user: IUser) => {
    //     if (err) {
    //         res.json({ 'success': false, 'data': null, 'error': err })
    // 	} else if (user === null || user === undefined) {
    // 		User.create(newUser, (err: Error) => {
    // 			if (err) {
    // 				res.json({ 'success': false, 'data': null, 'error': err })
    // 			} else {
    // 				res.json({ 'success': true, 'data': null, 'error': null })
    // 			}
    // 		});
    // 	} else if (user.username === newUser.username) {
    // 		res.json({ 'success': false, 'data': null, 'error': 'User Already Exits!' })
    // 	}
    // });
}
// get all category
function categories(req, res) {
    var query = "SELECT id, parent_id, name_en, detail_en, icon FROM as_categories";
    // check user
    mySql.handle_database(query, function (d) {
        if (d.data.length === 0) {
            res.json({ 'success': false, 'data': null, 'error': "Email or Password not matched!" });
        }
        else {
            delete d.data.password;
            res.json({ 'success': true, 'data': d.data, 'error': "Email or Password not matched!" });
        }
    });
}
// get user adds
function userAdds(req, res) {
    var limitRows = req.body.limit || 10;
    var cat_id = req.body.cat_id || 0;
    var query = "";
    if (cat_id === 0) {
        query = "SELECT `id`, `title`, `price`, `detail`, `country`, `state`, `address`, (select name_en FROM as_categories where id = b.cat_id) as Category FROM as_user_ads as b LIMIT " + limitRows;
    }
    else {
        query = "SELECT `id`, `title`, `price`, `detail`, `country`, `state`, `address`, (select name_en FROM as_categories where id = b.cat_id) as `Category` FROM `as_user_ads` as b WHERE `cat_id` = " + cat_id + " LIMIT " + limitRows;
    }
    console.log('ssssssssssssss', query);
    // check user
    mySql.handle_database(query, function (d) {
        console.log('dddddddddddddd', d);
        if (d.data.length === 0) {
            res.json({ 'success': false, 'data': null, 'error': "Email or Password not matched!" });
        }
        else {
            delete d.data.password;
            res.json({ 'success': 'true', 'data': d.data, 'error': "Email or Password not matched!" });
        }
    });
}
// post user address
function userPostAdd(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxxx');
    var seller_id, cat_id, title, price, cur, detail, country, state, address, look, del, itime, utime, admin_id;
    var query = "INSERT INTO `as_user_ads`(`seller_id`, `cat_id`, `title`, `price`, `cur`, `detail`, `country`, `state`, `address`, `look`, `del`, `itime`, `utime`, `admin_id`) VALUES (" + seller_id + "," + cat_id + "," + title + "," + price + "," + cur + "," + detail + "," + country + "," + state + "," + address + "," + look + "," + del + "," + itime + "," + utime + "," + admin_id + ")";
    // create post/add
    mySql.handle_database(query, function (c) {
        if (c.error) {
            res.json({ 'success': false, 'data': null, 'error': c.error });
        }
        else {
            res.json({ 'success': true, 'data': c.data, 'error': null });
        }
    });
}
function userLoggedIn(req, res) {
    var username = req.params.id;
    if (req.session['User'] && req.session['User'].name == username) {
        userModel_1.User.findOne({ username: username }, function (err, user) {
            if (err) {
                req.session['User'] = {};
                res.json({ 'success': false, 'data': null, 'error': err });
            }
            else if (user !== null) {
                var data = {};
                data.username = user.username;
                data.firstname = user.firstname;
                data.lastname = user.lastname;
                data.books = user.books;
                data.messages = user.messages;
                data.todo = user.todo;
                res.json({ 'success': true, 'data': data, 'error': null });
            }
            else {
                req.session['User'] = {};
                res.json({ 'success': false, 'data': null, 'error': 'No User Found!' });
            }
        });
    }
    else {
        res.json({ 'success': false, 'data': null, 'error': 'No User Logged In!' });
    }
}
exports.userLoggedIn = userLoggedIn;
function userSignout(req, res) {
    delete req.session['User'];
    res.json({ 'success': true, 'data': null, 'error': null });
}
exports.userSignout = userSignout;
function getUsers(req, res) {
    var newUser;
    userModel_1.User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        else if (users.length > 0) {
            res.json(users);
        }
        else {
            res.send('No Users Found!');
        }
    });
}
exports.getUsers = getUsers;
function retriveUser(req, res) {
    var reqUser = req.body;
    userModel_1.User.findOne({ username: reqUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user !== null) {
            res.json(user);
        }
        else {
            res.send('No Users Found!');
        }
    });
}
exports.retriveUser = retriveUser;
function createUser(req, res) {
    var newUser = req.body;
    userModel_1.User.findOne({ username: newUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user === null || user === undefined) {
            userModel_1.User.create(newUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Created Successfully!');
                }
            });
        }
        else if (user.username === newUser.username) {
            res.send('User Already Exits!');
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    var updatedUser = req.body;
    userModel_1.User.findOne({ username: updatedUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user.username !== updatedUser.username) {
            res.send('No User Found!');
        }
        else {
            userModel_1.User.update(updatedUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Updated Successfully!');
                }
            });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    var deleteUser = req.body;
    userModel_1.User.findOne({ username: deleteUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user.username !== deleteUser.username) {
            res.send('No User Found!');
        }
        else {
            userModel_1.User.remove(deleteUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Deleted Successfully!');
                }
            });
        }
    });
}
exports.deleteUser = deleteUser;
