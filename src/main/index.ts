import * as path from "path";
import { app, BrowserWindow } from "electron";

const createWindow = (): void => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile(path.resolve("dist", "index.html"));
};

app.on("ready", createWindow);
