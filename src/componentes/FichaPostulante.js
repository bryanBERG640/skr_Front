import React from "react";
import Ficha from "./Ficha";
import { Container, Typography } from "@material-ui/core";
import avatar from "../Imagenes/avatar.png";
import Avatar from "react-avatar";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { getPostulanteC } from "../request/request";
import "../App.css";
import {progresBar} from "./progress"

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

class FichaPostulante extends React.Component {
  state = {
    resp: []
  };
  componentDidMount = () => {
    getPostulanteC(2)
      .then(response => {
        let nuevoGet = [];
        console.log(response);
        nuevoGet.push(response);
        this.setState({ resp: nuevoGet });
      })
      .catch(console.log);
  };
  render() {
    progresBar(true);
    console.log(this.state.resp);
    const dato = this.state.resp.map(datos => {
      progresBar(false);
      return (
        <div>
          <Typography style={{ fontSize: "20px" }}>
            <b id="div">Perfil: </b>
            {datos.postulanteb.perfil.descripcion}
          </Typography>
          <Typography style={{ fontSize: "20px" }}>
            {datos.postulanteb.nombre} {datos.postulanteb.apellido1}{" "}
            {datos.postulanteb.apellido2}
          </Typography>
          <Divider />
          <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
            {datos.postulanteb.correo}
          </Typography>
          <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
            <b>Telefono: </b>
            {datos.postulanteb.telefono}
          </Typography>
          <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
            <b>Celular: </b>
            {datos.postulanteb.celular}
          </Typography>
        </div>
      );
    });
    const foto = this.state.resp.map(photo => {
      return <Avatar size="200" src={photo.foto_perfil} round="100px" />;
    });
    return (
      <div>
        <br />
        <div align="center">
          <td>
            <ColoredLine color="black" />
          </td>
          <td>{dato}</td>
          <td>
            <ColoredLine color="black" />
          </td>
        </div>
        <tr>
          <td>
            <Container>
              <tr>
                <Avatar size="200" src={avatar} round="100px" />
              </tr>
              <tr>
                <TextField
                  disabled
                  label="Estatus"
                  value="Aceptado por Kabec" 
                  margin="normal"
                  variant="outlined"
                  style={{ backgroundColor: "#fae0ff" }}
                />
              </tr>
              <tr align="center">
                <Link to="/consultar-Postulantes" className="btn btn-primary">
                  Salir
                </Link>
              </tr>
            </Container>
          </td>
          <td>
            <Container>
              <Ficha />
            </Container>
          </td>
        </tr>
      </div>
    );
  }
}

export default FichaPostulante;
