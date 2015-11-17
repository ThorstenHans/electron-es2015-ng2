let app = require('app');
let ipc = require('ipc');
let crashReporter = require('crash-reporter');
var BrowserWindow = require('browser-window');

crashReporter.start({
  productName: 'electron-ng2-es2015',
  companyName: '.NET rocks',
  submitUrl: 'http://localhost:3000/crashes',
  autoSubmit: true
});

var mainWindow = null;

ipc.on('crash', (event, arg) => {
    process.crash(arg);
});

ipc.on('toggleDevTools', (event, arg) => {
  mainWindow.openDevTools();
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () =>{
  mainWindow = new BrowserWindow({width: 800, height: 600, frame:false});

  mainWindow.loadUrl('file://' + __dirname + '/../frontend/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});