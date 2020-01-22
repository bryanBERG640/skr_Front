import React from "react";
import { connect } from "react-redux"; //Sirve para conectar las librerias de react y redux, se utiliza para cada componente que se quiera dar acceso al store.
import { getPostulanteB } from "../../request/request";
import { setPostulante, setOpen } from "../../actions/postulanteB";
import { setPostulanteC } from "../../actions/postulanteB";
import { getPostulanteTodo } from "../../request/request";
import { setRadioButton } from "../../actions/postulanteB";
import Cargando from "../paginas/Loading"
import {AuthContext} from "../Login/auth"

// const Auth=props=>(
//   (
//         <div>
//           <AuthContext.Consumer>
//             {
//              (context)=>
//              (return context.state.token)
//             }
//           </AuthContext.Consumer>
//         </div>
//       )
// )



class filtrosPB extends React.Component {

  static contextType=AuthContext;


  state = {
    
    resp: [],
    pos: [],
    postulanteC: [],
    auth:this.context.token
  };

  componentDidMount() {
    //console.log("didmountFiltros")
      //if(this.context) this.setState({auth:this.context.token})
      this.getPostulanteB();
      this.getPostulanteTodo();

  }

  getPostulanteB = async () => {
    //console.log(this.state.auth)
    const nuevoGet = await getPostulanteB(this.state.auth);
    this.setState({ resp: nuevoGet.data });
  };

  getPostulanteTodo = async () => {
    const nuevoGet = await getPostulanteTodo(this.state.auth);
    this.setState({ postulanteC: nuevoGet.data });
  };

  handleClick = e => {
    // debugger
    let verdadero = false;
    let pb = parseInt(e.target.value);
    this.state.resp.map(postulante => {
      if (pb === postulante.id_postulante_b) {
        this.props.dispatchSetPostulante(postulante); //Se almacena en el store una función.
      }
      return postulante
    });

    this.state.postulanteC.map(postulante => {
      if (pb === postulante.postulanteb.id_postulante_b) {
        this.props.dispatchSetPostulantC(postulante); //Se almacena en el store una función si el postulanteB es un postulanteC.
        verdadero = true;
      }
      return postulante
    });
    if (verdadero === false) {
      this.props.dispatchSetPostulantC(null);
    }
    this.props.dispatchSetRadioButton("Pulsado");
  };

  actualizar()
  {
    this.getPostulanteB();
    this.getPostulanteTodo();
    this.props.dispatchSetOpen(false)
  }

  render() {
    const { resp } = this.state;

    //console.log(this.state.auth)

    if(this.props.open===true)
      this.actualizar()

    var groupPB=[]
    var x

    if(this.state.postulanteC.length===0 ) return <Cargando/>

    for(x=0;x<resp.length; x++)
    {
      const i = resp[x].id_postulante_b;
      const n = resp[x].nombre ;
      const a1 = resp[x].apellido1;
      const a2 = resp[x].apellido2 ;
      const t = resp[x].telefono ;
      const c = resp[x].celular;
      const co = resp[x].correo ;
      const d = resp[x].perfil.descripcion ;
      const ver = resp[x].estatuspostulante.descripcion;
      if (
        this.props.perfil === "" &&
        this.props.nombre === "" &&
        this.props.apellido1 === ""
      ) {
        if (ver === "No Contactado") {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />

              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
        }
      } else if (
        this.props.perfil === "" &&
        this.props.nombre === "" &&
        this.props.apellido1 !== ""
      ) {
        if (this.props.apellido1 === a1) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
          
        }
      } else if (
        this.props.perfil === "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 === ""
      ) {
        if (this.props.nombre === n) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
          
        }
      } else if (
        this.props.perfil === "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 !== ""
      ) {
        if (this.props.nombre === n && this.props.apellido1 === a1) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
          
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre === "" &&
        this.props.apellido1 === ""
      ) {
        if (this.props.perfil === d) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
          
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre === "" &&
        this.props.apellido1 !== ""
      ) {
        if (this.props.perfil === d && this.props.apellido1 === a1) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
          
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 === ""
      ) {
        if (this.props.perfil === d && this.props.nombre === n) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
          
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 !== ""
      ) {
        if (
          this.props.perfil === d &&
          this.props.nombre === n &&
          this.props.apellido1 === a1
        ) {
          groupPB[x]=
            <tr key={resp[x].id} style={{ whiteSpace: "nowrap" }}>
              <input
                type="radio"
                name="seleccionPB"
                value={i}
                onClick={this.handleClick}
              />
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
            </tr>
         
        }
      }
    }

    return groupPB;
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetPostulante: value => dispatch(setPostulante(value)),
  dispatchSetPostulantC: value => dispatch(setPostulanteC(value)),
  dispatchSetRadioButton: value => dispatch(setRadioButton(value)),
  dispatchSetOpen: value=> dispatch(setOpen(value))
});

const mapStateToProps = state => ({
  postulante: state.postulante,
  auth: state.auth,
  open:state.open
});

export default connect(mapStateToProps, mapDispatchToProps)(filtrosPB); //El segundo parametro del metodo connect permitira trabajar con las acciones.
