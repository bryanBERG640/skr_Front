//LIBRERIAS
import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

//RUTAS
import { postSecciones, getTipoExamen, getExamenes, getSecciones, deleteSeccion, 
  putSeccion } from "../../../request/request";
import TablaSecciones from "./tabla_secciones";
import { setSeccion, changeValor } from "../../../actions/postulanteB";

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

class Seccion extends React.Component {
  state = {
    seccion: {
      no_seccion: "",
      puntaje: "",
      calificacion: "",
      usuario_actualiza: this.props.usuario.displayName,
      fecha_actualizacion: date
    },
    respTipoExamen: [],
    respExamen: [],
    respSecciones: []
  };

  componentDidUpdate (pP, pS) {
    if(pS===this.state)
    {
      this.getTipoExamen();
      this.getExamenes();
      this.getSecciones();
      ValidatorForm.addValidationRule("formatoNumeros", string =>
      /^[0-9 .,-]*$/.test(string)
      );
      ValidatorForm.addValidationRule("Enteros", string =>
      /^[0-9]*$/.test(string)
      );
      if(this.props.seleccion!=="vacio")
      {
      const secc = {
        id_seccion:this.props.seccion.id_seccion,
        no_seccion: this.props.seccion.no_seccion,
        puntaje: this.props.seccion.puntaje,
        calificacion: this.props.seccion.calificacion,
        usuario_actualiza: this.props.usuario.displayName,
        fecha_actualizacion: date
      };
      this.setState({seccion:secc})
      }
    }
    if(pP!==this.props)
    {
      if(this.props.seleccion!=="vacio")
      {
        const secc = {
        id_seccion:this.props.seccion.id_seccion,
        no_seccion: this.props.seccion.no_seccion,
        puntaje: this.props.seccion.puntaje,
        calificacion: this.props.seccion.calificacion,
        usuario_actualiza: this.props.usuario.displayName,
        fecha_actualizacion: date
        };
        this.setState({seccion:secc})
      }
      else
      {
        const sec = {
          no_seccion: "",
          puntaje: "",
          calificacion: "",
          usuario_actualiza: this.props.usuario.displayName,
          fecha_actualizacion: date
        };
        this.setState({ seccion: sec });
      }
    }
  };

  getTipoExamen = async () => {
    const nuevoGet = await getTipoExamen(this.props.auth);
    this.setState({ respTipoExamen: nuevoGet.data });
  };

  getExamenes = async () => {
    const nuevoGet = await getExamenes(this.props.auth);
    this.setState({ respExamen: nuevoGet.data });
  };

  getSecciones = async () => {
    const nuevoGet = await getSecciones(this.props.auth);
    this.setState({ respSecciones: nuevoGet.data });
  };

  handleChange = e => {
    let seccion = this.state.seccion;
    seccion[e.target.name] = e.target.value;
    this.setState({ seccion });
  };

  handleClick = e => {
    if (
      this.state.seccion.no_seccion !== null &&
      this.state.seccion.puntaje !== null &&
      this.state.seccion.calificacion !== null
    ) {
      console.log("aprobado");
      const ns = parseInt(this.state.seccion.no_seccion);
      const p = parseFloat(this.state.seccion.puntaje);
      const c = parseFloat(this.state.seccion.calificacion);

      //console.log(this.state.seccion);

      if(this.props.seleccion!=="vacio")
      {
        console.log("Put")
        const secc = {
          id_seccion:this.props.seccion.id_seccion,
          no_seccion: ns,
          puntaje: p,
          calificacion: c,
          usuario_actualiza: this.props.usuario.displayName,
          fecha_actualizacion: date
        };
        this.setState({ seccion: secc });
        putSeccion(this.state.seccion,
          this.props.examen.id_examen,
          this.props.seccion.id_seccion, this.props.auth)
          .then(response => {
            console.log(response);
            this.props.dispatchSetSeccion(response);
            this.props.dispatchSeleccion("vacio")
          })
          .catch(console.log);
      }
      else
      {
        console.log("Post");
      const secc = {
        no_seccion: ns,
        puntaje: p,
        calificacion: c,
        usuario_actualiza: this.props.usuario.displayName,
        fecha_actualizacion: date
      };

      this.setState({ seccion: secc });
      postSecciones(this.state.seccion, this.props.examen.id_examen, this.props.auth)
        .then(response => {
          console.log(response);
          this.props.dispatchSetSeccion(response);
          this.props.dispatchSeleccion("vacio")
        })
        .catch(console.log);
      }

      const sec = {
        no_seccion: "",
        puntaje: "",
        calificacion: "",
        usuario_actualiza: this.props.usuario.displayName,
        fecha_actualizacion: date
      };
      this.setState({ seccion: sec });
      //console.log(this.state.seccion);
    }
  };

