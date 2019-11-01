const {BrowserWindow,Menu,ipcMain,app,webContents} = require('electron');
const path = require('path');
const url = require('url');

if(process.env.NODE_ENV !=='production')
require('electron-reload')(__dirname,{
   
})

let mainWindows
let childWindows
const startUrl = process.env.ELECTRON_START_URL || url.format({
   pathname: path.join(__dirname, '/../build/index.html'),
   protocol: 'file:',
   slashes: true
});

//                 Init windows main

app.on('ready',()=>{
    mainWindows =  new BrowserWindow({
        webPreferences: {
           nodeIntegration: true
       }
      })
      mainWindows.loadURL(startUrl)
      
      const mainMenu = Menu.buildFromTemplate(templateMenu)
      Menu.setApplicationMenu(mainMenu)
      //Menu.setApplicationMenu(null)
      mainWindows.on('closed',()=>{
         app.quit();
      })
})
const childWindows_=()=>{
   childWindows = new BrowserWindow({
      width:500,
      height:150,
      title:"ventana",
      webPreferences: {
         nodeIntegration: true
     },
     autoHideMenuBar:true,
     maximizable:false,
     minimizable:false,

     parent: mainWindows, modal: true, show: false
   })
   
   childWindows.loadURL(url.format({
      pathname: path.join(__dirname,'view/error.html'),
        protocol:'file',
        slashes:true      
   }))
   
}

//configurando menu
const isMac = process.platform == 'darwin'

const templateMenu=[
    {
        label: 'Edit',
        submenu: [
           {
              label:'new prsfada',
              accelerator:'Ctrl+N',
              click(){
                  newWindows__()
              }
            },
            {
               label:"Remove All",
               click(){
                  mainWindows.webContents.send('allRemove')

               }
            },
            {
               label:"exit",
               accelerator: isMac?'command+Q':'Ctrl+Q',
               click(){
                  app.quit()
               }
            }
           
        ]
     },
     
    
]
if(isMac){
   templateMenu.unshift({
      label:app.getName()
   })
}
if(process.env.NODE_ENV !== 'production') templateMenu.push({
   label:'DecTool',
   submenu:[
      {
         label:"show/hide Dev Tools",
         accelerator:'Ctrl+D',
         click(item,focusedWindow){
            focusedWindow.toggleDevTools();

         }
      },
      {
         role: 'reload'
      }
   ]
})

ipcMain.on('send',(e,data)=>{   
   console.log("main Windoes",data);
   childWindows_()
   childWindows.on('ready-to-show',()=>{
      childWindows.men
      childWindows.show()
      childWindows.webContents.send('send', data)
   })
   
})
