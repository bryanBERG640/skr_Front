import React, { Component } from 'react';
import { connect } from 'react-redux';//Se utiliza para conectar al store.
import { getPostulanteTodo } from '../../request/request';//Se import la libreria para usar la función que retorna una consulta a la base de datos para obtener postulanteC.
import { progresBar } from '../progress';
import { Typography, Container } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Avatar from 'react-avatar';
import avatar from '../../Imagenes/avatar.png';
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom';
import Ficha from '../Ficha';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            background: color,
            height: 2,
            width: 500
        }}
    />
)

class FiltrosFichaPostulante extends Component {

    state = {
        postulanteC: [],
        isLoading: true,
        postulanteB: this.props.postulante,
    };

    //Se crea una funcón para llamar la función que ejecutra una consulta  a la base de datos.
    componentWillMount = () => {
        this.getPostulanteTodo();
        this.setState({ isLoading: false });
    }
    //Se crea una función para asignar el resultado de la consulta de la función anterior en un estado.
    getPostulanteTodo = async () => {
        const nuevoGet = await getPostulanteTodo();
        this.setState({ postulanteC: nuevoGet.data });
        console.log(this.state.postulanteC)
    };

    render() {
        progresBar(true);
        const { postulanteC } = this.state;
        let existeId = false;
        const groupPC = postulanteC.map(postulante => {
            if (postulante.postulanteb.id_postulante_b === this.state.postulanteB.id_postulante_b) {
                console.log("Valor inicial del state existeId: " + existeId);
                existeId = true;
                console.log("El valor modificado del state existeId: " + existeId);
                return (
                    <div>
                        <Typography style={{ fontSize: "20px" }}>
                            <b id="div">Perfil: </b><br />
                            {postulante.postulanteb.perfil.descripcion}
                        </Typography>
                        <Typography style={{ fontSize: "20px" }}>
                            {postulante.postulanteb.nombre} {postulante.postulanteb.apellido1}{" "}
                            {postulante.postulanteb.apellido2}
                        </Typography>
                        <Divider />
                        <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
                            {postulante.postulanteb.correo}
                        </Typography>
                        <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
                            <b>Telefono: </b>
                            {postulante.postulanteb.telefono}
                        </Typography>
                        <Typography style={{ fontSize: "12px", color: "#a2bd31" }}>
                            <b>Celular: </b>
                            {postulante.postulanteb.celular}
                        </Typography>
                    </div>
                )
            }
        });

        return groupPC;
    }
}

const mapStateToProps = state => {
    return {
        postulante: state.postulante
    };
};

export default connect(
    mapStateToProps, null)(FiltrosFichaPostulante);