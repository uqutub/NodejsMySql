/// <reference path="../../../../typings/tsd.d.ts" />

import * as express from "express";
import {User, IUser} from "./userModel";
import * as mySql from "../mysql/mysql";

export let userController = {
	userSignin: userSignin,
	userSignup: userSignup,
	categories: categories,
	userAdds: userAdds,
	userPostAdd: userPostAdd
};


// usuf ready
function userSignin (req: express.Request, res: express.Response) {
	let newUser: IUser = req.body;
	// newUser.role = 'MEMBER';
	let query = "SELECT * FROM as_seller WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "' ";
	// check user
	mySql.handle_database(query, (d) => {
		if (d.data.length === 0) {
			res.json({ 'success': false, 'data': null, 'error': "Email or Password not matched!" });
		} else {
			delete d.data.password;
			res.json({ 'success': true, 'data': d.data, 'error': "Email or Password not matched!" });
		}
	});
}
// usuf ready
function userSignup (req: express.Request, res: express.Response) {
	let newUser: IUser = req.body;
	// newUser.role = 'MEMBER';
	let query = "SELECT * FROM as_seller WHERE email = '" + req.body.email + "' ";
	// check user
	mySql.handle_database(query, (d) => {
		if (d.data.length > 0) {
			res.json({ 'success': false, 'data': null, 'error': "Email already exists!" });
		} else {
			let email, password, itime, location, fname, lname, cname, phone, mobile, verified, look, utime, sip, verify_token, email_verified, admin_id, about, atype, ads_package;
			// let email, password, itime, location, fname, lname, cname, phone, mobile, verified, look, utime, sip, verify_token, email_verified, admin_id, about, atype, ads_package;
			let q = "INSERT INTO as_seller('email', 'password', 'itime', 'location', 'fname', 'lname', 'cname', 'phone', 'mobile', 'verified', 'look', 'utime', 'sip', 'verify_token', 'email_verified', 'admin_id', 'about', 'atype', 'ads_package') VALUES (" + email + "," + password + "," + itime + "," + location + "," + fname + "," + lname + "," + cname + "," + phone + "," + mobile + "," + verified + "," + look + "," + utime + "," + sip + "," + verify_token + "," + email_verified + "," + admin_id + "," + about + "," + atype + "," + ads_package + "); ";
			// create user
			mySql.handle_database(query, (c) => {
				if (c.error) {
					res.json({ 'success': false, 'data': null, 'error': c.error });
				} else {
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
function categories (req: express.Request, res: express.Response) {
	let query = "SELECT id, parent_id, name_en, detail_en, icon FROM as_categories";
	// check user
	mySql.handle_database(query, (d) => {
		if (d.data.length === 0) {
			res.json({ 'success': false, 'data': null, 'error': "Email or Password not matched!" });
		} else {
			delete d.data.password;
			res.json({ 'success': true, 'data': d.data, 'error': "Email or Password not matched!" });
		}
	});
}

// get user adds
function userAdds(req: express.Request, res: express.Response) {
	let limitRows = req.body.limit || 10;
	let cat_id = req.body.cat_id || 0;
	let query = "";
	
	if (cat_id === 0) {
		query = "SELECT `id`, `title`, `price`, `detail`, `country`, `state`, `address`, (select name_en FROM as_categories where id = b.cat_id) as Category FROM as_user_ads as b LIMIT " + limitRows;
	} else {
		query = "SELECT `id`, `title`, `price`, `detail`, `country`, `state`, `address`, (select name_en FROM as_categories where id = b.cat_id) as `Category` FROM `as_user_ads` as b WHERE `cat_id` = " + cat_id + " LIMIT " + limitRows;
	}
	
	console.log('ssssssssssssss', query);
	
	// check user
	mySql.handle_database(query, (d) => {
		console.log('dddddddddddddd', d)
		if (d.data.length === 0) {
			res.json({ 'success': false, 'data': null, 'error': "Email or Password not matched!" });
		} else {
			delete d.data.password;
			res.json({ 'success': 'true', 'data': d.data, 'error': "Email or Password not matched!" });
		}
	});
}

// post user address
function userPostAdd(req: express.Request, res: express.Response) {
	console.log('xxxxxxxxxxxxxxxxxxxxx');
	let seller_id, cat_id, title, price, cur, detail, country, state, address, look, del, itime, utime, admin_id ; 
	let query = "INSERT INTO `as_user_ads`(`seller_id`, `cat_id`, `title`, `price`, `cur`, `detail`, `country`, `state`, `address`, `look`, `del`, `itime`, `utime`, `admin_id`) VALUES (" + seller_id + "," + cat_id + "," + title + "," + price + "," + cur + "," + detail + "," + country + "," + state + "," + address + "," + look + "," + del + "," + itime + "," + utime + "," + admin_id + ")" ;

	// create post/add
	mySql.handle_database(query, (c) => {
		if (c.error) {
			res.json({ 'success': false, 'data': null, 'error': c.error });
		} else {
			res.json({ 'success': true, 'data': c.data, 'error': null });
		}
	});
}

export function userLoggedIn(req: express.Request, res: express.Response) {
	let username = req.params.id;
	if (req.session['User'] && req.session['User'].name == username) {
		User.findOne({ username: username }, (err: Error, user: IUser) => {
			if (err) {
				req.session['User'] = {};
				res.json({ 'success': false, 'data': null, 'error': err })
			} else if (user !== null) {
				let data: IUser = <any>{};
				data.username = user.username;
				data.firstname = user.firstname;
				data.lastname = user.lastname;
				data.books = user.books;
				data.messages = user.messages;
				data.todo = user.todo;
				res.json({ 'success': true, 'data': data, 'error': null })
			} else {
				req.session['User'] = {};
				res.json({ 'success': false, 'data': null, 'error': 'No User Found!' })
			}
		});
	} else {
		res.json({ 'success': false, 'data': null, 'error': 'No User Logged In!' })
	}
}

export function userSignout(req: express.Request, res: express.Response) {
	delete req.session['User'];
	res.json({ 'success': true, 'data': null, 'error': null })
}

export function getUsers(req: express.Request, res: express.Response) {
	let newUser: IUser;
	User.find((err: Error, users: Array<IUser>) => {
		if (err) {
            res.send(err);
		} else if (users.length > 0) {
			res.json(users)
		} else {
			res.send('No Users Found!')
		}
	});
}

export function retriveUser(req: express.Request, res: express.Response) {
	let reqUser: IUser = req.body;
    User.findOne({ username: reqUser.username }, (err: Error, user: IUser) => {
        if (err) {
            res.send(err);
        } else if (user !== null) {
			res.json(user);
        } else {
            res.send('No Users Found!');
		}
    });
}

export function createUser(req: express.Request, res: express.Response) {
	let newUser: IUser = req.body;
	User.findOne({ username: newUser.username }, (err: Error, user: IUser) => {
        if (err) {
            res.send(err);
		} else if (user === null || user === undefined) {
			User.create(newUser, (err: Error) => {
				if (err) {
					res.send(err);
				} else {
					res.send('User Created Successfully!')
				}
			});
		} else if (user.username === newUser.username) {
			res.send('User Already Exits!');
		}
    });
}

export function updateUser(req: express.Request, res: express.Response) {
	let updatedUser: IUser = req.body;
	User.findOne({ username: updatedUser.username }, (err: Error, user: IUser) => {
        if (err) {
            res.send(err);
		} else if (user.username !== updatedUser.username) {
			res.send('No User Found!')
		} else {
			User.update(updatedUser, (err: Error) => {
				if (err) {
					res.send(err);
				} else {
					res.send('User Updated Successfully!')
				}
			});
		}
    });
}

export function deleteUser(req: express.Request, res: express.Response) {
	let deleteUser: IUser = req.body;
	User.findOne({ username: deleteUser.username }, (err: Error, user: IUser) => {
        if (err) {
            res.send(err);
		} else if (user.username !== deleteUser.username) {
			res.send('No User Found!')
		} else {
			User.remove(deleteUser, (err: Error) => {
				if (err) {
					res.send(err);
				} else {
					res.send('User Deleted Successfully!')
				}
			});
		}
    });
}
