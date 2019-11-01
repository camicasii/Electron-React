import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <React.Fragment>
<nav className="navbar navbar-expand navbar-dark primary-color myNav">
<NavLink to="/"><span className="navbar-brand">Navbar</span></NavLink>
  
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
      <NavLink to="/"><span className="nav-link" >Home </span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/tickets"> <span className="nav-link" >Tickets</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/sell"> <span className="nav-link" >Sell</span></NavLink>
      </li>      
    </ul>
  </div>
</nav>


        </React.Fragment>


      );
}
 
export default NavBar;
