import React from "react";
import "../App.css";
import "./styles/agregar_PB.css";
import agregar from "../Imagenes/agregar.png";
import { Link } from "react-router-dom";

class agregar_PB extends React.Component {
  constructor() {
    super();

    this.state = {
      titulo: ""
    };
  }
  componentDidMount() {
    this.setState({
      titulo: "Agregar Postulante"
    });
  }

  render() {
    return (
      <div className="Content">
        <div align="center">
          <td>
            <h1>{this.state.titulo}</h1>
            <br />
            <br />
          </td>
        </div>

        <div class="row">
          <div class="column" align="right">
            <p>Perfil:</p>


            <p><br/>Nombre(s):</p>

            <p><br/>Apellido Paterno:</p>

            <p><br/>Apellido Materno:</p>

            <br/>Correo Electrónico:<br/>
            
            <p><br/>Teléfono:</p>
            <br/>
            <p>Celular:</p>
            <br/>
            <p>Estatus:</p>
            <br/>
            <p>Contactado por:</p>
            <p>Descripción:</p>
          </div>

          <div class="column" align="righ">
            <div className="form-group">
              <select className="form-control">
                <option>Tester</option>
                <option>Programador java</option>
              </select>
            </div>

            <input
              className="form-control"
              placeholder="Escribe tu nombre"
              autocomplete="off"
              name="Nombre"
              type="text"
            />
            <br />
            <input
              className="form-control"
              placeholder="Escribe tu apellido paterno"
              autocomplete="off"
              name="Apellido_1"
              type="text"
            />
            <br />
            <input
              className="form-control"
              placeholder="Escribe tu apellido materno"
              autocomplete="off"
              name="Apellido_2"
              type="text"
            />
            <br />
            <input
              className="form-control"
              placeholder="Escribe tu correo electrónico"
              autocomplete="off"
              name="Correo_electronico"
              type="text"
            />
            <br />

            <input
              className="form-control"
              placeholder="Escribe tu telefono"
              autocomplete="off"
              name="Telefono"
              type="text"
            />
            <br />

            <input
              className="form-control"
              placeholder="Escribe tu celular"
              autocomplete="off"
              name="Estatus"
              type="text"
            />
            <br />

            <input
              className="form-control"
              placeholder="Escribe tu estatus"
              autocomplete="off"
              name="Celular"
              type="text"
            />

            <br />
            <div className="form-group">
              <select className="form-control">
                <option>Contactado</option>
                <option>No Contactado java</option>
              </select>
            </div>

            <textarea rows="4" cols="50" />
          </div>

          <div class="column" align="center">
            <input type="image" className="agregar" src={agregar} />
            <br />
            <button to="/" className="btn btn-primary">
              Guardar
            </button>
            <br />
            <br />
            <button to="/" className="btn btn-primary">
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default agregar_PB;
