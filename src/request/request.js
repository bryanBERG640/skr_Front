import axios from "axios";

function getPostulanteC(idPostulante, auth) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/postulanteComplemento/get/" +
      idPostulante,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

//Se crea una función para consultar todos los datos de postulanteC.
function getPostulanteTodo(auth) {
  /*const postulantesCT = axios.get(
    "http://192.168.1.230:8088/skr_v1/postulanteComplemento/get/"
  );
  return postulantesCT;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/postulanteComplemento/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });  
}

function getPostulanteB(auth) {

  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/postulanteB/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });  
}

function getPostulanteBId(id, auth) {
  /*const postulante = axios.get(
    "http://192.168.1.230:8088/skr_v1/postulanteB/get/" + id
  );
  return postulante;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/postulanteB/get/" + id, 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });  
}

function getEmpresa(auth) {
  /*const empresa = axios.get("http://192.168.1.230:8088/skr_v1/empresa/get");
  return empresa;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/empresa/get", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });  
}

function getCita(auth) {
  /*const citas = axios.get("http://192.168.1.230:8088/skr_v1/cita/get/");
  return citas;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/cita/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });  
}

function getPerfil(auth) {
  /*const perfil = axios.get("http://192.168.1.230:8088/skr_v1/perfil/get/");
  return perfil;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/perfil/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
      console.log(response)
          return response
      }); 
     
}

function postLogin(usuario, password) {
  // console.log(usuario)
  // console.log(password)
  return axios.post("http://192.168.1.230:8088/skr_v1/login",
 {
   usuario,
   password
 })
// const jsonRequest=
// {
//   usuario,
//   password
// }
// return fetch(
//   "http://192.168.1.230:8088/skr_v1/login",
//   {
//     method: "POST",
//     body: JSON.stringify(jsonRequest),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//   }
// )
//   .then(response => {
//     console.log(response)
//     return response
//   })
//   .catch(console.log);

}

function postSeccion(jsonRequest, estatus, perfil, auth) {
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
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function postCita(jsonRequest, estatusCita, idPostulanteB, empresa, cliente, auth) {
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
        "Content-Type": "application/json",
        "Authorization":auth
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
  idPostulanteComplemento, auth
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
      "Content-Type": "application/json",
      "Authorization":auth
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
  idPostulanteB, auth
) {
  // debugger;
  //console.log( requestPostulanteB);

  const ruta = "http://192.168.1.230:8088/skr_v1/postulanteB/";
  const path = idEstatusPostulante + "/" + idPerfil + "/put/" + idPostulanteB;

  return fetch(ruta + path, {
    method: "PUT",
    body: JSON.stringify(requestPostulanteB),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization":auth
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
  idAprobacion, auth
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
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(e => {
      console.log(e);
    });
}

function getEstatusPostulante(auth) {
  /*const estatusPostulante = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusPostulante/get/"
  );
  return estatusPostulante;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/estatusPostulante/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function putCita(
  jsonRequest,
  estatusCita,
  idPostulanteB,
  idEmpresa,
  idCliente,
  idCita, auth
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
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function getEstatusTitulacion(auth) {
  /*const EstatusTitulacion = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusTitulacion/get/"
  );
  return EstatusTitulacion;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/estatusTitulacion/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getEscuelas(auth) {
  /*const escuela = axios.get("http://192.168.1.230:8088/skr_v1/escuela/get/");
  //console.log(escuela);
  return escuela;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/escuela/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getCliente(auth) {
  /*const cliente = axios.get("http://192.168.1.230:8088/skr_v1/cliente/get");
  return cliente;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/cliente/get", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getCarrera(auth) {
  /*const carrera = axios.get("http://192.168.1.230:8088/skr_v1/carrera/get/");
  return carrera;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/carrera/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getSexo(auth) {
  /*const sexo = axios.get("http://192.168.1.230:8088/skr_v1/sexo/get/");
  return sexo;*/

  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/sexo/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getEstatusCV(auth) {
  /*const estatusCV = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusCV/get/"
  );
  return estatusCV;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/estatusCV/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getEstatusAprobacion(auth) {
  /*const EstatusAprobacion = axios.get(
    "http://192.168.1.230:8088/skr_v1/estatusAprobacion/get/"
  );
  return EstatusAprobacion;*/

  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/estatusAprobacion/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      }); 
}

