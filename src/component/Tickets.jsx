import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


const Tickets = (props) => {
  const [sell, setSell] = useState([]);
  const [shoe,setShoe ] = useState(0);  
  useEffect(()=>{
    if(props.generateTickets&& shoe>0)  {
        const electron = window.require('electron')
        const ipcRenderer  = electron.ipcRenderer;
        const html = ` Para mas funciones Contacte @Camicasii en Twitter.com
        o envie un correo a camicasii@hotmail.com`
        ipcRenderer.send('send',html)
}
  
  },[shoe])


  useEffect(()=>{
    props.handdleSell(sell)    
  },[sell])
  
  
  

  
    const tickets = props.tickets 
    
    let renderer 
    if(props.generateTickets){
    renderer =(<div>
         <table className="table text-center">         
           <thead>
           <tr>
           <th> #</th>
           <th> Ticket</th>
           <th> Serial</th>
           <th> funciones</th>
           </tr>
           </thead>
             <tbody>
               {Object.keys(tickets).map((ticket,i)=>{      

                const res =tickets[ticket].SELL===false&&( 

<tr key={ticket}>             
 <td>{i+1}</td>        
 <td>{tickets[ticket].TICKET}</td>        
 <td>{tickets[ticket].SERIAL}</td>        
 <td>
     <button className="btn btn-secondary btn-sm" onClick={()=>setShoe(shoe +1)}>mostrar</button>
     <button className="btn btn-danger btn-sm" onClick={()=>setSell(i)}>vender</button>                 
 </td>        
</tr>)
                return res

               })}
               
             </tbody>           
           </table>
        </div>)
    }else{
      renderer =
        <div className="container d-flex justify-content-center">
  <div className="text-center">
  <div>
  <div className="alert alert-primary mt-4" role="alert">
      No hay tickets generados
  </div>     
  
  <Link to="/">
  <button className ="btn btn-primary btn-md">Generar tickets</button>
  </Link>
  
  </div>
  
  </div>
  
  </div>
      }
   

    
    return ( 

        
        <div className="container d-flex-inline justify-content-center">

            { 
                renderer
            }
            
        </div>
     );
}
 
export default Tickets;