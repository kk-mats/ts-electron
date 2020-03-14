import * as path from "path";
import * as Electron from "electron";

import * as channels from "common/channels";

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
		}
	];

	handlers.map(handler => {
		return Electron.ipcMain.handle(handler.channel, handler.listener);
	});
};

Electron.app.on("ready", createWindow);
