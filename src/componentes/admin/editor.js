import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import { Grid } from "@material-ui/core";
import ReactDOM from "react-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { setOpen } from "../../actions/postulanteB";
import { createUser, updateUser } from "../Login/api";

class Editor extends React.Component {
  state = {
    rol: this.props.rol,
    Roles: [],
    id: this.props.id,
    nombre: this.props.nombre,
    correo: this.props.correo
  };

  componentWillMount() {
    ValidatorForm.addValidationRule("formatoLetras", string =>
      /^[a-zA-ZñÑ\-_'áéíóúÁÉÍÓÚ -]*$/.test(string)
    );
    ValidatorForm.addValidationRule("Longitud1", string => {
      if (string.length <= 40) return true;
      else return false;
    });
  }

  handleChange = e => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = e => {
    this.setState({ rol: e.target.value });
  };

  handleClose = () => {
    this.props.dispatchSetOpen(false);
  };

  handleSubmit = () => {
    if (
      this.state.rol !== "" &&
      this.state.nombre !== "" &&
      this.state.correo !== ""
    ) {
      console.log("aprobado");
      if (this.state.id !== null) {
        const Request = {
          id: this.state.id,
          nombre: this.state.nombre,
          correo: this.state.correo,
          rol: this.state.rol
        };

        updateUser(this.state.id, Request);
      } else {
        const Request = {
          nombre: this.state.nombre,
          correo: this.state.correo,
          rol: this.state.rol
        };

        createUser(Request);
      }
      this.props.dispatchSetOpen(false);
    }
  };

  render() {
    // console.log(this.state);
    // const roles=this.state.Roles.map(r=>{
    //     <option value={r.id_rol} key={r.id_rol} style={{ textAlign: "left" }}>
    //         {r.descripcion}
    //     </option>
    // })

    const node = (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Editar/Agregar usuario"}
          </DialogTitle>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <DialogContent>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <TextValidator
                    style={{ width: 340 }}
                    label="Nombre"
                    onChange={this.handleChange}
                    name="nombre"
                    value={this.state.nombre}
                    validators={["required", "formatoLetras", "Longitud1"]}
                    errorMessages={[
                      "Campo Obligatorio",
                      "Ingrese solo Letras",
                      "Solo se permiten 40 caracteres"
                    ]}
                  />
                </Grid>
                <br />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <TextValidator
                    style={{ width: 340 }}
                    label="Correo"
                    onChange={this.handleChange}
                    name="correo"
                    value={this.state.correo}
                    validators={["required", "isEmail"]}
                    errorMessages={["Campo Obligatorio", "Formato incorrecto"]}
                  />
                </Grid>
                <br />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <SelectValidator
                    className="seleccion"
                    style={{ width: 340 }}
                    text-align="left"
                    label="Rol"
                    value={this.state.rol}
                    onChange={this.handleSelect}
                    name="rol"
                    validators={["required"]}
                    errorMessages={["Campo Obligatorio"]}
                  >
                    <option value={""} key={100}>
                      selecciona uno
                    </option>
                    <option value={"prueba"} key={101}>
                      prueba
                    </option>
                    {/* {roles} */}
                  </SelectValidator>
                </Grid>
                <br />
              </Grid>
            </DialogContent>

            <DialogActions>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <button
                    type="submit"
                    // onClick={this.handleSubmit}
                    className="btn btn-primary"
                  >
                    Guardar
                  </button>
                </Grid>
                <Grid item xs={3}>
                  <button
                    type="button"
                    onClick={this.handleClose}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                </Grid>
              </Grid>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </React.Fragment>
    );

    return ReactDOM.createPortal(node, document.getElementById("modal-root"));
  }
}

const mapStateToProps = state => ({
  open: state.open
});

const mapDispatchToProps = dispatch => ({
  dispatchSetOpen: value => dispatch(setOpen(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
