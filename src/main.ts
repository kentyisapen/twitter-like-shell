import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";

const util = require("util");
const childProcess = require("child_process");
const exec = util.promisify(childProcess.exec);
const Encoding = require("encoding-japanese");

const handleExecCommand = async (_event: any, cmd: string) => {
	try {
		const res = await exec(cmd, { encoding: "Shift_JIS" });
		return Encoding.convert(res.stdout, {
			from: "SJIS",
			to: "UNICODE",
			type: "string",
		});
	} catch (eres: any) {
		return Encoding.convert(eres.stderr, {
			from: "SJIS",
			to: "UNICODE",
			type: "string",
		});
	}
};

app.whenReady().then(() => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	ipcMain.handle("execCommand", handleExecCommand);
	mainWindow.maximize();
	mainWindow.loadFile("dist/index.html");
});

app.once("window-all-closed", () => app.quit);
