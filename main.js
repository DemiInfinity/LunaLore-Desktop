const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require('electron-updater');
const path = require("path");

let mainWindow;

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development';

  mainWindow = new BrowserWindow({
    width: isDev ? 2100 : 1500,
    height: 800,
    resizable: isDev,
    icon: path.join(__dirname, 'assets/img/LunaLoreWithoutText.png'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  if (!isDev) mainWindow.setMenu(null);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// Defer `autoUpdater` until window is fully loaded in production
app.on("ready", () => {
  createWindow();
  if (process.env.NODE_ENV !== 'development') {
    // Start auto-updater after the main window is created
    autoUpdater.checkForUpdates();
  }
});

// Listen for `autoUpdater` events only if in production
if (process.env.NODE_ENV !== 'development') {
  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('update_available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update_downloaded');
  });
}

// Handle all windows closed
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
