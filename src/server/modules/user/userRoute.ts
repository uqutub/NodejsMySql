/// <reference path="../../../../typings/tsd.d.ts" />

import * as express          from "express";
import { userController }   from './userController';
import * as isLoggedIn       from '../isloggedin/isLoggedIn';
import * as isAdmin          from '../isadmin/isAdmin';

var router: express.Router = express.Router();

router.post('/signin', userController.userSignin);
router.post('/signup', userController.userSignup);
router.get('/categories', userController.categories);
router.get('/adds', userController.userAdds);
router.post('/adds', userController.userPostAdd);

// router.post('/signout', isLoggedIn, userController.userSignout);

// router.get('/loggedin/:id', isLoggedIn, userController.userLoggedIn);

/*router.get('/', isAdmin, userController.getUsers);

router.get('/:user', isAdmin, userController.retriveUser);
*/
// router.post('/', isAdmin, userController.createUser);
/*
router.put('/', isAdmin, userController.updateUser);

router.delete('/', isAdmin, userController.deleteUser);*/

export = router;