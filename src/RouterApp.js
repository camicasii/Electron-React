import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Logo from './component/Logo';
import RawApp from './component/RawApp';
import NavBar from './component/Navbar';
import Tickets from './component/Tickets';
import Sell from './component/Sell';


class RouterApp extends Component {
    state = {
        arraySelect:[],
        arraySell:[],
        generateTickets:false,
        sellTickets:false

      }


    setArrAySelect=data=>{      
      const arraySelect =data
      const generateTickets = true

            
      this.setState({
        arraySelect,
        generateTickets
      })
      
      
      
    }
  
    handdleSell=(index)=>{
      const arraySell = this.state.arraySell;
      const arraySelect = this.state.arraySelect;
      const sellTickets = true

      if(index.length===0)
      console.log("null");
     else{      
       arraySelect[index].SELL = true
      arraySell.push(index)
      this.setState({
        arraySelect,
        arraySell
      })
      this.isSell(sellTickets)

      }
    }  
    
    isSell(state){
      const sellTickets = this.state.sellTickets

      if(sellTickets ===false){
        this.setState({
          sellTickets:state
        }
        )
      }

    }
  
    render() { 
          
        return (
          <React.Fragment>

          <Logo/>         
          
          <div className ="container-fux">
          

          <Router>
          <NavBar/>
        
          <Route exact path="/" render={(props)=><RawApp {...props} 
              setArrAySelect={this.setArrAySelect}
              hola={this.hola}
              />} />
            <Switch>
             
              <Route exact path="/tickets"  render={(props)=><Tickets {...props}  tickets={this.state.arraySelect}
                handdleSell = {this.handdleSell}  
                generateTickets ={this.state.generateTickets}                
                 />} />
                <Route exact path="/sell"  render={(props)=><Sell {...props}  tickets={this.state.arraySelect}
                sell={this.state.arraySell}
                sellTickets={this.state.sellTickets}
                generateTickets ={this.state.generateTickets} 
                
               />} />
            </Switch>
          </Router>

          </div>
          </React.Fragment>

          );
    }
}
 
export default RouterApp;
