import * as Electron from "electron";
import * as channels from "common/channels";

import ContextBridgeApi from "common/ContextBridgeApi";

const contextBridgeApi: ContextBridgeApi = {
	dialog: {
		key: "dialog",
		showOpenDialog: (
			options: Electron.OpenDialogOptions
		): Promise<Electron.OpenDialogReturnValue> => {
			return Electron.ipcRenderer.invoke(
				channels.showOpenDialog,
				options
			);
		}
	}
};

Electron.contextBridge.exposeInMainWorld(
	contextBridgeApi.dialog.key,
	contextBridgeApi.dialog
);

declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Window extends ContextBridgeApi {}
}
