import * as process from "process";
import * as path from "path";

import store from "main/infrastructure/store";

import * as configTypes from "common/types/config";

class ConfigRepository {
	private key = "config";

	private defaultValue: configTypes.Schema = {
		general: {
			sharedDirectoryPath: path.resolve(),
			cacheDirectoryPath: path.resolve(process.cwd(), ".cache")
		},
		video: {
			FFmpegPath: path.resolve(
				process.cwd(),
				`ffmpeg${process.platform === "win32" && ".exe"}`
			)
		}
	};

	private cache: configTypes.Schema = this.defaultValue;

	constructor() {
		(async (): Promise<void> => {
			await this.readConfig();
		})();
	}

	private async readConfig(): Promise<void> {
		return new Promise(() => {
			this.cache = store.get(this.key, this.defaultValue);
		});
	}

	private async writeConfig(): Promise<void> {
		return new Promise(() => store.set(this.key, this.cache));
	}

	public loadAll(): configTypes.Schema {
		return this.cache;
	}

	public load<K extends configTypes.SchemaKeys>(
		key: K
	): configTypes.Schema[K] {
		return this.cache[key];
	}

	public async save<K extends configTypes.SchemaKeys>(
		key: K,
		value: configTypes.Schema[K]
	): Promise<void> {
		this.cache[key] = value;
		await this.writeConfig();
	}
}

export default new ConfigRepository();
