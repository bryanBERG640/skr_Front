import React, { Component } from 'react';
import '../styles/Formatos.css';

class TablaEntrevista extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table_hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Tipo de entrevista</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Entrevistador</th>
                                        <th scope="col">Observaciones</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TablaEntrevista;