function getExamenes(auth) {
  /*const examenes = axios.get("http://192.168.1.230:8088/skr_v1/examen/get/");
  return examenes;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/examen/get/", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function getEntrevista(auth) {
  /*const entrevistas = axios.get(
    "http://192.168.1.230:8088/skr_v1/entrevista/get"
  );
  return entrevistas;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/entrevista/get", 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function getCitaId(id, auth) {
  /*const cita = axios.get("http://192.168.1.230:8088/skr_v1/cita/get/" + id);
  return cita;*/

  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/cita/get/" + id, 
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function getTipoExamen(auth) {
  /*const tipoExamenes = axios.get(
    "http://192.168.1.230:8088/skr_v1/tipoExamen/get"
  );
  return tipoExamenes;*/

  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/tipoExamen/get" ,
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function getSecciones(auth) {
  /*const secciones = axios.get("http://192.168.1.230:8088/skr_v1/seccion/get");
  return secciones;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/seccion/get" ,
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function postExamen(jsonRequest, idCita, idTipoExamen, auth) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/examen/" +
      idCita +
      "/" +
      idTipoExamen +
      "/post",
    {
      method: "POST",
      body: JSON.stringify(jsonRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function postSecciones(jsonRequest, idExamen, auth) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/seccion/" + idExamen + "/post",
    {
      method: "POST",
      body: JSON.stringify(jsonRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function putSeccion(jsonRequest, idExamen, idSeccion, auth) {
  return fetch(
    "http://192.168.1.230:8088/skr_v1/seccion/" +
      idExamen +
      "/put/" +
      idSeccion,
    {
      method: "PUT",
      body: JSON.stringify(jsonRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

async function deleteSeccion(idSeccion, auth) {
  //debugger;
  //console.log(idSeccion);
  try {
    await fetch(
      "http://192.168.1.230:8088/skr_v1/seccion/delete/" + idSeccion,
      {
        method: "DELETE",
        body: JSON.stringify(idSeccion),
        headers: {
          Accept: "application/json",
          "Content-Type": "text/plain",
          "Authorization":auth
        }
      }
    );
    console.log("eliminado");
  } catch (error) {
    console.error(error);
  }
}

function getTipoEntrevista(auth) {
  /*const tipoEntrevistas = axios.get(
    "http://192.168.1.230:8088/skr_v1/tipoEntrevista/get"
  );
  return tipoEntrevistas;*/
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/tipoEntrevista/get" ,
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function postEntrevista(jsonRequest, idTipoEntrevista, idCita, auth) {
  const url = "http://192.168.1.230:8088/skr_v1/entrevista/";
  const path = idTipoEntrevista + "/" + idCita + "/post";

  return fetch(url + path, {
    method: "POST",
    body: JSON.stringify(jsonRequest),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization":auth
    }
  })
    .then(response => {
      console.log("El post funciono correctamente." + response);
      return response.json();
    })
    .catch(console.log);
}

function getRoles(auth)
{
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/roles/get" ,
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function postUsuario(rol, jsonRequest, auth)
{
  return fetch(
    //"http://localhost:8080/usuario/"+rol+"/post",
    
    "http://192.168.1.230:8088/skr_v1/usuario/" + rol + "/post",
    {
      method: "POST",
      body: JSON.stringify(jsonRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

function getUsuario(usuario, auth)
{
  //"http://192.168.1.230:8088/skr_v1/usuario/get"
  return axios({ 
    method: 'GET',
    url: "http://localhost:8080/usuario/get/"+usuario ,
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function getUsuarios(auth)
{
  return axios({ 
    method: 'GET',
    url: "http://192.168.1.230:8088/skr_v1/usuario/get/",
    headers: {  
      "Content-Type": "application/json",
      "Authorization": auth,
      "Accept": "application/json"
      },                   
    })
    .then(response => {
          return response
      });
}

function putUsuario(idRol, jsonRequest, IdUsuario, auth)
{
  //"http://localhost:8080/usuario/"+idRol+"/put/"+IdUsuario,
  return fetch(
    "http://192.168.1.230:8088/skr_v1/usuario/" + idRol + "/put/"+IdUsuario,
    
    {
      method: "PUT",
      body: JSON.stringify(jsonRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":auth
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(console.log);
}

async function deleteUsuario(id_usuario, auth)
{
  try {
    await fetch(
      "http://192.168.1.230:8088/skr_v1/usuario/delete/" + id_usuario,
      {
        method: "DELETE",
        body: JSON.stringify(id_usuario),
        headers: {
          Accept: "application/json",
          "Content-Type": "text/plain",
          "Authorization":auth
        }
      }
    );
    console.log("eliminado");
  } catch (error) {
    console.error(error);
  }
}

export {
  getTipoEntrevista,
  getCliente,
  getSecciones,
  getTipoExamen,
  getEntrevista,
  getExamenes,
  getPostulanteC,
  getEmpresa,
  getPostulanteB,
  getPostulanteBId,
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
  putPostulanteB,
  postEntrevista,
  getCitaId,
  putSeccion,
  postLogin,
  getRoles,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario
};