  handleDelete = e => {
    deleteSeccion(this.props.seccion.id_seccion, this.props.auth)
      .then(response => {
        console.log(response);
        this.props.dispatchSetSeccion("vacio");
      })
      .catch(console.log);

      const sec = {
        no_seccion: "",
        puntaje: "",
        calificacion: "",
        usuario_actualiza: this.props.usuario.displayName,
        fecha_actualizacion: date
      };
      this.setState({ seccion: sec });
  };

  render() {
    const exa = this.props.examen;
    // console.log("render");
    // console.log(this.state.seccion);

    if (this.props.examen !== "vacio") {
      return (
        <React.Fragment>
          <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <ColoredLine color="blue" />
          </Grid>
          <Grid item>
            <h2>Secciónes</h2>
          </Grid>
          <Grid item>
            <ColoredLine color="blue" />
          </Grid>
        </Grid>

          <ValidatorForm
            onSubmit={this.handleClick}
            ref="form"
            onError={errors => console.log(errors)}
          >
            <div align="center">
              <h3>
                {exa.tipoexamen.examen_tipo}&nbsp; &nbsp;
                <label className="datosCita">
                  {exa.tipoexamen.descripcion}
                </label>
              </h3>
            </div>

            <div className="row div">
              <div className="col-md-3">
                <TextValidator
                  autoComplete="off"
                  label="No. Seccion"
                  name="no_seccion"
                  onChange={this.handleChange}
                  value={this.state.seccion.no_seccion}
                  validators={["required", "Enteros"]}
                  errorMessages={[
                    "Campo Obligatorio",
                    "Ingrese Solo Numeros enteros"
                  ]}
                />
              </div>
              <div className="col-md-3">
                <TextValidator
                  autoComplete="off"
                  label="Puntaje"
                  name="puntaje"
                  onChange={this.handleChange}
                  value={this.state.seccion.puntaje}
                  validators={["required", "formatoNumeros"]}
                  errorMessages={["Campo Obligatorio", "Ingrese Solo Numeros"]}
                />
              </div>
              <div className="col-md-2.5 right">
                <TextValidator
                  autoComplete="off"
                  label="Calificacion"
                  name="calificacion"
                  onChange={this.handleChange}
                  value={this.state.seccion.calificacion}
                  validators={["required", "formatoNumeros"]}
                  errorMessages={["Campo Obligatorio", "Ingrese Solo Numeros"]}
                />
              </div>
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-5">
                    <button className="btn  btn-primary right" type="submit">
                      Agregar/Editar
                    </button>
                  </div>
                  <div className="col-md-2 left">
                    <button
                      type="button"
                      className="btn  btn-danger left"
                      onClick={this.handleDelete}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <TablaSecciones />
          </ValidatorForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <br/>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <ColoredLine color="blue" />
          </Grid>
          <Grid item>
            <h2>Secciónes</h2>
          </Grid>
          <Grid item>
            <ColoredLine color="blue" />
          </Grid>
        </Grid>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cita: state.cita,
    examen: state.examen,
    seccion: state.seccion,
    seleccion: state.seleccion,
    usuario: state.usuario,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSetSeccion: value => dispatch(setSeccion(value)),
  dispatchSeleccion: value=>dispatch(changeValor(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(Seccion);
