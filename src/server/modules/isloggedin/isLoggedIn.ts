/// <reference path="../../../../typings/tsd.d.ts" />

import * as express          from "express";

var router: express.Router = express.Router();

router.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction){
    if(req.session['User']) {
		next();
    } else {
		res.redirect('/login');
    }
})

export = router;
