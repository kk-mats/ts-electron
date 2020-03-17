import * as Electron from "electron";

import * as channels from "common/channels";
import ContextBridgeApi from "common/ContextBridgeApi";
import * as configTypes from "common/types/config";

const contextBridgeApi: ContextBridgeApi = {
	dialog: {
		showOpenDialog: (
			options: Electron.OpenDialogOptions
		): Promise<Electron.OpenDialogReturnValue> => {
			return Electron.ipcRenderer.invoke(
				channels.showOpenDialog,
				options
			);
		}
	},
	config: {
		fetchConfigAll: async (): Promise<configTypes.Schema> => {
			return Electron.ipcRenderer.invoke(channels.fetchConfigAll);
		},
		async fetchConfig<K extends configTypes.SchemaKeys>(
			key: K
		): Promise<configTypes.Schema[K]> {
			return Electron.ipcRenderer.invoke(channels.fetchConfig, key);
		},
		async updateConfig<K extends configTypes.SchemaKeys>(
			key: K,
			value: configTypes.Schema[K]
		): Promise<void> {
			return Electron.ipcRenderer.invoke(
				channels.updateConfig,
				key,
				value
			);
		}
	}
};

// eslint-disable-next-line array-callback-return
Object.entries(contextBridgeApi).map(([key, entry]): void => {
	Electron.contextBridge.exposeInMainWorld(key, entry);
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Window extends ContextBridgeApi {}
}
