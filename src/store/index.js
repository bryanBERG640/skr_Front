import { createStore } from "redux"; //Se import la libreria
import { filtrosPBReducer } from "../reducers/filtrosPBReducer";

//Se genera un estado inicial y se pasa como parametro en la funcion de abajo.
const initialState = {
  postulante: "Vacio",
  cita: "vacio",
  cliente: "vacio",
  examen: "vacio",
  escuela: "vacio",
  carrera: "vacio",
  seccion: "vacio"
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
