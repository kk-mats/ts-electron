import express from "express";

import middlewares from "main/application/middlewares";
import entries from "main/application/routes/entries";

import ConfigRepository from "main/infrastructure/repositories/ConfigRepository";

const app = express();

app.use(middlewares);

app.use(
	"/cache",
	express.static(ConfigRepository.load("general").cacheDirectoryPath)
);

app.use(
	"/static",
	express.static(ConfigRepository.load("general").sharedDirectoryPath)
);

app.use("/entries", entries);

export default app;
