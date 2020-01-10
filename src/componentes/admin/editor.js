import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import { Grid, Button } from "@material-ui/core";
import ReactDOM from "react-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loading from "../paginas/Loading";
import { connect } from "react-redux";
import { setOpen } from "../../actions/postulanteB";
import { createUser, updateUser } from "../Login/api";
import {
  postUsuario,
  putUsuario,
  getRoles,
  getUsuarios
} from "../../request/request";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import aprobado from "../../Imagenes/palomita_verde.png";
import rechazado from "../../Imagenes/cancelado.png";

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const date = anio + "-" + mes + "-" + dia;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Editor extends React.Component {
  state = {
    rol: this.props.rol,
    Roles: [],
    id: this.props.id,
    nombre: this.props.nombre,
    correo: this.props.correo,
    usuarios: [],
    usuario: this.props.user,
    verificacion1: null,
    verificacion2: null,
    loading: null
  };

  componentWillMount() {
    ValidatorForm.addValidationRule("formatoLetras", string =>
      /^[a-zA-ZñÑ\-_'áéíóúÁÉÍÓÚ -]*$/.test(string)
    );
    ValidatorForm.addValidationRule("Longitud1", string => {
      if (string.length <= 40) return true;
      else return false;
    });
    this.getRoles();
    this.getUsuarios();
  }

  getRoles = async () => {
    const nuevoGet = await getRoles(this.props.auth);
    this.setState({ Roles: nuevoGet.data });
  };

  getUsuarios = async () => {
    const nuevoGet = await getUsuarios(this.props.auth);
    this.setState({ usuarios: nuevoGet.data });
  };

  handleChange = e => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = e => {
    //console.log(e.target.value)
    this.setState({ rol: e.target.value });
  };

  handleClose = () => {
    this.props.dispatchSetOpen(false);
    this.getUsuarios();
  };

  handleSubmit = () => {
    this.setState({

      loading: true
    });

    if (
      this.state.rol !== "" &&
      this.state.nombre !== "" &&
      this.state.correo !== ""
    ) {
      var id_rol;
        var i = 0;
      //console.log("aprobado");
      if (this.state.id !== null) {
        //console.log("update user");
        for (i = 0; i < this.state.Roles.length; i++) {
          if (this.state.Roles[i].descripcion === this.state.rol) {
            id_rol = this.state.Roles[i].id_roles;
          }
        }

        const Request = {
          nombre: this.state.nombre,
          correo: this.state.correo,
          rol: this.state.rol
        };

        const JsonRequest = {
          id_usuario: this.state.usuario.id_usuario,
          usuario: this.state.nombre,
          password: this.state.correo,
          usuario_actualiza: this.props.usuario.displayName,
          fecha_actualizacion: date
        };

        updateUser(this.state.id, Request);
        this.setState({ verificacion1: true });
        //console.log(this.state.usuario.id_usuario);

        putUsuario(
          id_rol,
          JsonRequest,
          this.state.usuario.id_usuario,
          this.props.auth
        )
          .then(response => {
            console.log(response);
            if(response!==undefined)
              this.setState({ verificacion2: true });
            else  this.setState({ verificacion2: false });
          })
          .catch(console.log);
      } else {
        //console.log("create user");
        

        for (i = 0; i < this.state.Roles.length; i++) {
          if (this.state.Roles[i].descripcion === this.state.rol) {
            id_rol = this.state.Roles[i].id_roles;
          }
        }

        const JsonRequest = {
          usuario: this.state.nombre,
          password: this.state.correo,
          usuario_actualiza: this.props.usuario.displayName,
          fecha_actualizacion: date
        };
        // console.log(Request);
        //console.log(JsonRequest);
        // console.log(id_rol);

        createUser(this.state.nombre, this.state.correo, this.state.rol)
          .then(response => {
            console.log(response);
            if(response!==undefined)
            this.setState({ verificacion1: true });
          else  this.setState({ verificacion1: false });
          })
          .catch(console.log);

        postUsuario(id_rol, JsonRequest, this.props.auth)
          .then(response => {
            console.log(response);
            if(response!==undefined)
            this.setState({ verificacion2: true });
          else  this.setState({ verificacion2: false });
          })
          .catch(console.log);
      }
      //this.clock();
    }
  };

  render() {
    var roles=[] 
    var i
    for(i=0; i<this.state.Roles.length; i++)
    {
      if(this.state.Roles[i].descripcion!=="SuperAdmin")
      {
        roles[i]=
          <option
            value={this.state.Roles[i].descripcion}
            key={this.state.Roles[i].id_rol}
            style={{ textAlign: "left" }}
          >
            {this.state.Roles[i].descripcion}
          </option>
      }
    }

    if (
      this.state.verificacion1 !== null &&
      this.state.verificacion2 !== null
    ) {
      if (this.state.loading === true) this.setState({ loading: false });
    }

    var ver
    if(this.state.verificacion1 !== null &&
      this.state.verificacion2 !== null)
      {
        if(this.state.verificacion1 === true &&
          this.state.verificacion2 === true)
            ver=(<img src={aprobado} alt="aprobado"/>)
        else ver=(<img src={rechazado} alt="rechazado"/>)
      }

    const node2 = (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Resultado"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.loading === true
                ? ((<label>Por favor espere</label>),
                  (<Loading />))
                : ""}
              {this.state.verificacion1 !== null &&
                this.state.verificacion2 !== null &&
                this.state.loading===false? (
               ver
              ) : (
                ""
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
              disabled={this.state.loading === true}
            >
              aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );

    if (this.state.loading !== null ||
      this.state.verificacion1 !== null ||
      this.state.verificacion2 !== null) {
      return ReactDOM.createPortal(node2, document.getElementById("load-root"));
    }

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
                    {roles}
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
  open: state.open,
  auth: state.auth,
  usuario: state.usuario
});

const mapDispatchToProps = dispatch => ({
  dispatchSetOpen: value => dispatch(setOpen(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
