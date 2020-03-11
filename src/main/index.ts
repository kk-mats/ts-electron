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

	Electron.ipcMain.handle(
		channels.showOpenDialog,
		async (
			event,
			arg: Electron.OpenDialogOptions
		): Promise<Electron.OpenDialogReturnValue> => {
			return Electron.dialog.showOpenDialog(win, arg);
		}
	);
};

Electron.app.on("ready", createWindow);
