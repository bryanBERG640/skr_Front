import { SET_POSTULANTE } from "../actions/postulanteB";
import { SET_POSTULANTE_C } from "../actions/postulanteB";
import { SET_CITA } from "../actions/ConsultarCitaActions";
<<<<<<< HEAD
import { SELECCIONAR } from '../actions/postulanteB';

=======
import { SET_CATALOGO } from "../actions/postulanteB";
>>>>>>> 6cecd87d1742565ca13f7095401fb58adfe8f0ee

export const filtrosPBReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POSTULANTE:
      return { ...state, postulante: action.payload };
    case SET_POSTULANTE_C:
      return { ...state, postulantec: action.payload };
    case SET_CITA:
      return { ...state, cita: action.payload };
<<<<<<< HEAD
    case SELECCIONAR:
      return { ...state, valor: action.payload};
=======
    case SET_CATALOGO:
      return { ...state, catalogo: action.payload };
>>>>>>> 6cecd87d1742565ca13f7095401fb58adfe8f0ee
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
