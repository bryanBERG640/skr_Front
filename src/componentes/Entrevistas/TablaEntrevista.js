import React, { Component } from 'react';
import '../styles/Formatos.css';
import { getEntrevista } from '../../request/request';
import { connect } from 'react-redux';

class TablaEntrevista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cita: this.props.cita,
            entre: [],
            idEntrevista: this.props.id

        }
    }

    componentWillUpdate(previousProps, previousState) {
        console.log(this.props)
            if(previousProps !== this.props) {
                this.getEntrevistas();
                console.log("Actualizando")
            }
    }

    getEntrevistas = async () => {
        const nuevoGet = await getEntrevista();
        this.setState({ entre: nuevoGet.data });
    }

    render() {
        const { cita, entre } = this.state;
        const entrevistas = cita.entrevista.map(cit => {
                return entre.map(entrevistas => {
                    if (cit.id_entrevista === entrevistas.id_entrevista) {
                        return (
                            <tr>
                                <td>{entrevistas.tipoentrevista.descripcion}</td>
                                <td>{entrevistas.entrevistador}</td>
                                <td>{entrevistas.observaciones}</td>
                            </tr>
                        )
                        console.log("Encontrado")
                    }
                })
        })
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table_hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Tipo de entrevista</th>
                                        <th scope="col">Entrevistador</th>
                                        <th scope="col">Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>{entrevistas}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        postulante: state.postulante,
        cita: state.cita
    }
}

export default connect(mapStateToProps, null)(TablaEntrevista);