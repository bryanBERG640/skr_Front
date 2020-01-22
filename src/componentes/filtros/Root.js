import React from "react";
import { AuthContext } from "../Login/auth";
import Progress from "../paginas/Loading";
import Denegado from "../../Imagenes/accesoDenegado.jpg"
import Login from "../Login/LoginView";

class Root extends React.Component {
  render() {
    const { children } = this.props;
    const { authReady, token, rol, isLoggedIn } = this.context;
    console.log(token)

    if (!authReady) 
    {
      //if()
       return <Progress />;
    }
    else if(token===null)
      return <Progress />;
    else if(rol===null)
      return <Progress />;
    else if(token==="denegado" && isLoggedIn===false)
      return <Login/>
    else if(token===false && isLoggedIn===true)
      return <img src={Denegado} alt="denegado"/>
    else
      return children;
  }
}

Root.contextType = AuthContext;



export default Root;
