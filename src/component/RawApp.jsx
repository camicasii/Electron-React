import React, { Component } from 'react';
 import {ticketsSerializer2, combinacion,ticketsRandomSerializer } from '../util/utils'

class RawApp extends Component {
    state = { 
        totalTicket:10,        
        numBoll: 2,
        selectArray: "1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24",
        asing: 1,
        typeGame:false
             
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
     generarteTicketsRandom=async() =>{
      const totalTicket = Number(this.state.totalTicket)
      const asing = Number(this.state.asing)
      const numBoll = Number(this.state.numBoll)
      const tickets = await ticketsRandomSerializer(totalTicket,asing,numBoll)
      this.props.setArrAySelect(tickets)  
      this.dataAnalys()
     }

     checkType=()=>{
        const a = document.getElementById('option1')
        const b = document.getElementById('option2')
        if(a.checked===true){
            a.toggleAttribute('checked')
            a.classList.toggle('active')
            b.classList.toggle('active')
        }
        else {
          b.toggleAttribute('checked')
          a.classList.toggle('active')
          b.classList.toggle('active')
        }
        console.log(a,b);
        

       /*const typeGame = this.state.typeGame
       
       this.setState({
        typeGame:!typeGame
       })*/
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
      let www =null
      const check = this.state.typeGame
      if(!check){
      www = (  <div className="card ">
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
      </div>)
      }
      else{
        //////////segunta forma de jugar
        www = (  <div className="card ">
      <form onChange={this.handdleForm}>
        <div className="card-body">
          {/*Default input -->*/}
          
          <div className="row">          
            <div className="col">
              <label htmlform="exampleForm2">Numero maximo de Bolitas</label>
              <input type="text" id="exampleForm2" className="form-control" ref={this.maxBollRef}                 
              onKeyPressCapture={this.message} />
            </div>
            <div className="col">
              <label htmlform="exampleForm1">Asiertos</label>
              <input type="text" id="exampleForm1" className="form-control" ref ={this.asingRef}/>
            </div>
          </div>          
        </div>

        

        <div className="d-flex justify-content-center  ">        
        <div className="col-3 ">
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
      </div>)
      }


        return (   
          <React.Fragment>       
          <div className="container">
    <div className=" text-center bg-aqua w-100" onClick={this.checkType}>
   
    <div class="btn-group btn-group-toggle" >    
  <label class="btn btn-secondary active">
    <input type="radio" name="options" id="option1" autocomplete="off"  /> Modo personalizado
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option2" autocomplete="off" checked /> Modo Aleatorio
  </label>
  
</div>
    </div>
    <div className="row mb-3 justify-content-center mt-2">
      
    


{www}
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
  
</div>
            </React.Fragment>

        );
    }
}
 
export default RawApp;