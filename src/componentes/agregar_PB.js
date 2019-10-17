import React from "react";
import "../App.css";
import "./styles/agregar_PB.css";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import agregar from "../Imagenes/agregar.png";
import {
  getPostulanteB,
  getPerfil,
  postSeccion,
  getEstatusPostulante
} from "../request/request";
import { number } from "prop-types";
import agrP from "../Imagenes/agregar-postulante.png";
import { Link } from "react-router-dom";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 500
    }}
  />
);

class agregar_PB extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      respPerf: [],
      respEstatus: [],
      perfil: 0,
      estatuspostulante: 0,
      postulante: {
        apellido1: "",
        apellido2: "",
        nombre: "",
        correo: "",
        telefono: "",
        celular: "",
        observaciones: "",
        usuario_actualiza:"Bryan Ramirez",
        fecha_actualizacion:"2019-10-17"
      }
    };
  }

  onChange(e) {
    let pos = this.state.postulante;

    if (e.target.name === "nombre") {
      pos.nombre = e.target.value;
      this.setState({
        postulante: pos
      });
    }
    if (e.target.name === "apellido1") {
      pos.apellido1 = e.target.value;
      this.setState({
        postulante: pos
      });
    }
    if (e.target.name === "apellido2") {
      pos.apellido2 = e.target.value;
      this.setState({
        postulante: pos
      });
    }
    if (e.target.name === "correo") {
      pos.correo = e.target.value;
      this.setState({
        postulante: pos
      });
    }
    if (e.target.name === "telefono") {
      pos.telefono = e.target.value;
      this.setState({
        postulante: pos
      });
    }
    if (e.target.name === "celular") {
      pos.celular = e.target.value;
      this.setState({
        postulante: pos
      });
    }

    if (e.target.name === "observaciones") {
      pos.observaciones = e.target.value;
      this.setState({
        postulante: pos
      });
    }
  }

  componentWillMount = () => {
    getPostulanteB()
      .then(response => {
        let nuevoGet = [];
        nuevoGet.push(response);
        this.setState({ resp: nuevoGet });
        console.log(this.state.resp);
      })
      .catch(console.log);
    this.getEstatusPostulante();
    this.getPerfil();
    this.setState({ isLoading: false });
  };

  getEstatusPostulante = async () => {
    const nuevoGet = await getEstatusPostulante();
    this.setState({
      respEstatus: nuevoGet.data
    });
  };

  getPerfil = async () => {
    const nuevoGet = await getPerfil();
    this.setState({
      respPerf: nuevoGet.data
    });
  };

  hanleClick = e => {
    //console.log(this.state.postulante);
    postSeccion(
      this.state.postulante,
      this.state.estatuspostulante,
      this.state.perfil
    )
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  };

  handleSelect1 = e => {
    // console.log(e.target.value);
    this.state.respPerf.map(perf => {
      if (e.target.value === perf.descripcion) {
        this.setState({ perfil: perf.id_perfil });
      }
    });
  };

  handleSelect2 = e => {
    //console.log(e.target.value);
    this.state.respEstatus.map(est => {
      if (e.target.value === est.descripcion) {
        this.setState({ estatuspostulante: est.id_estatus_postulante });
      }
    });
    /*let pos = this.state.postulante;
    this.state.respEstatus.map(est => {
      if (e.target.value === est.descripcion) {
        pos.estatuspostulante = est.id_estatus_postulante;
      }
    });
    this.setState({ postulante: pos });*/
  };

  render() {
    const { respPerf, respEstatus } = this.state;
    const perfiles = respPerf.map(perf => {
      return <option value={perf.descripcion}>{perf.descripcion}</option>;
    });

    const estatus = respEstatus.map(st => {
      return <option value={st.descripcion}>{st.descripcion}</option>;
    });
    /*console.log(this.state.postulante);
    console.log(this.state.perfil);
    console.log(this.state.estatuspostulante);*/
    return (
      <div className="Content">
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="agregarP" src={agrP} alt="agregarP" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>

        <div>
          <h2 className="titulo">Agregar Postulantes</h2>
        </div>
        <div class="row">
          <div class="column" align="right">
            <p>
              <label htmlFor="perfil">Perfil: </label>
            </p>
            <p>
              <label htmlFor="name">Nombre(s): </label>
            </p>
            <p>
              <br />
              <label htmlFor="ap"> Apellido Paterno: </label>
            </p>
            <p>
              <br />
              <label htmlFor="am"> Apellido Materno: </label>
            </p>

            <label htmlFor="correo"> Correo(s) Electrónico(s): </label>

            <p>
              <br />
              <label htmlFor="telefono"> Teléfono: </label>
            </p>
            <br />
            <p>
              <label htmlFor="celular"> Celular: </label>
            </p>
            <br />
            <p>
              <label htmlFor="estatus"> Estatus: </label>
            </p>

            <p>
              <label htmlFor="descripcion"> Descripción: </label>
            </p>
          </div>

          <div class="column" align="righ">
            <div className="form-group">
              <select
                value={this.state.value}
                onChange={this.handleSelect1}
                name="perfil"
                className="form-control"
              >
                <option>Elija una opción</option>
                {perfiles}
              </select>
            </div>

            <input
              value={this.state.postulante.nombre}
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Escribe tu nombre"
              autocomplete="off"
              id="name"
              name="nombre"
              type="text"
            />
            <br />
            <input
              value={this.state.postulante.apellido1}
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Escribe tu apellido paterno"
              autocomplete="off"
              id="apellido1"
              name="apellido1"
              type="text"
            />
            <br />
            <input
              value={this.state.postulante.apellido2}
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Escribe tu apellido materno"
              autocomplete="off"
              id="apellido2"
              name="apellido2"
              type="text"
            />
            <br />
            <input
              value={this.state.postulante.correo}
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Escribe tu correo electrónico"
              autocomplete="off"
              id="correo"
              name="correo"
              type="text"
            />
            <br />

            <input
              value={this.state.postulante.telefono}
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Escribe tu telefono"
              autocomplete="off"
              id="telefono"
              name="telefono"
              type="text"
            />
            <br />

            <input
              value={this.state.postulante.celular}
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Escribe tu celular"
              autocomplete="off"
              id="celular"
              name="celular"
              type="text"
            />
            <br />
            <div className="form-group">
              <select
                name="estatuspostulante"
                value={this.state.value}
                onChange={this.handleSelect2}
                className="form-control"
              >
                <option>Elija una opción</option>
                {estatus}
              </select>
            </div>

            <br />
            <textarea
              value={this.state.postulante.observaciones}
              onChange={this.onChange.bind(this)}
              name="observaciones"
              id="observaciones"
              rows="4"
              cols="50"
            />
          </div>

          <div class="column" align="center">
            <input type="image" className="agregar" src={agregar} />
            <h4> Guardar CV en formato PDF </h4>
            <br />

            <Link
              to="/consultar-Postulantes"
              className="btn btn-primary"
              onClick={this.hanleClick}
              nombre={this.state.nombre}
            >
              Guardar
            </Link>

            <br />
            <br />
            <Link to="/consultar-Postulantes" className="btn btn-primary">
              Salir
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default agregar_PB;
