import * as fs from "fs";
import * as path from "path";

import ConfigRepository from "main/infrastructure/repositories/ConfigRepository";

export const readAllEntries = async (
	entryPath: string
): Promise<fs.Dirent[]> => {
	return fs.promises.readdir(
		path.resolve(
			ConfigRepository.load("general").sharedDirectoryPath,
			entryPath
		),
		{ withFileTypes: true }
	);
};

export default readAllEntries;
