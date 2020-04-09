import * as express from "express";

import useAsync from "main/application/middlewares/useAsync";

import * as filesystem from "main/domain/filesystem";

const router = express.Router();

const entryPathRegex = /\/((\w|\.|%|~|-|\/|@)*)/;

router.get(
	entryPathRegex,
	useAsync(async (req, res) => {
		const entryPathMatch = req.url.match(entryPathRegex);
		if (entryPathMatch && entryPathMatch.length > 1) {
			const entries = await filesystem.readAllEntries(entryPathMatch[1]);
			res.send(entries);
		}
	})
);

export default router;
