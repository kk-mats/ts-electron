import * as Electron from "electron";

type ShowOpenDialog = (
	options: Electron.OpenDialogOptions
) => Promise<Electron.OpenDialogReturnValue>;

type DialogContextBridgeApi = Readonly<{
	key: string;
	showOpenDialog: ShowOpenDialog;
}>;

type ContextBridgeApi = Readonly<{
	dialog: DialogContextBridgeApi;
}>;

export default ContextBridgeApi;
