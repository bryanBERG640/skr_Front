import React from "react";
import { connect } from 'react-redux';//Sirve para conectar las librerias de react y redux, se utiliza para cada componente que se quiera dar acceso al store.
import { getPostulanteB, getPerfil } from "../../request/request";
import lapiz from "../../Imagenes/lapiz.png";
import { number } from "prop-types";
import Agendar from "../agendar";
import { setPostulante } from '../../actions/index';

class filtrosPB extends React.Component {
  state = {
    isLoading: true,
    resp: [],
<<<<<<< HEAD
    Postulante: []
=======
    pos: []
    // respPerf: [],
    // selecPerf: "",
    // selpos: {
    //   idp: number,
    //   nombre: "",
    //   apellido1: "",
    //   apellido2: ""
    // }
>>>>>>> e66e9683260a3d7f32203b8b93e2231373777e9d
  };

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.getPostulanteB();
    this.setState({ isLoading: false });
  };

  getPostulanteB = async () => {
    const nuevoGet = await getPostulanteB();
    this.setState({ resp: nuevoGet.data });
  };

  handleClick = e => {
    console.log("Funcion handleClick");
    let pb = parseInt(e.target.value);
    this.state.resp.map(postulante => {
      if (pb === postulante.id_postulante_b) {
<<<<<<< HEAD
        this.setState({ Postulante: postulante });
      }
    });

=======
        // this.setState({ idp: postulante.id_postulante_b });
        // this.setState({ nombre: postulante.nombre });
        // this.setState({ apellido1: postulante.apellido1 });
        // this.setState({ apellido2: postulante.apellido2 });

        console.log("Valor del estate nobre:-- " + postulante)//Se imprime el valor de psotulante.nombre
       this.props.dispatchSetPostulante(postulante);//Se almacena en el store una función.
      }
    });
    console.log("Presionaste el boton y ahora estas dentro de handleClick");
>>>>>>> e66e9683260a3d7f32203b8b93e2231373777e9d
  };

  render() {

    const { resp } = this.state;
    const groupPB = resp.map(postulante => {
      const i = `${postulante.id_postulante_b}`;
      const n = `${postulante.nombre || ""}`;
      const a1 = `${postulante.apellido1 || ""}`;
      const a2 = `${postulante.apellido2 || ""}`;
      const t = `${postulante.telefono || ""}`;
      const c = `${postulante.celular || ""}`;
      const co = `${postulante.correo || ""}`;
      const d = `${postulante.perfil.descripcion || ""}`;
      const ver = `${postulante.estatuspostulante.descripcion || ""}`;
      if (
        this.props.perfil === "" &&
        this.props.nombre === "" &&
        this.props.apellido1 === ""
      ) {
        if (ver === "No Contactado") {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      } else if (
        this.props.perfil === "" &&
        this.props.nombre === "" &&
        this.props.apellido1 !== ""
      ) {
        if (this.props.apellido1 === a1) {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      } else if (
        this.props.perfil === "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 === ""
      ) {
        if (this.props.nombre === n) {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      } else if (
        this.props.perfil === "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 !== ""
      ) {
        if (this.props.nombre === n && this.props.apellido1 === a1) {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre === "" &&
        this.props.apellido1 === ""
      ) {
        if (this.props.perfil === d) {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre === "" &&
        this.props.apellido1 !== ""
      ) {
        if (this.props.perfil === d && this.props.apellido1 === a1) {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      } else if (
        this.props.perfil !== "" &&
        this.props.nombre !== "" &&
        this.props.apellido1 === ""
      ) {
        if (this.props.perfil === d && this.props.nombre === n) {
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
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
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
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
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
      }
    });


    return groupPB;
  }
}

const mapDispatchToProps = dispatch => ({
    dispatchSetPostulante: value => dispatch(setPostulante(value))
  });

  export default connect(null, mapDispatchToProps)(filtrosPB);//El segundo parametro del metodo connect permitira trabajar con las acciones.
  