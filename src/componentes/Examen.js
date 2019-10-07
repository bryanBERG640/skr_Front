import React from "react";
import IconoExamen from "../Imagenes/examen.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

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

const ColoredLine2 = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 200
        }}
    />
);
const fecha = new Date();
class Examen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div align="center">
                    <td className="lineaEspacioDerecha">
                        <ColoredLine color="black" />
                    </td>
                    <td>
                        <img className="agci" src={IconoExamen} alt="Examen" />
                    </td>
                    <td className="lineaEspacioIzquierda">
                        <ColoredLine color="black" />
                    </td>
                </div>
                <div className="text-center ">
                    <TextField
                        label="Fecha Actual"
                        type="date-local"
                        defaultValue={
                            fecha.getDate() +
                            "/" +
                            (fecha.getMonth() + 1) +
                            "/" +
                            fecha.getFullYear()
                        }
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>
                <div className="center">
                    <form>
                        <div className="form">
                            <div className="marginBotton" align="center">
                                <div className="container">
                                    <div className="row justify-content-md-center">
                                        <h3>
                                            Entrevistador: &nbsp; &nbsp;
                                             <label className="datosCita"> Lic. Amparo Torres</label>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label>Tipo de exámen:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <select className="form-control labelBorder" required name="tipoExamen">
                                                        <option value="1" selected disabled>Figura Humana</option>
                                                        <option value="2">NOVIS</option>
                                                        <option value="3">ZAVIC</option>
                                                        <option value="4">Java</option>
                                                        <option value="5">Testing</option>
                                                        <option value="6">ABI</option>
                                                        <option value="7">ITIL</option>
                                                        <option value="8">NOVIS</option>
                                                        <option value="9">ZAVIC</option>
                                                        <option value="10">Java</option>
                                                        <option value="11">Testing</option>
                                                        <option value="12">ABI</option>
                                                        <option value="13">ITIL</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label>Cliente:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <select className="form-control labelBorder" required name="tipoExamen">
                                                        <option value="1" selected disabled>Figura Humana</option>
                                                        <option value="2">NOVIS</option>
                                                        <option value="3">ZAVIC</option>
                                                        <option value="4">Java</option>
                                                        <option value="5">Testing</option>
                                                        <option value="6">ABI</option>
                                                        <option value="7">ITIL</option>
                                                        <option value="8">NOVIS</option>
                                                        <option value="9">ZAVIC</option>
                                                        <option value="10">Java</option>
                                                        <option value="11">Testing</option>
                                                        <option value="12">ABI</option>
                                                        <option value="13">ITIL</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label>Calificación global:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <input className="form-control labelBorder" type="text"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="row columnTextArea">
                                                <div className="col-sm-12">
                                                    <label>Comentarios:</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <textarea class="textArea form-control" rows="3" cols="40"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center">
                                <form>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-5 left">
                                                <input className=" boton" type="submit" value="Guardar"></input>
                                            </div>
                                            <div className="col-2"></div>
                                            <div className="col-5 center divBoton2">
                                                <Link to="/consultarCita" className="boton2"> Salir</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
                <br />
                <div>
                    <div align="center">
                        <td className="lineaEspacioDerecha2">
                            <ColoredLine2 color="black" />
                        </td>
                        <td>
                            <h2>Sección 1 NOVIS</h2>
                        </td>
                        <td className="lineaEspacioIzquierda2">
                            <ColoredLine2 color="black" />
                        </td>
                    </div>
                </div>
                <br />
                <br />
                <div align="center">
                    <form>
                        <div className="row div">
                            <div className="col-md-3 left">
                                <label className="seccion">Sección:</label>
                                <input className="label" type="text"></input>
                            </div>
                            <div className="col-md-3">
                                <label className="seccion">Puntaje:</label>
                                <input className="label" type="text"></input>
                            </div>
                            <div className="col-md-2.5 right">
                                <label className="seccion">Promedio:</label>
                                <input className="label" type="text"></input>
                            </div>
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-5">
                                        <input className="btn  btn-primary right" type="submit" value="Agregar"></input>
                                    </div>
                                    <div className="col-md-2 left">
                                        <button className="btn  btn-danger left" onClick="#">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Examen;