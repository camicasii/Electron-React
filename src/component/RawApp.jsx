import React, { Component } from 'react';
 import {ticketsSerializer2, combinacion, } from '../util/utils'

class RawApp extends Component {
    state = { 
        totalTicket:10,        
        numBoll: 24,
        selectArray: "1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24",
        asing: 6
             
     }

     maxBollRef = React.createRef()
     asingRef = React.createRef()
     selectArrayRef = React.createRef()
     totalTicketRef = React.createRef()

     componentDidMount(){
        const prob = document.querySelector('#prob')
        const win = document.querySelector('#winWin')
        prob.innerHTML = " 0"
        win.innerHTML = "#"
     }
     
   
     handdleForm=()=>{
        const totalTicket = this.totalTicketRef.current.value
        const numBoll = this.maxBollRef.current.value        
        const selectArray =this.selectArrayRef.current.value
        const asing  = this.asingRef.current.value
        this.message()  
        this.setState({
            totalTicket,            
            numBoll,
            selectArray,
            asing
        })
     }

    dataAnalys=()=>{
        const numBoll = Number(this.maxBollRef.current.value)
        const asing  = Number(this.asingRef.current.value)
        const Combinaciones =   combinacion(numBoll,asing)
        const  Combinacionesres = combinacion(numBoll,numBoll-asing)
        const prob = document.querySelector('#prob')
        const win = document.querySelector('#winWin')
        prob.innerHTML = Combinaciones
        win.innerHTML = parseFloat((1/Combinaciones)).toExponential(4)
        
    }

     generarteTickets=async()=>{
        const totalTicket = this.state.totalTicket
        const asing = this.state.asing
        const selectArray = this.state.selectArray        
        const readyArray = selectArray.split("-")
        const tickets = await ticketsSerializer2(totalTicket,asing,readyArray)
        this.props.setArrAySelect(tickets)  
        this.dataAnalys()
        
     }

 
     message =()=>{      
      const numBoll = Number(this.maxBollRef.current.value)
        const asing  = Number(this.asingRef.current.value)
        if(asing>=numBoll){
          console.log("sms true");
  
        const electron = window.require('electron')
        const ipcRenderer  = electron.ipcRenderer;
        const html = "Numero Bolitas debe ser menor al Asiertos"    
        ipcRenderer.send('send',html)
        this.setState({      
          numBoll:"",      
          asing:""
      })}
}
    render() { 
        return (   
          <React.Fragment>       
    <div className="row mb-3 justify-content-center mt-2">
      
      <div className="card ">
      <form onChange={this.handdleForm}>
        <div className="card-body">
          {/*Default input -->*/}
          
          <div className="row">          
            <div className="col">
              <label htmlform="exampleForm2">Bolitas</label>
              <input type="text" id="exampleForm2" className="form-control" ref={this.maxBollRef}                 
              onKeyPressCapture={this.message} />
            </div>

            <div className="col">
              <label htmlform="exampleForm1">Asiertos</label>
              <input type="text" id="exampleForm1" className="form-control" ref ={this.asingRef}/>
            </div>
          </div>
          <label htmlform="exampleForm1">bolitas del sorteo</label>
          <input type="text" id="exampleForm1" className="form-control" ref={this.selectArrayRef} />
          <small>Separe con un "-"" las bolitas</small>          
        </div>

        

        <div className="d-flex justify-content-center  ">        
        <div className="col-3">
              <label htmlform="exampleForm1"> Nº Tickets</label>
              <input type='num' id="exampleForm1" className="form-control" ref={this.totalTicketRef} />
        </div>
        {/**botoooooonnn */}
        <div>
        <button type="button" className="btn btn-primary btn-sm m-0 " onClick={this.generarteTickets}
        >General Tickets</button>
        </div>        
        </div>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="col">
    <div className="table-responsive text-nowrap">
       <table className="table text-center">

       <thead>
       <tr>
       <th colSpan="2"> Estadisticas de la Loteria</th>
       </tr></thead>
         <tbody>
           {/*<!-- Combinaiones -->*/}
           <tr>             
             <th scope="row">Combinaiones posibles</th>
             <td id="prob" ></td>        
           </tr>
           {/*<!-- Probabilidad -->*/}
           <tr>             
             <th scope="row">Probabilidad de Ganar</th>
             <td id="winWin"></td>                     
           </tr>
         </tbody>
       </table>
       </div>
       </div>
    </div>   
  

            </React.Fragment>

        );
    }
}
 
export default RawApp;