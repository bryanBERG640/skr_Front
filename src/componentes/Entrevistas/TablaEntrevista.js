import React, { Component } from 'react';
import '../styles/Formatos.css';
import { getEntrevista } from '../../request/request';
import { connect } from 'react-redux';

class TablaEntrevista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postulanteB: this.props.postulante.cita,
            entre: []
        }
    }

    componentWillMount() {
            this.getEntrevistas();
        
    }

    getEntrevistas = async () => {
        const nuevoGet = await getEntrevista();
        this.setState({ entre: nuevoGet.data });
    }

    render() {
        const { postulanteB, entre } = this.state;
        const entrevistas = postulanteB.map(cit => {
            return cit.entrevista.map(entr => {
                return entre.map(e => {
                    if (entr.id_entrevista === e.id_entrevista) {
                        return (
                            <tr>
                                <td>{e.tipoentrevista.descripcion}</td>
                                <td>{e.entrevistador}</td>
                                <td>{e.observaciones}</td>
                            </tr>
                        )
                    }
                })
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
        postulante: state.postulante
    }
}

export default connect(mapStateToProps, null)(TablaEntrevista);