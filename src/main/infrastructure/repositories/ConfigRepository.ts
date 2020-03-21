import store, { defaults, Schema } from "main/infrastructure/store";

import * as configTypes from "common/types/config";

class ConfigRepository {
	private key: "config" = "config";

	private cache: configTypes.Schema = defaults[this.key];

	constructor() {
		(async (): Promise<void> => {
			await this.readConfig();
		})();
	}

	private async readConfig(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.cache = store.get(this.key);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	private async writeConfig(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				store.set(this.key, this.cache);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
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
