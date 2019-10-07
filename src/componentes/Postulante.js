import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconoExamen from "../Imagenes/avatar.png";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 600,
            marginBottom: 10
        }}
    />
);

const ColoredLine2 = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 600,
            marginBottom: 10
        }}
    />
);

const divStyle = {
    overflowY: 'scroll',
    border: '1px solid red',
    width: '500px',
    float: 'left',
    height: '500px',
    position: 'relative'
};

class Postulante extends React.Component {

    handleChangeDate = e => {
        console.log(e.target.value);
        this.setState({ fecha: e.target.value });
    };

    render() {
        return (
            <React.Fragment className="cuerpo">
                 <br/>
                <div align="center">
                    <div align="center">
                        <td className="lineaEspacioDerecha">
                            <ColoredLine color="black" />
                        </td>
                        <td>
                            <h2>Postulante</h2>
                        </td>
                        <td className="lineaEspacioIzquierda">
                            <ColoredLine color="black" />
                        </td>
                    </div>
                </div>
                <br/><br/>
                <form align="center">
                    <div className="row">
                        <div className="col-sm-10">
                            <div className="container">
                                <div className="row" align="center">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label className="">Apellido Paterno:</label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control" type="text"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label class="">Apellido Materno:</label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control" type="text"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <label className="">Nombre(s):</label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control" type="text"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
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
                                            <div className="col-sm-2">
                                                <label>Email:</label>
                                            </div>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sml-4">
                                        <div className="row">
                                            <div className="col">
                                                <label>Estatus Postulante:</label>
                                            </div>
                                            <div className="col">
                                                <select className="form-control" required name="tipoExamen">
                                                    <option value="1" selected disabled>Estatus</option>
                                                    <option value="2">Aceptado por cliente</option>
                                                    <option value="3">Aceptado por Kabec</option>
                                                    <option value="4">Rechazado por cliente</option>
                                                    <option value="5">Rechazado por Kabec</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <label>Perfil:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <select className="form-control labelBorder" required name="tipoExamen">
                                                    <option value="1" selected disabled>Opciones</option>
                                                    <option value="2">Tester</option>
                                                    <option value="3">Programador Java</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="row">
                                            <div className="col" >
                                                <label >Comentarios:</label>
                                            </div>
                                            <div className="col-sm-8">
                                                <textarea class="textArea form-control" rows="3" cols="60"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-1"></div>
                                <br />
                                <div className="row">
                                    <di className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label className="labelFecha">Fecha de nacimiento:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField
                                                    type="date"
                                                    onChange={this.handleChangeDate}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </di>
                                    <di className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Edad:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control"></input>
                                            </div>
                                        </div>
                                    </di>
                                    <br />
                                    <di className="col-sm-4">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Sexo:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <select className="form-control labelBorder" required name="tipoExamen">
                                                    <option value="1" selected disabled>Sexo</option>
                                                    <option value="2">Femenino</option>
                                                    <option value="3">Masculino</option>
                                                </select>
                                            </div>
                                        </div>
                                    </di>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>CURP:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>RFC:</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2 ">
                            <div className="row ">
                                <div className="col">
                                    <img className="agciAvatar" src={IconoExamen} alt="Examen" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="" align="center">
                        <td className="lineaEspacioDerecha2">
                            <ColoredLine2 color="black" />
                        </td>
                        <td>
                            <h2>Escuela</h2>
                        </td>
                        <td className="lineaEspacioIzquierda2">
                            <ColoredLine2 color="black" />
                        </td>
                    </div>
                    <br/><br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Escuela:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="tipoExamen">
                                            <option value="1" selected disabled>Selecciona</option>
                                            <option value="2">ITSOEH</option>
                                            <option value="3">UMB</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Carrera:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="tipoExamen">
                                            <option value="1" selected disabled>Selecciona</option>
                                            <option value="2">ITICS</option>
                                            <option value="3">I.S.C</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Estatus Titulación:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="tipoExamen">
                                            <option value="1" selected disabled>Opción</option>
                                            <option value="2">TITULADO</option>
                                            <option value="3">EN PROCESO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Certificaciones:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Experiencia:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="" align="center">
                        <td className="lineaEspacioDerecha2">
                            <ColoredLine2 color="black" />
                        </td>
                        <td>
                            <h2>Perfil</h2>
                        </td>
                        <td className="lineaEspacioIzquierda2">
                            <ColoredLine2 color="black" />
                        </td>
                    </div>
                    <br/><br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Perfil:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="tipoExamen">
                                            <option value="1" selected disabled>Selecciona</option>
                                            <option value="2">Tester</option>
                                            <option value="3">Programador Java</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Pretensión económica:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Estatus CV:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="form-control labelBorder" required name="tipoExamen">
                                            <option value="1" selected disabled>Selecciona</option>
                                            <option value="2">Enviado</option>
                                            <option value="3">No enviado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Acuerdo económico:</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div align="center">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-2">
                                    <Link to="/consultarCita" className="btn btn-primary">Guardar</Link>
                                </div>
                                <div className="col-md-auto"></div>
                                <div className="col col-lg-2">
                                    <Link to="/consultarCita" className="btn btn-secondary"> Cancelar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

export default Postulante;