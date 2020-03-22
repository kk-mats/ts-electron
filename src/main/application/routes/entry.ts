import * as express from "express";

import * as filesystem from "main/domain/filesystem";

const router = express.Router();

const entryPathRegex = /\/((\w|\.|%|~|-|\/)*)/;

router.get(entryPathRegex, (req, res, next) => {
	const entryPathMatch = req.url.match(entryPathRegex);
	if (entryPathMatch && entryPathMatch.length >= 2) {
		(async (): Promise<void> => {
			const entries = await filesystem.readAllEntries(entryPathMatch[1]);
			res.send(entries);
		})().catch(next);
	}
});

export default router;
