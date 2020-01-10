import React from "react";
import { watcherUser } from "../Login/watcher";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Icono from "../../Imagenes/admin.png";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Editor from "./editor";
import { setOpen } from "../../actions/postulanteB";
import { deleteUser } from "../Login/api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { getUsuarios, deleteUsuario } from "../../request/request";

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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class consultaUsuarios extends React.Component {
  state = {
    usuarios: [],
    id: null,
    nombre: "",
    correo: "",
    rol: "",
    click: null,
    open: false,
    usuariosMs: [],
    usuario: []
  };

  componentDidMount() {
    watcherUser(usuarios => {
      this.setState({ usuarios });
    });
    this.getUsuarios();
  }

  getUsuarios = async () => {
    const nuevoGet = await getUsuarios(this.props.auth);
    this.setState({ usuariosMs: nuevoGet.data });
  };

  handleClick = e => {
    this.setState({ id: e.target.value });
    this.state.usuarios.map(u => {
      if (u.id === e.target.value) {
        this.setState({ nombre: u.nombre, correo: u.correo, rol: u.rol });
      }
      return u;
    });
    this.getUsuarios();
    this.setState({ usuario: [] });
    //this.Usuarios();
  };

  handleOpen = () => {
    this.props.dispatchSetOpen(true);
  };

  handleDelete = e => {
    this.setState({ id: e.target.value });
    deleteUser(this.state.id);

    deleteUsuario(this.state.usuario.id_usuario, this.props.auth)
      .then(response => {
        console.log(response);
      })
      .catch(console.log);

    this.handleClose();
  };

  handleDoubt = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });

    this.setState({ usuario: [] });
    this.setState({ nombre: "", correo: "", rol: "", id: null });

    this.getUsuarios();
  };

  render() {
    //console.log(this.state.usuariosMs);
    // console.log(this.state.id);
    //console.log(this.state.usuario);
    var i = 0;
    var usuarios = [];

    if (this.state.nombre !== "") {
      if (this.state.usuario.length === 0) {
        //console.log("for");
        for (i = 0; i < this.state.usuariosMs.length; i++) {
          // console.log(this.state.usuariosMs[i].usuario);
          // console.log(this.state.nombre);
          if (this.state.usuariosMs[i].usuario === this.state.nombre) {
            this.setState({ usuario: this.state.usuariosMs[i] });
          }
        }
      }
    }

    for (i = 0; i < this.state.usuarios.length; i++) {
      if (
        this.state.usuarios[i].rol !== "SuperAdmin" &&
        this.state.usuarios[i].correo !== this.props.usuario.email
      ) {
        usuarios[i] = (
          <StyledTableRow key={this.state.usuarios[i].id}>
            <StyledTableCell align="left">
              <input
                type="radio"
                name="seleccion"
                value={this.state.usuarios[i].id}
                onClick={this.handleClick}
              />
            </StyledTableCell>
            <StyledTableCell align="left">
              {this.state.usuarios[i].nombre}
            </StyledTableCell>
            <StyledTableCell align="left">
              {this.state.usuarios[i].correo}
            </StyledTableCell>
            <StyledTableCell align="left">
              {this.state.usuarios[i].rol}
            </StyledTableCell>
          </StyledTableRow>
        );
      }
    }

    // const usuarios = this.state.usuarios.map(u => {
    //   if (u.rol !== "SuperAdmin" && u.correo !== this.props.usuario.email) {
    //     return (
    //       <StyledTableRow key={u.id}>
    //         <StyledTableCell align="left">
    //           <input
    //             type="radio"
    //             name="seleccion"
    //             value={u.id}
    //             onClick={this.handleClick}
    //           />
    //         </StyledTableCell>
    //         <StyledTableCell align="left">{u.nombre}</StyledTableCell>
    //         <StyledTableCell align="left">{u.correo}</StyledTableCell>
    //         <StyledTableCell align="left">{u.rol}</StyledTableCell>
    //       </StyledTableRow>
    //     );
    //   }
    // });

    return (
      <React.Fragment>
        <br/>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
          <Grid item>
            <img className="agregarP" src={Icono} alt="admin" />
          </Grid>
          <Grid item>
            <ColoredLine color="black" />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container direction="row" justify="center" alignItems="center">
          <div className="col-sm-6">
            <textarea
              className="form-control"
              rows="3"
              disabled={true}
              style={{ color: "black", background: "#FFE857" }}
              value={this.value}
            >
              Estimado Admin, en caso de que el usuario registrado no pueda
              acceder, verifique que su correo sea correcto y/o no haya recibido
              un "rechazado" (icono de cruz roja) al haberlo registrado, en caso
              de ser asi, por favor elimine el usuario que agrego e intentelo de
              nuevo.
            </textarea>
          </div>
        </Grid>

        <br />
        <Grid container direction="row" justify="center" alignItems="center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleOpen}
          >
            Agregar/Editar usuario
          </button>
          &nbsp; &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleDoubt}
            disabled={!this.state.id}
          >
            Eliminar
          </button>
        </Grid>
        <br />
        <br />
        <Grid container direction="row" justify="center" alignItems="center">
          <Paper style={{ width: 800, overflowX: "auto" }}>
            <Table style={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Seleccion</StyledTableCell>
                  <StyledTableCell align="left">Nombre</StyledTableCell>
                  <StyledTableCell align="left">Correo</StyledTableCell>
                  <StyledTableCell align="left">Rol</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{usuarios}</TableBody>
            </Table>
          </Paper>
        </Grid>
        <br />
        <br />
        {this.props.open === true ? (
          <Editor
            id={this.state.id}
            nombre={this.state.nombre}
            correo={this.state.correo}
            rol={this.state.rol}
            user={this.state.usuario}
            onClose={() => this.setState({ id: null })}
          />
        ) : (
          ""
        )}

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Eliminar a: " + this.state.nombre}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Estas seguro de Eliminar a este usuario?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              Eliminar
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(consultaUsuarios);
