import * as path from "path";
import * as Electron from "electron";

import * as channels from "common/channels";
import * as configTypes from "common/types/config";

import CoreServer from "main/application/core-server";
import ConfigRepository from "main/infrastructure/repositories/ConfigRepository";

const server = new CoreServer();

const createWindow = (): void => {
	const win = new Electron.BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.resolve("dist", "preload.js")
		}
	});

	win.loadFile(path.resolve("dist", "index.html"));

	const handlers: {
		channel: string;
		listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any;
	}[] = [
		{
			channel: channels.showOpenDialog,
			listener: async (
				event: Electron.IpcMainInvokeEvent,
				args: Electron.OpenDialogOptions
			): Promise<Electron.OpenDialogReturnValue> => {
				return Electron.dialog.showOpenDialog(win, args);
			}
		},
		{
			channel: channels.fetchConfigAll,
			listener: (
				event: Electron.IpcMainInvokeEvent
			): configTypes.Schema => {
				return ConfigRepository.loadAll();
			}
		},
		{
			channel: channels.fetchConfig,
			listener: <K extends configTypes.SchemaKeys>(
				event: Electron.IpcMainInvokeEvent,
				key: K
			): configTypes.Schema[K] => {
				return ConfigRepository.load<K>(key);
			}
		},
		{
			channel: channels.updateConfig,
			listener: async <K extends configTypes.SchemaKeys>(
				event: Electron.IpcMainInvokeEvent,
				key: K,
				value: configTypes.Schema[K]
			): Promise<void> => {
				await ConfigRepository.save<K>(key, value);
				await server.restart();
			}
		}
	];

	handlers.map(handler => {
		return Electron.ipcMain.handle(handler.channel, handler.listener);
	});
};

Electron.app.on("ready", createWindow);

(async (): Promise<void> => {
	await server.start();
})();
