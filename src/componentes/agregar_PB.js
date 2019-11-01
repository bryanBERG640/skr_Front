import React from "react";
import "../App.css";
import "./styles/agregar_PB.css";
import "./styles/Formatos.css";
import "./styles/FormatoImagenes.css";
import agregar from "../Imagenes/agregar.png";
import {
  getPerfil,
  postSeccion,
  getEstatusPostulante,
  putPostulanteB
} from "../request/request";
import agrP from "../Imagenes/agregar-postulante.png";
import { Link } from "react-router-dom";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import { connect } from "react-redux";

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
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

class agregar_PB extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      respPerf: [],
      respEstatus: [],
      perfil: null,
      estatuspostulante: null,
      postulante: {
        apellido1: "",
        apellido2: "",
        nombre: "",
        correo: "",
        telefono: "",
        celular: "",
        observaciones: null,
        usuario_actualiza: "Bryan Ramirez",
        fecha_actualizacion: date
      }
    };
  }

  onChange(e) {
    console.log(this.state);
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
    this.getEstatusPostulante();
    this.getPerfil();
    this.setState({ isLoading: false });
    ValidatorForm.addValidationRule("formatoLetras", string =>
      /^[a-zA-Z\-_'áéíóúÁÉÍÓÚ -]*$/.test(string)
    );
    ValidatorForm.addValidationRule("formatoNumeros", string =>
      /^[0-9 -]*$/.test(string)
    );
    ValidatorForm.addValidationRule("Longitud1", string => {
      if (string.length <= 40) return true;
      else return false;
    });
    ValidatorForm.addValidationRule("Longitud2", string => {
      if (string.length === 10) return true;
    });
    if (this.props.postulante !== "Vacio") {
      const pos = {
        apellido1: this.props.postulante.apellido1,
        apellido2: this.props.postulante.apellido2,
        nombre: this.props.postulante.nombre,
        correo: this.props.postulante.correo,
        telefono: this.props.postulante.telefono,
        celular: this.props.postulante.celular,
        observaciones: this.props.postulante.observaciones,
        usuario_actualiza: "Bryan Ramirez",
        fecha_actualizacion: date
      };
      const per = this.props.postulante.perfil.id_perfil;
      const ep = this.props.postulante.estatuspostulante.id_estatus_postulante;
      this.setState({ postulante: pos });
      this.setState({ perfil: per });
      this.setState({ estatuspostulante: ep });
    }
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

  handleSelect1 = e => {
    this.setState({ perfil: e.target.value });
    this.setState({ value: 0 });
  };

  handleSelect2 = e => {
    this.setState({ estatuspostulante: e.target.value });
  };

  handleSubmit = e => {
    console.log("submit");
    console.log(this.state);
    if (
      this.state.perfil !== "" &&
      this.state.estatuspostulante !== "" &&
      this.state.postulante.apellido1 !== "" &&
      this.state.postulante.apellido2 !== "" &&
      this.state.postulante.nombre !== "" &&
      this.state.postulante.correo !== "" &&
      this.state.postulante.telefono !== "" &&
      this.state.postulante.celular !== ""
    ) {
      console.log("aprobado");
      if (this.props.postulante !== "Vacio") {
        const request = {
          id_postulante_b: this.props.postulante.id_postulante_b,
          apellido1: this.state.postulante.apellido1,
          apellido2: this.state.postulante.apellido2,
          nombre: this.state.postulante.nombre,
          correo: this.state.postulante.correo,
          telefono: this.state.postulante.telefono,
          celular: this.state.postulante.celular,
          observaciones: this.state.postulante.observaciones,
          usuario_actualiza: "Bryan Ramirez",
          fecha_actualizacion: date
        };
        //console.log(this.props.postulante.id_postulante_b)
        putPostulanteB(
          request,
          this.state.estatuspostulante,
          this.state.perfil,
          this.props.postulante.id_postulante_b
        )
          .then(response => {
            console.log(response);
          })
          .catch(console.log);
        this.props.history.push("/consultar-Postulantes");
      } else {
        postSeccion(
          this.state.postulante,
          this.state.estatuspostulante,
          this.state.perfil
        )
          .then(response => {
            console.log(response);
          })
          .catch(console.log);
        this.props.history.push("/consultar-Postulantes");
      }
    }
  };

  handleChange = e => {
    const { postulante } = this.state;
    postulante[e.target.name] = e.target.value;
    this.setState({ postulante });
  };

  render() {
    const { respPerf, respEstatus } = this.state;
    const perfiles = respPerf.map(perf => {
      return (
        <option value={perf.id_perfil} style={{ textAlign: "left" }}>
          {perf.descripcion}
        </option>
      );
    });

    const estatus = respEstatus.map(st => {
      return (
        <option value={st.id_estatus_postulante} style={{ textAlign: "left" }}>
          {st.descripcion}
        </option>
      );
    });
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
        <div className="row" style={{ width: 1200 }}>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <div
              className="column"
              align="right"
              style={{ marginLeft: 300, marginRight: 35 }}
            >
              <div className="form-group">
                <SelectValidator
                  className="seleccion"
                  style={{ width: 340 }}
                  text-align="left"
                  label="Perfil"
                  value={this.state.perfil}
                  onChange={this.handleSelect1}
                  name="perfil"
                  validators={["required"]}
                  errorMessages={["Campo Obligatorio"]}
                >
                  {perfiles}
                </SelectValidator>
              </div>
              <TextValidator
                style={{ width: 340 }}
                label="Nombre"
                onChange={this.handleChange}
                name="nombre"
                value={this.state.postulante.nombre}
                validators={["required", "formatoLetras", "Longitud1"]}
                errorMessages={[
                  "Campo Obligatorio",
                  "Ingrese solo Letras",
                  "Solo se permiten 40 caracteres"
                ]}
              />
              <br />
              <br />
              <TextValidator
                style={{ width: 340 }}
                label="Apellido Paterno"
                onChange={this.handleChange}
                name="apellido1"
                value={this.state.postulante.apellido1}
                validators={["required", "formatoLetras", "Longitud1"]}
                errorMessages={[
                  "Campo Obligatorio",
                  "Ingrese solo Letras",
                  "Solo se permiten 40 caracteres"
                ]}
              />
              <br />
              <br />
              <TextValidator
                style={{ width: 340 }}
                label="Apellido Materno"
                onChange={this.handleChange}
                name="apellido2"
                value={this.state.postulante.apellido2}
                validators={["formatoLetras", "Longitud1", "required"]}
                errorMessages={[
                  "Ingrese solo Letras",
                  "Solo se permiten 40 caracteres",
                  "Campo Obligatorio"
                ]}
              />
              <br />
              <br />
              <TextValidator
                style={{ width: 340 }}
                label="Correo(s) Electronico(s)"
                onChange={this.handleChange}
                name="correo"
                value={this.state.postulante.correo}
                validators={["required"]}
                errorMessages={["Campo Obligatorio"]}
              />
              <br />
              <br />
              <TextValidator
                style={{ width: 340 }}
                label="Telefono"
                onChange={this.handleChange}
                name="telefono"
                value={this.state.postulante.telefono}
                validators={["required", "formatoNumeros", "Longitud2"]}
                errorMessages={[
                  "Campo Obligatorio",
                  "Ingrese solo Numeros",
                  "Deben ser 10 digitos"
                ]}
              />
              <br />
              <br />
              <TextValidator
                style={{ width: 340 }}
                label="Celular"
                onChange={this.handleChange}
                name="celular"
                value={this.state.postulante.celular}
                validators={["required", "formatoNumeros", "Longitud2"]}
                errorMessages={[
                  "Campo Obligatorio",
                  "Ingrese solo Numeros",
                  "Deben ser 10 digitos"
                ]}
              />
              <br />
              <br />
              <div className="form-group">
                <SelectValidator
                  className="seleccion"
                  style={{ width: 340 }}
                  label="Estatus Postulante"
                  name="estatuspostulante"
                  value={this.state.estatuspostulante}
                  onChange={this.handleSelect2}
                  validators={["required"]}
                  errorMessages={["Campo Obligatorio"]}
                >
                  {estatus}
                </SelectValidator>
              </div>
              <br />
              <label align="left">
                Observaciones:
                <textarea
                  style={{ height: 120, marginBottom: 30 }}
                  className="textArea form-control"
                  label="Observaciones"
                  value={this.state.postulante.observaciones}
                  onChange={this.onChange.bind(this)}
                  name="observaciones"
                  id="observaciones"
                  rows="4"
                  cols="50"
                />
              </label>
            </div>

            <div className="column" align="right">
              <input type="image" className="agregar" src={agregar} />
              <h4> Guardar CV en formato PDF </h4>
              <br />

              {/* <a
              href="/consultar-Postulantes"
              className="btn btn-primary"
              onClick={this.handleClick}
              nombre={this.state.nombre}
            >
              Guardar
            </a> */}

              <button type="submit" className="btn btn-primary">
                Guardar
              </button>

              <br />
              <br />
              <Link to="/consultar-Postulantes" className="btn btn-primary">
                Salir
              </Link>
            </div>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postulante: state.postulante
});

export default connect(
  mapStateToProps,
  null
)(agregar_PB);
