export const SET_POSTULANTE = "SET_POSTULANTE";
export const setPostulante = payload => ({ type: SET_POSTULANTE, payload });

export const AGENDAR = "CLICK_AGENDAR";
export const clickAgendar = value => ({ type: AGENDAR, value });

export const BUSCAR = "CLICK_BUSCAR";
export const clickBuscar = value => ({ type: BUSCAR, value });

export const AGREGAR_POSTULANTE = "CLICK_AGREGAR_POSTULANTE";
export const clickAgregarPostulante = value => ({
  type: AGREGAR_POSTULANTE,
  value
});

export const COMPLETAR_DATOS = "CLICK_COMPLETAR_DATOS";
export const clickCompletarDatos = value => ({ type: COMPLETAR_DATOS, value });

export const SET_CITA = "SET_CITA";
export const setCita = payload => ({
  type: SET_CITA,
  payload
});
