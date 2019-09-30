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
  return fetch("http://192.168.1.230:8088/skr_v1/postulanteB/get", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function getCita() {
  const citas = axios.get("http://192.168.1.230:8088/skr_v1/postulanteB/get/");
  return citas;
}

function getPerfil() {
  const perfil = axios.get("http://192.168.1.230:8088/skr_v1/perfil/get/");
  return perfil;
}

<<<<<<< HEAD
function postSeccion(jsonRequest,estatus,perfil) {
  return fetch("http://192.168.1.230:8088/skr_v1/postulanteB/"+estatus+"/"+perfil+"/post", {
    method: 'POST',
    body: JSON.stringify(jsonRequest),
    headers:{'Accept' : 'application/json', 'Content-Type':'application/json'}, 
  }).then(response => {
    return response.json();
  }).catch(console.log)
}

export { getPostulanteC, getPostulanteB, getCita, getPerfil, postSeccion};
=======
function getCitas() {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/postulanteB/get/",
    {
      method: "GET"
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

export { getPostulanteC, getPostulanteB, getCita, getPerfil,  getCitas};
>>>>>>> 87de2f0ce809a49b63079e3661d3ab94ed5ee431
