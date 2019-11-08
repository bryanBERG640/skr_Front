import React from "react";
import IconoEntrevista from '../../Imagenes/entrevista.png';
import TextField from "@material-ui/core/TextField";
import { getTipoEntrevista, getCliente, postEntrevista } from '../../request/request';
import { Link } from "react-router-dom";
import TablaEntrevista from './TablaEntrevista';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import { setEntrevista } from "../../actions/postulanteB";
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';

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
  constructor() {
    super();
    this.state = {
      tipoEntrevistas: [],
      tipoEntrevista: '',
      clientes: [],
      idEntrevista: number,
      idCita: number,
      idTipoEntrevista: number,
      comentarios: '',
      entrevistador: '',
      respuesta: [],
      aux: null
    };
  }

  componentDidMount() {
    console.log("Dentro de didMount: ")
    this.getTipoEntrevistas();
    this.getClientes();
    this.setState({ idEntrevista: 0 })
    ValidatorForm.addValidationRule("isValidName", (string) => /[a-zA-Z \u00E0-\u00FC]{1,20}/g.test(string));
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
    
    this.setState({
      idTipoEntrevista: e.target.value,
      tipoEntrevista: e.target.value
    })
    console.log("Valor-----" + e.target.value)
  }

  handleClick = e => {
    
    const request = {
      observaciones: this.state.comentarios,
      entrevistador: this.state.entrevistador,
      usuario_actualiza: "Bryan Ramirez",
      fecha_actualizacion: "2019-10-28"
    }
    const idTipoEntrevista = this.state.idTipoEntrevista;
    const idCita = this.props.cita.id_cita;

    let res = postEntrevista(request, idTipoEntrevista, idCita).then(response => {
      this.props.dispatchSetEntrevista(response);
    })
    this.setState({ respuesta: res })

    this.setState({ idEntrevista: this.state.idEntrevista + 1 })

    this.setState({
      comentarios: '',
      entrevistador: '',
      aux: this.state.aux+1,
      tipoEntrevista: null,
      idTipoEntrevista: null
    })

  }

  handleWrite = e => {

    console.log("Valor de entrevistador:" + e.target.value)
    this.setState({ [e.target.name]: e.target.value })
    console.log("Valor de nombre:" + e.target.name)
    console.log("Valor del state entrevistador:" + this.state.entrevistador)
  }

  render() {
    const { tipoEntrevistas } = this.state;
    console.log("Valor de tipo de entrevista--" + this.state.tipoEntrevista)
    console.log("Valor de id tipo de entrevista--" + this.state.idTipoEntrevista)
    const entrevista = tipoEntrevistas.map(entr => {
      return <option value={entr.id_tipo_entrevista}>{entr.descripcion}</option>
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
              Cliente: &nbsp; &nbsp;
            <label className="datosCita">
                {this.props.cita.cliente.descripcion}
              </label>
            </h3>
          </div>
          <br /><br />

          <div className="container">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleClick}
              onError={errors => console.log(errors)}
            >
              <div className="row" align="center">
                <div className="col-sm-6">
                  <div className="col">
                    <SelectValidator
                      style={{ width: 340 }}
                      className="form-control"
                      label="Tipo entrevista"
                      name="tipoEntrevista"
                      value={this.state.tipoEntrevista}
                      onChange={this.handleSelect}
                      validators={["required"]}
                      errorMessages={["Campo obligatorio"]}
                    >
                      <option value="1" >Tipo entrevista:</option>
                      {entrevista}
                    </SelectValidator>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="col">
                    <TextValidator
                      className="form-control"
                      label="Entrevistador"
                      id="Entrevistador"
                      onChange={this.handleWrite}
                      name="entrevistador"
                      value={this.state.entrevistador}
                      validators={["required", "isValidName"]}
                      errorMessages={['El campo es requrido', 'Formato invalido']}
                    />
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
                    value={this.state.comentarios}
                    placeholder="Agrega comentarios">
                  </textarea>
                </div>
                <div className="col"></div>
              </div>
              <br /><br />
              <div className="row justify-content-md-center">
                <div className="col col-lg-2">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                  >Guardar</button>
                </div>
                <div className="col-md-auto"></div>
                <div className="col col-lg-2">
                  <Link to="/consultarCita" className="btn btn-primary btn-lg"> Salir</Link>
                </div>
              </div>
              <br /><br />
              <div className="row">
                <div className="col">
                  <TablaEntrevista id={this.state.idEntrevista} respuesta={this.state.respuesta} />
                </div>
              </div>
            </ValidatorForm>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    postulante: state.postulante,
    cliente: state.cliente,
    cita: state.cita
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetEntrevista: value => dispatch(setEntrevista(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Entrevista);