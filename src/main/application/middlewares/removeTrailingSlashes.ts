import * as express from "express";

const trailingSlashes = /\/+$/;

const removeTrailingSlashes: express.Handler = (req, res, next) => {
	if (trailingSlashes.test(req.path)) {
		res.redirect(301, req.path.replace(trailingSlashes, ""));
	} else {
		next();
	}
};

export default removeTrailingSlashes;
