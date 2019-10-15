import { SET_POSTULANTE } from "../actions/postulanteB";
<<<<<<< HEAD
import { SET_POSTULANTE_C } from '../actions/postulanteB';
=======
import { SET_CITA } from "../actions/ConsultarCitaActions";
>>>>>>> 80962c0f1c567e1eb15a37b15933f0a6a590a1a2

export const filtrosPBReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POSTULANTE:
      return { ...state, postulante: action.payload };
<<<<<<< HEAD
    case SET_POSTULANTE_C:
      return { ...state, postulantec: action.payload};
=======
    case SET_CITA:
      return { ...state, cita: action.payload };
>>>>>>> 80962c0f1c567e1eb15a37b15933f0a6a590a1a2
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
