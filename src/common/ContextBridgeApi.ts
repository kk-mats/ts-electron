import * as Electron from "electron";

import * as configTypes from "common/types/config";

type ShowOpenDialog = (
	options: Electron.OpenDialogOptions
) => Promise<Electron.OpenDialogReturnValue>;

type DialogContextBridgeApi = Readonly<{
	showOpenDialog: ShowOpenDialog;
}>;

type FetchConfigAll = () => Promise<configTypes.Schema>;

type FetchConfig = <K extends configTypes.SchemaKeys>(
	key: K
) => Promise<configTypes.Schema[K]>;

type UpdateConfig = <K extends configTypes.SchemaKeys>(
	key: K,
	value: configTypes.Schema[K]
) => Promise<void>;

type ConfigContextBridgeApi = Readonly<{
	fetchConfigAll: FetchConfigAll;
	fetchConfig: FetchConfig;
	updateConfig: UpdateConfig;
}>;

type ContextBridgeApi = Readonly<{
	dialog: DialogContextBridgeApi;
	config: ConfigContextBridgeApi;
}>;

export default ContextBridgeApi;
