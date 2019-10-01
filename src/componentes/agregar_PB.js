import React from "react";
import "../App.css";
import "./styles/agregar_PB.css";
import agregar from "../Imagenes/agregar.png";
import { getPostulanteB, getPerfil, postSeccion } from "../request/request";
import { number } from "prop-types";

class agregar_PB extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      respPerf: [],

      postulante: {
        perfil: number,
        apellido1: "",
        apellido2: "",
        nombre: "",
        correo: "",
        telefono: number,
        celular: number,
        observaciones: ""
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

    this.getPerfil();
    this.setState({ isLoading: false });
  };

  getPerfil = async () => {
    const nuevoGet = await getPerfil();
    this.setState({
      respPerf: nuevoGet.data
    });
  };

  hanleClick = e => {
    console.log(this.state.postulante);

    postSeccion(this.state.postulante, 1, 1)
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
    console.log("POST REALIZADO");
  };

  render() {
    const { respPerf } = this.state;
    const perfiles = respPerf.map(perf => {
      return <option value={perf.descripcion}>{perf.descripcion}</option>;
    });

    return (
      <div className="Content">
        <div align="center">
          <td>
            <h1>Agregar Postulantes</h1>
            <br />
            <br />
          </td>
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
                id="perfil"
                value={this.state.postulante.perfil}
                onChange={this.onChange.bind(this)}
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
                id="estatuspostulante"
                name="estatuspostulante"
                value={this.state.postulante.estatuspostulante}
                onChange={this.onChange.bind(this)}
                className="form-control"
              >
                <option>Elija una opción</option>
                <option>Asistió</option>
                <option>No asistió</option>
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

            <button
              to="/"
              className="btn btn-primary"
              onClick={this.hanleClick}
            >
              Guardar
            </button>

            <br />
            <br />
            <button to="/" className="btn btn-primary">
              Salir
            </button>

            <p> {JSON.stringify(this.state.postulante)} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default agregar_PB;
