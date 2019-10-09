import React from "react";
import { getPostulanteB, getPerfil } from "../../request/request";
import lapiz from "../../Imagenes/lapiz.png";
import { number } from "prop-types";
import Agendar from "../agendar";

class filtrosPB extends React.Component {
  state = {
    isLoading: true,
    resp: [],
    respPerf: [],
    selecPerf: "",
    selpos: {
      idp: number,
      nombre: "",
      apellido1: "",
      apellido2: ""
    }
  };

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.getPostulanteB();
    this.getPerfil();
    this.setState({ isLoading: false });
  };

  getPostulanteB = async () => {
    const nuevoGet = await getPostulanteB();
    this.setState({ resp: nuevoGet.data });
  };

  getPerfil = async () => {
    const nuevoGet = await getPerfil();
    this.setState({
      respPerf: nuevoGet.data
    });
  };

  handleClick = e => {
    let pb = parseInt(e.target.value);
    this.state.resp.map(postulante => {
      if (pb === postulante.id_postulante_b) {
        this.setState({ idp: postulante.id_postulante_b });
        this.setState({ nombre: postulante.nombre });
        this.setState({ apellido1: postulante.apellido1 });
        this.setState({ apellido2: postulante.apellido2 });
      }
    });
  };

  render() {
    console.log(this.state.idp)
    console.log(this.state.nombre)
    console.log(this.state.apellido1)
    console.log(this.state.apellido2)
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

export default filtrosPB;
