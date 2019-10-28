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

//Se crea una función para consultar todos los datos de postulanteC.
function getPostulanteTodo() {
  const postulantesCT = axios.get(
    "http://192.168.1.230:8088/skr_v1/postulanteComplemento/get/"
  );
  return postulantesCT;
}

function getPostulanteB() {
  const postulantes = axios.get(
    "http://192.168.1.230:8088/skr_v1/postulanteB/get"
  );
  return postulantes;
}

function getEmpresa() {
  const empresa = axios.get("http://192.168.1.230:8088/skr_v1/empresa/get");
  return empresa;
}

function getCita() {
  const citas = axios.get("http://192.168.1.230:8088/skr_v1/cita/get/");
  return citas;
}

function getPerfil() {
  const perfil = axios.get("http://192.168.1.230:8088/skr_v1/perfil/get/");
  return perfil;
}

function postSeccion(jsonRequest, estatus, perfil) {
  /*console.log(jsonRequest);
  console.log(estatus);
  console.log(perfil);*/
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

function postCita(jsonRequest, estatusCita, idPostulanteB, empresa, cliente) {
  /*console.log(estatusCita);
  console.log(idPostulanteB);*/
  return fetch(
    "http://192.168.1.230:8088/skr_v1/cita/" +
      estatusCita +
      "/" +
      idPostulanteB +
      "/" +
      empresa +
      "/" +
      cliente +
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

function putPostulanteC(
  jsonRequest,
  idPostulanteB,
  idEscuela,
  idTitulacion,
  idCarrera,
  idSexo,
  idCv,
  idAprobacion,
  idPostulanteComplemento
) {
  // debugger
  // console.log("Dentro de la funcion putPostulanteC");
  // console.log("Valores del jsonRequest: " + jsonRequest);
  // console.log("Valores del idPostulanteB: " + idPostulanteB)
  // console.log("Valores del idEscuela: " + idEscuela)
  // console.log("Valores del idTitulacion: " + idTitulacion)
  // console.log("Valores del idCarrera: " + idCarrera)
  // console.log("Valores del idSexo: " + idSexo)
  // console.log("Valores del idCv: " + idCv)
  // console.log("Valores del idAprobacion: " + idAprobacion)
  // console.log("Valores del idPostulanteComplemento: " + idPostulanteComplemento)

  const ruta = "http://192.168.1.230:8088/skr_v1/postulanteComplemento/";
  const path =
    idPostulanteB +
    "/" +
    idEscuela +
    "/" +
    idTitulacion +
    "/" +
    idCarrera +
    "/" +
    idSexo +
    "/" +
    idCv +
    "/" +
    idAprobacion +
    "/put/" +
    idPostulanteComplemento;

  return fetch(ruta + path, {
    method: "PUT",
    body: JSON.stringify(jsonRequest),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function putPostulanteB(
  requestPostulanteB,
  idEstatusPostulante,
  idPerfil,
  idPostulanteB
) {
  // debugger;
  console.log("Valores de requestPostulanteB: " + requestPostulanteB);
  console.log("Valor de idEstatusPostulante: " + idEstatusPostulante);
  console.log("Valor de idPerfil: " + idPerfil);
  console.log("valod de id_postulante" + idPostulanteB);

  const ruta = "http://192.168.1.230:8088/skr_v1/postulanteB/";
  const path = idEstatusPostulante + "/" + idPerfil + "/put/" + idPostulanteB;

  return fetch(ruta + path, {
    method: "PUT",
    body: JSON.stringify(requestPostulanteB),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response2 => {
      return response2.json();
    })
    .catch(console.log);
}

function postPostulanteC(
  jsonRequest,
  idPostulanteB,
  idEscuela,
  idTitulacion,
  idCarrera,
  idSexo,
  idCv,
  idAprobacion
) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/postulanteComplemento/" +
      idPostulanteB +
      "/" +
      idEscuela +
      "/" +
      idTitulacion +
      "/" +
      idCarrera +
      "/" +
      idSexo +
      "/" +
      idCv +
      "/" +
      idAprobacion +
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
      console.log("Hola");
      console.log(response.ok);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.text);
      console.log(response.url);
      return response.json();
    })
    .catch(e => {
      console.log(e);
    });
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

function putCita(
  jsonRequest,
  estatusCita,
  idPostulanteB,
  idEmpresa,
  idCliente,
  idCita
) {
  /*console.log(estatusCita);
  console.log(idPostulanteB);
  console.log(idCita);*/
  return fetch(
    "http://192.168.1.230:8088/skr_v1/cita/" +
      estatusCita +
      "/" +
      idPostulanteB +
      "/" +
      idEmpresa +
      "/" +
      idCliente +
      "/put/" +
      idCita,
    {
      method: "PUT",
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

function getEstatusTitulacion() {
  const EstatusTitulacion = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusTitulacion/get/"
  );
  return EstatusTitulacion;
}

function getEscuelas() {
  const escuela = axios.get("http://192.168.1.230:8088/skr_v1/escuela/get/");
  console.log(escuela);
  return escuela;
}

function getCliente() {
  const cliente = axios.get("http://192.168.1.230:8088/skr_v1/cliente/get");
  return cliente;
}

function getCarrera() {
  const carrera = axios.get("http://192.168.1.230:8088/skr_v1/carrera/get/");
  return carrera;
}

function getSexo() {
  const sexo = axios.get("http://192.168.1.230:8088/skr_v1/sexo/get/");
  return sexo;
}

function getEstatusCV() {
  const estatusCV = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusCV/get/"
  );
  return estatusCV;
}

function getEstatusAprobacion() {
  const EstatusAprobacion = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusAprobacion/get/"
  );
  return EstatusAprobacion;
}

function getExamenes() {
  const examenes = axios.get("http://192.168.1.230:8088/skr_v1/examen/get/");
  return examenes;
}

function getEntrevista() {
  const entrevistas = axios.get(
    "http://192.168.1.230:8088/skr_v1/entrevista/get"
  );
  return entrevistas;
}

function getTipoExamen() {
  const tipoExamenes = axios.get(
    "http://192.168.1.230:8088/skr_v1/tipoExamen/get"
  );
  return tipoExamenes;
}

function getSecciones() {
  const secciones = axios.get("http://192.168.1.230:8088/skr_v1/seccion/get");
  return secciones;
}

function postExamen(jsonRequest, idCita, idTipoExamen) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/examen/" +
      idCita +
      "/" +
      idTipoExamen +
      "/" +
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

function postSecciones(jsonRequest, idExamen) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/seccion/" + idExamen + "/post",
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

function deleteSeccion(idSeccion) {
  axios.delete("http://192.168.1.230:8088/skr_v1/seccion/delete/" + idSeccion);
}

export {
  getCliente,
  getSecciones,
  getTipoExamen,
  getEntrevista,
  getExamenes,
  getPostulanteC,
  getEmpresa,
  getPostulanteB,
  getCita,
  getPerfil,
  getCarrera,
  getEscuelas,
  getEstatusAprobacion,
  getEstatusCV,
  getEstatusTitulacion,
  getSexo,
  postSeccion,
  getEstatusPostulante,
  getPostulanteTodo,
  postCita,
  postExamen,
  postSecciones,
  putCita,
  postPostulanteC,
  putPostulanteC,
  deleteSeccion,
  putPostulanteB
};
