import express from "express";

import middlewares from "main/application/middlewares";
import entry from "main/application/routes/entry";

import ConfigRepository from "main/infrastructure/repositories/ConfigRepository";

const app = express();

app.use(middlewares);

app.use(
	"/cache",
	express.static(ConfigRepository.load("general").cacheDirectoryPath)
);

app.use(
	"/shared",
	express.static(ConfigRepository.load("general").sharedDirectoryPath)
);

app.use("/entry", entry);

export default app;
