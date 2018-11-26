const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		height        : 800,
		resizable     : true,
		title         : 'j5/electron template',
		width         : 1600,
		frame         : false,
		webPreferences: {
			devTools: true
		}
	});

	mainWindow.loadURL('file://' + __dirname + '/detail.html');

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});

