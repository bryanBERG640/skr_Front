import React from "react";
import IconoEntrevista from '../../Imagenes/entrevista.png';
import TextField from "@material-ui/core/TextField";
import { getTipoEntrevista, getCliente } from '../../request/request';
import Autocompletado from '../Autocompletado/Autocommpletado';
import { Link } from "react-router-dom";
import TablaEntrevista from './TablaEntrevista';
import { connect } from 'react-redux';
import { number } from 'prop-types';

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

const fecha = new Date();

class Entrevista extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      tipoEntrevistas: [],
      tipoEntrevista: "",
      clientes: [],
      cliente: "",
      idEntrevista: number,
      idCita: number,
      idTipoEntrevista: number
    }
  }

  componentWillMount = () => {
    this.getTipoEntrevistas();
    this.getClientes();
  }
  getClientes = async () => {
    const nuevoGet = await getCliente();
    this.setState({ clientes: nuevoGet.data });
  }
  getTipoEntrevistas = async () => {
    const nuevoGet = await getTipoEntrevista();
    this.setState({ tipoEntrevistas: nuevoGet.data });
  };

  handleSelect = e => {
    this.state.tipoEntrevistas.map(entrevista => {
      if (entrevista.descripcion === e.target.value) {
        this.setState({ idTipoEntrevista: entrevista.id_tipo_entrevista});
        this.setState({ tipoEntrevista: entrevista.descripcion });
      }
    });
  }

  handleClick = e => {
    console.log("Dentro de la función handleClick");
    console.log("Nombre de postulante: " + this.props.postulante.nombre);
    console.log("Tipo de netrevista: " + this.state.tipoEntrevista);
    console.log("Id de tipo de entrevista: " + this.state.idTipoEntrevista)
    console.log("Cliente: " + this.props.cliente.descripcion)
    console.log("Id de cliente: " + this.props.cliente  .id_cliente)
  }

  render() {
    const { tipoEntrevistas } = this.state;
    const entrevista = tipoEntrevistas.map(entr => {
      return <option value={entr.descripcion}>{entr.descripcion}</option>
    })
    return (
      <React.Fragment>
        <div className="">
          <div align="center">
            <td>
              <ColoredLine color="black" />
            </td>
            <td>
              <img className="agci" src={IconoEntrevista} alt="agendar cita" />
            </td>
            <td>
              <ColoredLine color="black" />
            </td>
          </div>
          <div align="center">
            <h3>
              {this.props.postulante.nombre}&nbsp; &nbsp;
              {this.props.postulante.apellido1}&nbsp; &nbsp;
              {this.props.postulante.apellido2}
            </h3>
            <TextField
              label="Fecha Actual"
              type="date-local"
              defaultValue={
                fecha.getDate() +
                "/" +
                (fecha.getMonth() + 1) +
                "/" +
                fecha.getFullYear()
              }
              disabled
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <h3 align="center">
              Entrevistador: &nbsp; &nbsp;
            <label className="datosCita">
                {this.props.cita.entrevistador}
            </label>
            </h3>
          </div>
          <br /><br />

          <div className="container">
            <form>
              <div className="row" align="center">

                <div className="col-sm-6">
                  <div className="row">
                    <div className="col">
                      <h4>Tipo de entrevista</h4>
                    </div>
                    <div className="col">
                      <select
                        className="form-control"
                        value={this.state.value}
                        onChange={this.handleSelect}
                      >
                        <option>Tipo entrevista:</option>
                        {entrevista}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="row">
                    <div className="col">
                      <h4>Cliente:</h4>
                    </div>
                    <div className="col" align="center">
                      <Autocompletado valores={this.state.clientes} valor={this.props.cliente.descripcion}/>
                    </div>
                  </div>
                </div>
              </div>
              <br /><br /><br />
              <div className="row" align="center">
                <div className="col"></div>
                <div className="col-sm-3">
                  <h4>Comentarios:</h4>
                </div>
                <div className="col-sm-4">
                  <textarea
                    class="textArea form-control"
                    rows="4"
                    cols="60"
                    name="comentarios"
                    onChange={this.handleWrite}
                    defaulValue="">
                  </textarea>
                </div>
                <div className="col"></div>
              </div>
              <br/><br/>
              <div className="row justify-content-md-center">
                <div className="col col-lg-2">
                  {/* <Link  to="" className="btn btn-primary">Guardar</Link> */}
                  <button
                    className="btn btn-primary btn-lg" 
                    type="button"
                    onClick={this.handleClick}>Guardar</button>
                </div>
                <div className="col-md-auto"></div>
                <div className="col col-lg-2">
                  <Link to="/consultar-Postulantes" className="btn btn-primary btn-lg"> Salir</Link>
                </div>
              </div>
              <br/><br/>
              <div className="row">
                <div className="col">
                  <TablaEntrevista/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return  {
    postulante: state.postulante,
    cliente: state.cliente,
    cita: state.cita
  }
}

export default connect(mapStateToProps,null)(Entrevista);