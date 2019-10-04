import React from "react";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 600
        }}
    />
);

class Postulante extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div align="center">
                    <div align="center">
                        <td className="lineaEspacioDerecha">
                            <ColoredLine color="black" />
                        </td>
                        <td>
                            <h1>Postulante</h1>
                        </td>
                        <td className="lineaEspacioIzquierda">
                            <ColoredLine color="black" />
                        </td>
                    </div>
                </div>
                <form className="container" align="center">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Apellido Paterno:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control" type="text"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Apellido Materno:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control" type="text"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Nombre(s):</label>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control" type="text"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm">
                                    <label>Teléfono Fijo:</label>
                                </div>
                                <div className="col-sm">
                                    <input type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm">
                                    <label>Celular:</label>
                                </div>
                                <div className="col-sm">
                                    <input type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm">
                                    <label>Correo electrónico:</label>
                                </div>
                                <div className="col-sm">
                                    <input type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                </form>
            </React.Fragment>
        );
    }
}

export default Postulante;