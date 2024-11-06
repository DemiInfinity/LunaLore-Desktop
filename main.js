// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development';

  mainWindow = new BrowserWindow({
    width: isDev ? 2100 : 1500,  // Wider window for development
    height: 800,  // Taller window for development
    resizable: isDev,           // Allow resizing only in development mode
    icon: path.join(__dirname, 'icons/LunaLoreWithoutText.png'),// Add the path to your app icon here
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // Enable Node integration for easier file access
      contextIsolation: false, // Disable context isolation to allow access to Node APIs in renderer
    },
  });

  // Load the index.html file
  mainWindow.loadFile("index.html");

  // Open the DevTools (optional)
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  // Handle the 'closed' event for garbage collection
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Recreate the window when the app is reactivated (macOS specific behavior)
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
