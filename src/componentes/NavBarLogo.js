import React from 'react';
import './styles/NavBarLogo.css'
import logo from '../Imagenes/logo.png'

class NavbarLogo extends React.Component{
  render(){
    return(
      <div className="Navbar">
        <div className="container-fluid">
          <a className="Navbar__brand" href="/">
            <img className="Navbar_logo" src ={logo} alt= "Logo"/>
          </a>
        </div>
      </div>
    )
  }
}

export default NavbarLogo;