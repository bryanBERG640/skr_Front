import {
  SET_POSTULANTE,
  SET_POSTULANTE_C,
  SET_CLIENTE,
  SET_EXAMEN,
  SET_SECCION,
  SET_ENTREVISTA,
  SELECCIONAR,
  SET_RADIOBUTTON
} from "../actions/postulanteB";

import { SET_CITA } from "../actions/ConsultarCitaActions";
import { SET_CARRERA } from "../actions/postulanteB";
import { SET_ESCUELA } from "../actions/postulanteB";
import { reducer as formReducer } from "redux-form";
import { stat } from "fs";

export const filtrosPBReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POSTULANTE:
      return { ...state, postulante: action.payload };
    case SET_POSTULANTE_C:
      return { ...state, postulantec: action.payload };
    case SET_CITA:
      return { ...state, cita: action.payload };
    case SET_CARRERA:
      return { ...state, carrera: action.payload };
    case SET_ESCUELA:
      return { ...state, escuela: action.payload };
    case SET_CLIENTE:
      return { ...state, cliente: action.payload };
    case SET_EXAMEN:
      return { ...state, examen: action.payload };
    case SET_SECCION:
      return { ...state, seccion: action.payload };
    case SET_ENTREVISTA:
      return { ...state, entrevista: action.payload };
    case SELECCIONAR:
      return { ...state, seleccion: action.payload };
    case SET_RADIOBUTTON:
      return { ...state, radiobutton: action.payload };
    default:
      return state;
  }
};

//Explicación del funcionamimento de la siguiente función
// switch(action.type) {
//     case SET_POSTULANTE:
//         return { ...state, nombre: action.payload }
//         default:
//             return state;
// }

//1.-El state con los tres puntos antes significa que realiza un desglose de todos sus elementos.
//2.-El action.payload es el nuevo valor o un valor que recibe y se almacenara en la variable nombre.
