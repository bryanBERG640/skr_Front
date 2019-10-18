import React from "react";
import { connect } from "react-redux"; //Sirve para conectar las librerias de react y redux, se utiliza para cada componente que se quiera dar acceso al store.
import { getPostulanteB } from "../../request/request";
import lapiz from "../../Imagenes/lapiz.png";
import { setPostulante } from "../../actions/postulanteB";
import { setPostulanteC } from '../../actions/postulanteB';
import { getPostulanteTodo } from '../../request/request';

class filtrosPB extends React.Component {
  state = {
    isLoading: true,
    isLoadingPC:  true,
    resp: [],
    pos: [],
    postulanteC: []
  };

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.getPostulanteB();
    this.getPostulanteTodo();
    this.setState({ isLoading: false });
    this.setState({ isLoadingPC: false})
  };
  getPostulanteB = async () => {
    const nuevoGet = await getPostulanteB();
    this.setState({ resp: nuevoGet.data });
  };
  getPostulanteTodo = async () => {
    const nuevoGet = await getPostulanteTodo();
    this.setState({ postulanteC: nuevoGet.data });
  }
  handleClick = e => {
    let pb = parseInt(e.target.value);
      this.state.resp.map(postulante => {
        if (pb === postulante.id_postulante_b) {
          this.props.dispatchSetPostulante(postulante); //Se almacena en el store una función.
        }
      });

    this.state.postulanteC.map(postulante => {
      if (pb === postulante.postulanteb.id_postulante_b) {
        this.props.dispatchSetPostulantC(postulante); //Se almacena en el store una función si el postulanteB es un postulanteC.
      }
    });
  };

  render() {
    // console.log(this.state.resp);
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
  dispatchSetPostulante: value => dispatch(setPostulante(value)),
  dispatchSetPostulantC: value => dispatch(setPostulanteC(value))
});

export default connect(
  null,
  mapDispatchToProps
)(filtrosPB); //El segundo parametro del metodo connect permitira trabajar con las acciones.
