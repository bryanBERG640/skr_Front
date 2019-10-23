import { createStore } from "redux"; //Se import la libreria
import { filtrosPBReducer } from "../reducers/filtrosPBReducer";
import { Cita } from "../reducers/ConsultarCitaReducer";

//Se genera un estado inicial y se pasa como parametro en la funcion de abajo.
const initialState = {
  postulante: "Vacio",
  cita: "vacio",
<<<<<<< HEAD
  cliente: "vacio",
  examen: "vacio"
=======
  catalogo: "vacio",
  escuela: "vacio",
  carrera: "vacio",
  cliente: "vacio"
>>>>>>> b07a679d2c0de989755519044131a4ebb6e850a8
};

//Se crea el store y este almacenara información.
export const store = createStore(
  filtrosPBReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //Se realiza la vinculacion con el plugin que se intalo en chrome de redux.

export const store2 = createStore(
  filtrosPBReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
