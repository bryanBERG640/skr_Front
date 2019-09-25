import React, { Component } from "react";
import Icono from "../Imagenes/postulantes.png";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import lupa from "../Imagenes/lupa.png";

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

export default class consula_PB extends Component {
  state = {
    isLoading: true,
    resp: []
  };

  async componentDidMount() {
    const response = await fetch("/postulanteB/get");
    const body = await response.json().catch(console.log);
    this.setState({ resp: body, isLoading: false });
  }

  /*componentDidMount() {
    this.setState({ isLoading: true });

    fetch("/postulanteB/get")
      .then(response => response.json())
      .then(data => this.setState({ resp: data, isLoading: false }))
      .catch(console.log);
  }*/

  render() {
    const { resp, isLoading } = this.state;

    if (isLoading) {
      return <p>Cargando...</p>;
    }

    const groupPB = resp.map(group => {
      const postB = `${group.nombre || ""} ${group.apellido1 || ""}
      ${group.apellido2 || ""} ${group.telefono || ""} ${group.celular || ""}
      ${group.correo || ""}`;
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
            <div className="form-group">
              <label>Perfil: </label>
              <select className="form-control">
                <option>prueba</option>
                <option>prueba2</option>
              </select>
            </div>

            <label>Nombre(s): </label>
            <input className="form-control" type="text" name="nombre" />

            <div>
              <label>Apellido Paterno: </label>
              <input className="form-control" type="text" name="nombre" />
            </div>

            <div>
              <label>Apellido Materno: </label>
              <input type="text" className="form-control" name="nombre" />
            </div>
          </form>
          <div>
            <input
              className="lupa"
              type="image"
              src={lupa}
              width="150"
              height="150"
            />
          </div>

          <br />

          <form className="form-hor" role="form">
            <div className="form-group">
              <button type="button" className="btn btn-primary">
                Agregar Postulante
              </button>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Completar Datos
              </button>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Agendar
              </button>
              &nbsp; &nbsp;
              <button type="button" className="btn btn-primary">
                Mostrar Ficha
              </button>
              &nbsp; &nbsp;
            </div>
          </form>
        </div>

        <table className="mt-4">
          <thead>
            <tr>
              <th width="15%">Nombre</th>
              <th width="15%">Apellido Paterno</th>
              <th width="15%">Apellido Materno</th>
              <th width="10%">Telefono</th>
              <th width="10%">Celular</th>
              <th width="15%">Correo</th>
              <th width="5%">Contactado</th>
              <th width="10%">Perfil</th>
              <th width="5%">Editar</th>
            </tr>
          </thead>
          <tbody>{groupPB}</tbody>
        </table>
      </React.Fragment>
    );
  }
}
