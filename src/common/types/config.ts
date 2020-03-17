export type General = {
	sharedDirectoryPath: string;
	cacheDirectoryPath: string;
};

export type Video = {
	FFmpegPath: string;
};

export type Schema = {
	general: General;
	video: Video;
};

export type SchemaKeys = keyof Schema;
