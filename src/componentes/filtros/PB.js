import React, { Component } from "react";
import { getPostulanteB, getPerfil } from "../../request/request";
import lapiz from "../../Imagenes/lapiz.png";

class filtro_default extends React.Component {
  state = {
    isLoading: true,
    resp: [],
    respPerf: [],
    selecPerf: ""
  };
  componentWillMount = () => {
    getPostulanteB()
      .then(response => {
        let nuevoGet = [];
        nuevoGet.push(response);
        this.setState({ resp: nuevoGet });
        console.log(this.state.resp);
      })
      .catch(console.log);

    this.getPerfil();
    this.setState({ isLoading: false });
  };

  getPerfil = async () => {
    const nuevoGet = await getPerfil();
    this.setState({
      respPerf: nuevoGet.data
    });
  };
  render() {
    const groupPB = this.state.resp.map(arr => {
      return arr.map(postulante => {
        const n = `${postulante.nombre || ""}`;
        const a1 = `${postulante.apellido1 || ""}`;
        const a2 = `${postulante.apellido2 || ""}`;
        const t = `${postulante.telefono || ""}`;
        const c = `${postulante.celular || ""}`;
        const co = `${postulante.correo || ""}`;
        const d = `${postulante.perfil.descripcion || ""}`;
        const ver = `${postulante.estatuspostulante.descripcion || ""}`;
        //perfil==this.state.perfil
        if (ver === "No Contactado") /{
          return (
            <tr key={postulante.id} style={{ whiteSpace: "nowrap" }}>
              <td>
                {n}
                &nbsp;
                {a1}
                &nbsp;
                {a2}
              </td>
              <td>{t}</td>
              <td>{c}</td>
              <td>{co}</td>
              <td>{d}</td>
              <td>{ver}</td>
              <td>
                <input
                  type="image"
                  className="lapiz"
                  src={lapiz}
                  alt="editar"
                />
              </td>
            </tr>
          );
        }
        console.log(postulante.perfil.descripcion);
      });
    });
    return groupPB;
  }
}

export default filtro_default;
