'use strict'

import { app, protocol, BrowserWindow,Tray,Menu, ipcMain, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require("path")
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win = null
let winDesk = null
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 230,
    height: 300,
    frame:false, //是否显示边缘框
    transparent:true, //是否透明
    resizable:false, //是否可以改变窗口大小
    fullscreen:false,
    backgroundColor:"#00000000",
    type:"toolbar",
    hasShadow:false,//不显示阴影
    alwaysOnTop:true,//窗口是否总显示在其他窗口之前
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  // 加载樱花背景
  win.loadURL('https://cdn.jsdelivr.net/gh/Fuukei/Public_Repository@latest/static/js/sakura-less.js')

  // 指定应用打开出现位置
  const { left, top } = {
    left:20,
    top:screen.getPrimaryDisplay().workAreaSize.height - 300,
  }
  win.setPosition(left,top) //设置悬浮球位置
  win.once("ready-to-show",()=>{
    win.show()
  })
  require("@electron/remote/main").enable(win.webContents)
  win.on("close",(e)=>{
    e.preventDefault() //阻止退出程序
    win.setSkipTaskbar(true) //取消任务栏显示
    win.hide() //隐藏主程序窗口
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  // 设置图标及菜单
  const tray = new Tray(path.join(__static,"./icon.png"))
  const contextMenu = Menu.buildFromTemplate([
    {
    label:'退出',
    click:()=>{
      win.destroy()
      app.quit()
      }
    }
  ])
  tray.on("click",()=>{
  if(!win){
    createWindow()
  }else{
    win.show()
  }
  })
  tray.setContextMenu(contextMenu)
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on("desktopClose",()=>{
  setTimeout(() => {
    winDesk.hide()
  }, 500);
  win.destroy()
  createWindow()
})
ipcMain.on("desktopCancel",()=>{
  winDesk.hide()
})