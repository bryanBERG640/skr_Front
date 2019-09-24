import React from 'react'
import Navbar from './NavBar'
import Ficha from './Ficha';
import { Container, Typography } from '@material-ui/core';
import avatar from '../Imagenes/avatar.png';
import Avatar from 'react-avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width:500
        }}
    />
);

class FichaPostulante extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <br />
        <div align="center">
            <td><ColoredLine color="black" /></td>
            <td>
                <Typography style={{ "fontSize": "20px" }}>Perfil: Desarrollador</Typography>
                <Typography style={{ "fontSize": "20px" }}>Salomon Angeles Guzman</Typography>
                <Divider/>
                <Typography style={{ "fontSize": "12px", "color": "#a2bd31" }}>Prueba@kabec.com</Typography>
                <Typography style={{ "fontSize": "12px", "color": "#a2bd31" }}>Telefono: 55123456</Typography><Typography style={{ "fontSize": "12px", "color": "#a2bd31" }}>Celular: 5512345678</Typography>
            </td>
            <td><ColoredLine color="black" /></td>
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
                  style={{ "backgroundColor": "#fae0ff" }}
                />
              </tr>
              <tr align="center">
                <Button variant="contained" style={{ "background": "#048ABC" }}>
                  Salir
                </Button>
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
    )
  }
}

export default FichaPostulante;