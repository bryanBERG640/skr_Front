//LIBRERIAS
import React from "react";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Grid } from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";

//RUTAS
import agregar from "../../Imagenes/agregar.png";
import agrP from "../../Imagenes/agregar-postulante.png";

import "../../App.css";
import "../styles/agregar_PB.css";
import "../styles/Formatos.css";
import "../styles/FormatoImagenes.css";

import { getPerfil, postSeccion, getEstatusPostulante, putPostulanteB } from "../../request/request";

import { setPostulante } from "../../actions/postulanteB";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      width: 400
    }}
  />
);

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

const FileMaxSize = 2000000;
const acceptFile = "application/pdf";
const acceptedFileTypesArray = acceptFile.split(",").map(item => {
  return item.trim();
});

class agregar_PB extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      numPages: null,
      pageNumber: 1,
      FileSrc: null,
      respPerf: [],
      respEstatus: [],
      perfil: "",
      estatuspostulante: "",
      postulante: {
        apellido1: "",
        apellido2: "",
        nombre: "",
        correo: "",
        telefono: "",
        celular: "",
        observaciones: "",
        cv: null,
        usuario_actualiza: this.props.usuario.displayName,
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
      /^[a-zA-ZñÑ\-_'áéíóúÁÉÍÓÚ -]*$/.test(string)
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
    //debugger
    if (this.props.postulante !== "vacio") {
      const pos = {
        apellido1: this.props.postulante.apellido1,
        apellido2: this.props.postulante.apellido2,
        nombre: this.props.postulante.nombre,
        correo: this.props.postulante.correo,
        telefono: this.props.postulante.telefono,
        celular: this.props.postulante.celular,
        observaciones: this.props.postulante.observaciones,
        cv: this.props.postulante.cv,
        usuario_actualiza: this.props.usuario.displayName,
        fecha_actualizacion: date
      };
      const per = this.props.postulante.perfil.id_perfil;
      const ep = this.props.postulante.estatuspostulante.id_estatus_postulante;
      this.setState({
        postulante: pos,
        perfil: per,
        estatuspostulante: ep,
        FileSrc: this.props.postulante.cv
      });
    }
  };

  getEstatusPostulante = async () => {
    const nuevoGet = await getEstatusPostulante(this.props.auth);
    this.setState({
      respEstatus: nuevoGet.data
    });
  };

  getPerfil = async () => {
    const nuevoGet = await getPerfil(this.props.auth);
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
    //console.log(this.state);
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
      if (this.props.postulante !== "vacio") {
        const request = {
          id_postulante_b: this.props.postulante.id_postulante_b,
          apellido1: this.state.postulante.apellido1,
          apellido2: this.state.postulante.apellido2,
          nombre: this.state.postulante.nombre,
          correo: this.state.postulante.correo,
          telefono: this.state.postulante.telefono,
          celular: this.state.postulante.celular,
          observaciones: this.state.postulante.observaciones,
          cv: this.state.FileSrc,
          usuario_actualiza: this.props.usuario.displayName,
          fecha_actualizacion: date
        };
        //console.log(this.props.postulante.id_postulante_b)
        putPostulanteB(
          request,
          this.state.estatuspostulante,
          this.state.perfil,
          this.props.postulante.id_postulante_b,
          this.props.auth
        )
          .then(response => {
            console.log(response);
          })
          .catch(console.log);
        this.props.history.push("/consultar-Postulantes");
      } else {
        const request = {
          apellido1: this.state.postulante.apellido1,
          apellido2: this.state.postulante.apellido2,
          nombre: this.state.postulante.nombre,
          correo: this.state.postulante.correo,
          telefono: this.state.postulante.telefono,
          celular: this.state.postulante.celular,
          observaciones: this.state.postulante.observaciones,
          cv: this.state.FileSrc,
          usuario_actualiza: this.props.usuario.displayName,
          fecha_actualizacion: date
        };
        postSeccion(
          request,
          this.state.estatuspostulante,
          this.state.perfil,
          this.props.auth
        )
          .then(response => {
            console.log(response);
          })
          .catch(console.log);
        this.props.history.push("/consultar-Postulantes");
      }
      this.props.dispatchSetPostulante("vacio");
    }
  };

  handleChange = e => {
    const { postulante } = this.state;
    postulante[e.target.name] = e.target.value;
    this.setState({ postulante });
  };

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > FileMaxSize) {
        alert("El archivo no esta permitido, es muy grande");
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("El archivo no esta permitido. Solo PDF");
        return false;
      }
      return true;
    }
  };

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      console.log(rejectedFiles);
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        //this.setState({ file: files[0] });
        const currentFile = files[0];
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            //console.log(reader.result);
            this.setState({
              FileSrc: reader.result
            });
          },
          false
        );

        reader.readAsDataURL(currentFile);
      }
    }
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    //debugger
    this.setState({ numPages });
  };

  render() {
    //console.log(this.state)
    //console.log(this.state.FileSrc);
    const { respPerf, respEstatus } = this.state;
    var i
    var perfiles = []
    var estatus = []

    for (i = 0; i < respPerf.length; i++) {
      perfiles[i] = <option value={respPerf[i].id_perfil} style={{ textAlign: "left" }} key={respPerf[i].id_perfil}>
        {respPerf[i].descripcion}
      </option>
    }

    for (i = 0; i < respEstatus.length; i++) {
      estatus[i] = <option value={respEstatus[i].id_estatus_postulante} style={{ textAlign: "left" }} key={respEstatus[i].id_estatus_postulante}>
        {respEstatus[i].descripcion}
      </option>
    }

    /*const perfiles = respPerf.map(perf => {
      return (
        <option
          value={perf.id_perfil}
          style={{ textAlign: "left" }}
          key={perf.id_perfil}
        >
          {perf.descripcion}
        </option>
      );
    });

    const estatus = respEstatus.map(st => {
      return (
        <option
          value={st.id_estatus_postulante}
          style={{ textAlign: "left" }}
          key={st.id_estatus_postulante}
        >
          {st.descripcion}
        </option>
      );
    });*/

    return (
      <React.Fragment>
        <br />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
          <Grid item>
            <img className="agregarP" src={agrP} alt="agregarP" />
          </Grid>
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
        </Grid>

        <div>
          <h2 className="titulo">Agregar Postulante</h2>
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
              <div style={{ width: 270 }}>
                {this.state.FileSrc !== null ? (
                  <div>
                    <Document
                      file={this.state.FileSrc}
                      onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                      <Page pageNumber={this.state.pageNumber} height={500} />
                    </Document>
                    <p>
                      Pagina {this.state.pageNumber} de {this.state.numPages}
                    </p>
                    <a
                      download={
                        this.state.postulante.nombre +
                        "_" +
                        this.state.postulante.apellido1 +
                        "CV.pdf"
                      }
                      href={this.state.FileSrc}
                    >
                      Descargar CV
                    </a>
                  </div>
                ) : (
                    ""
                  )}
                {this.state.FileSrc === null ? (
                  <div>
                    <img
                      src={agregar}
                      alt="agregar-pdf"
                      style={{ width: 200, height: 200 }}
                    />
                  </div>
                ) : (
                    ""
                  )}
              </div>
              <br />
              <Dropzone
                onDrop={this.handleOnDrop}
                accept={acceptFile}
                multiple={false}
                maxSize={FileMaxSize}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div className="btn btn-secondary" {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!isDragActive && "Click o Arrastra el PDF aqui"}
                      {isDragActive && "Suelta el archivo aqui"}
                    </div>
                  );
                }}
              </Dropzone>

              <br />
              <br />
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  postulante: state.postulante,
  usuario: state.usuario,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatchSetPostulante: value => dispatch(setPostulante(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(agregar_PB);
