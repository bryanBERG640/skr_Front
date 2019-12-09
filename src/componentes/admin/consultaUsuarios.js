import React from "react";
import { watcherUser } from "../Login/watcher";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Icono from "../../Imagenes/admin.png";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Editor from "./editor";
import { setOpen } from "../../actions/postulanteB";
import { deleteUser } from "../Login/api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

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
    open: false
  };

  componentDidMount() {
    watcherUser(usuarios => {
      this.setState({ usuarios });
    });
  }

  handleClick = e => {
    this.setState({ id: e.target.value });
    this.state.usuarios.map(u => {
      if (u.id === e.target.value) {
        this.setState({ nombre: u.nombre, correo: u.correo, rol: u.rol });
      }
    });
  };

  handleOpen = () => {
    this.props.dispatchSetOpen(true);
  };

  handleDelete = e => {
    this.setState({ id: e.target.value });
    deleteUser(this.state.id);

    this.handleClose();
  };

  handleDoubt = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // console.log(this.state.usuarios);
    // console.log(this.state.id);
    const usuarios = this.state.usuarios.map(u => {
      return (
        <StyledTableRow key={u.id}>
          <StyledTableCell align="left">
            <input
              type="radio"
              name="seleccion"
              value={u.id}
              onClick={this.handleClick}
            />
          </StyledTableCell>
          <StyledTableCell align="left">{u.nombre}</StyledTableCell>
          <StyledTableCell align="left">{u.correo}</StyledTableCell>
          <StyledTableCell align="left">{u.rol}</StyledTableCell>
        </StyledTableRow>
      );
    });
    return (
      <React.Fragment>
        <Grid container direction="row" justify="center" alignItems="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>
            <img className="agregarP" src={Icono} alt="admin" />
          </td>
          <td>
            <ColoredLine color="black" />
          </td>
        </Grid>
        <br />
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
                  <StyledTableCell align="lef">Correo</StyledTableCell>
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
  open: state.open
});

const mapDispatchToProps = dispatch => ({
  dispatchSetOpen: value => dispatch(setOpen(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(consultaUsuarios);
