import axios from "axios";

function getPostulanteC(idPostulante) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/postulanteComplemento/get/" +
      idPostulante,
    {
      method: "GET"
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function getPostulanteB() {
  const postulantes = axios.get(
    "http://192.168.1.230:8088/skr_v1/postulanteB/get"
  );
  return postulantes;
}

function getCita() {
  const citas = axios.get("http://192.168.1.230:8088/skr_v1/postulanteB/get/");
  return citas;
}

function getPerfil() {
  const perfil = axios.get("http://192.168.1.230:8088/skr_v1/perfil/get/");
  return perfil;
}

function postSeccion(jsonRequest, estatus, perfil) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/postulanteB/" +
      estatus +
      "/" +
      perfil +
      "/post",
    {
      method: "POST",
      body: JSON.stringify(jsonRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function getCitas() {
  return fetch("http://192.168.1.230:8088/skr_v1/postulanteB/get/", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function getEstatusPostulante() {
  const estatusPostulante = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusPostulante/get/"
  );
  return estatusPostulante;
}

export {
  getPostulanteC,
  getPostulanteB,
  getCita,
  getPerfil,
  getCitas,
  postSeccion,
  getEstatusPostulante
};
