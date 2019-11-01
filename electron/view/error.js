const {ipcRenderer} =  require('electron')
const error = document.getElementById('error')
let html = null
 
ipcRenderer.on('send',(e,data)=>{
    html = data
    error.innerHTML=html
})




