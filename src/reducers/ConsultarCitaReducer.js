import { SET_CITA } from "../actions/ConsultarCitaActions";

export const Cita = (state = {}, action) => {
  switch (action.type) {
    case SET_CITA:
      return { ...state, cita: action.payload };
    default:
      return state;
  }
};
