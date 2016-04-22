/// <reference path="../../../../typings/tsd.d.ts" />

import * as express          from "express";

var router: express.Router = express.Router();

router.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
	let role = req.session['User'].role;
    if (role.toUpperCase() == 'ADMIN') {
		next();
    } else {
		res.send('Logged In User is not Admin');
    }
})

export = router;
