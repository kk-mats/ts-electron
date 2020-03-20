import * as process from "process";
import * as path from "path";

import Store from "electron-store";

import * as configTypes from "common/types/config";

export type Schema = {
	config: configTypes.Schema;
};

export const defaults: Schema = {
	config: {
		general: {
			port: 6000,
			sharedDirectoryPath: path.resolve(),
			cacheDirectoryPath: path.resolve(process.cwd(), ".cache")
		},
		video: {
			FFmpegPath: path.resolve(
				process.cwd(),
				`ffmpeg${process.platform === "win32" && ".exe"}`
			)
		}
	}
};

const store = new Store({ defaults });

export default store;
