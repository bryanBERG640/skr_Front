import React from "react";
import { watcherUserChanges, watcherUser } from "./watcher";
import { postLogin } from "../../request/request";
// import { createUser, deleteUser, updateUser } from "./api";

export const AuthContext = React.createContext();

export class AuthContextProvider extends React.Component {
  state = {
    isLoggedIn: false,
    authReady: false,
    user: null,
    usuarios: [],
    token:null,
    rol: null
  };

  componentDidMount() {
    //console.log("actualizando contexto")
    watcherUserChanges(user => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          authReady: true,
          user
        });
      } else {
        this.setState({
          isLoggedIn: false,
          authReady: true,
          user: null,
          token:"denegado",
          rol:false
        });
      }
    });

    watcherUser(usuarios => {
      this.setState({ usuarios });
    });
  }

  verificacion = () => {
    //console.log("verificando...");
    // watcherUser(usuarios => {
    //   this.setState({ usuarios });
    // });

    this.state.usuarios.map(us => {
      //console.log(us);
      
      if (us.correo === this.state.user.email) {
        

        this.setState({rol:us.rol});

        postLogin(us.nombre, us.correo)
          .then(response => {
            //console.log(response)
            this.setState({token:response.headers.authorization});
          })
          .catch(console.log);
      }
      // else
      //   this.setState({token:"denegado"})

      return us;
    });
  };

  render() {
    //console.log(this.state.usuarios); 
    const {isLoggedIn}= this.state

    if(isLoggedIn===true){
      if (this.state.user !== null) {
        if (this.state.usuarios.length === 0) {
          //console.log("usuarios vacios");
          this.verificacion();
        } else {
          //console.log("usuarios encontrados");
          if (this.state.rol === null) {
            this.verificacion();
          }
        }
      }
    }

    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthContextConsumer = AuthContext.Consumer;
