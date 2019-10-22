import { SET_POSTULANTE } from "../actions/postulanteB";
import { SET_POSTULANTE_C } from "../actions/postulanteB";
import { SET_CITA } from "../actions/ConsultarCitaActions";
import { SET_CATALOGO } from "../actions/postulanteB";
import { SET_CARRERA } from "../actions/postulanteB";
import { SET_ESCUELA } from "../actions/postulanteB";

export const filtrosPBReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POSTULANTE:
      return { ...state, postulante: action.payload };
    case SET_POSTULANTE_C:
      return { ...state, postulantec: action.payload };
    case SET_CITA:
      return { ...state, cita: action.payload };
    case SET_CATALOGO:
      return { ...state, catalogo: action.payload };
    case SET_CARRERA:
      return { ...state, carrera: action.payload };
    case SET_ESCUELA:
      return { ...state, escuela: action.payload };
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
