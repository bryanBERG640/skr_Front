import React, { Component } from "react";
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import lupa from "../Imagenes/lupa.png";
import lapiz from "../Imagenes/lapiz.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getPostulanteB, getPerfil } from "../request/request";

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

export default class consulta_PB extends Component {
  state = {
    isLoading: true,
    resp: [],
    respPerf: [],
    selecPerf: ""
  };

  handleSelect = e => {
    /*this.setState({ selecPerf: e.target.value });
    console.log(this.state.selecPerf);
    this.state.respPerf.map((perf, i) => {
      console.log(this.state.selecPerf[i]);
      if (perf.descripcion === this.state.selecPerf)
        console.log(this.state.respPerf.descripcion);
      return perf[i];
    });*/

    const selecperf = this.state.respPerf.map((perf, i = 0) => {
      console.log(perf.descripcion);
      console.log(i);
      return <option>{perf.descripcion}</option>;
    });
  };

  handleClick = e => {
    console.log("click");
  };

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

  render() {
    const { resp, isLoading, respPerf } = this.state;

    if (isLoading === true) {
      return <p>Cargando...</p>;
    }

    const perfiles = respPerf.map(perf => {
      return <option value={perf.descripcion}>{perf.descripcion}</option>;
    });

    const groupPB = resp.map(arr => {
      return arr.map(postulante => {
        const n = `${postulante.nombre || ""}`;
        const a1 = `${postulante.apellido1 || ""}`;
        const a2 = `${postulante.apellido2 || ""}`;
        const t = `${postulante.telefono || ""}`;
        const c = `${postulante.celular || ""}`;
        const co = `${postulante.correo || ""}`;
        const d = `${postulante.perfil.descripcion || ""}`;
        const ver = `${postulante.estatuspostulante.descripcion || ""}`;
        if (ver === "No Contactado") {
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
        console.log(postulante.perfil.descripcion);
      });
    });

    return (
      <React.Fragment>
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="postulantes" src={Icono} alt="postulantes" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
        
        <div>
          <h2 className="titulo">Consultar Postulantes</h2>
        </div>

        <div className="row">
          <form className="form-post">
            <div className="col">
              <label>Perfil: </label>
              <select className="form-control" onChange={this.handleSelect}>
                <option>Perfiles</option>
                {perfiles}
              </select>
            </div>
            <div className="col">
              <label>Nombre(s): </label>
              <input className="form-control" type="text" name="nombre" />
            </div>
            <div className="col">
              <label>Apellido Paterno: </label>
              <input className="form-control" type="text" name="nombre" />
            </div>
            <div className="col">
              <label>Apellido Materno: </label>
              <input type="text" className="form-control" name="nombre" />
            </div>
            <div className="col">
              <Button onClick={this.handleClick}>
                <img className="lupa" src={lupa} alt="consulta" height="50px" />
              </Button>
            </div>
          </form>

          <br />

          <form className="form-hor" role="form">
            <div className="form-group">
              <Link to="/agregar_PB" className="btn btn-primary">
                Agregar Postulante
              </Link>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Completar Datos
              </button>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Agendar
              </button>
              &nbsp; &nbsp;
              <Link to="/Ficha-Postulante" className="btn btn-primary">
                Mostrar Ficha
              </Link>
              &nbsp; &nbsp;
            </div>
          </form>
        </div>
        <div>
          <table className="mt-4">
            <thead>
              <tr>
                <th width="15%">Nombre</th>
                <th width="10%">Telefono</th>
                <th width="10%">Celular</th>
                <th width="15%">Correo</th>
                <th width="10%">Perfil</th>
<<<<<<< HEAD

                <th width="10%">Estatus</th>
                <th width="5%">Editar</th>
=======
                <th width="10%">Contactado</th>
                <th width="5%"  >Editar</th>
>>>>>>> 87de2f0ce809a49b63079e3661d3ab94ed5ee431
              </tr>
            </thead>
            <tbody>{groupPB}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
