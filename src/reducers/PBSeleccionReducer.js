const defaultState = [
  /*{
        idp:0,
        nombre:"",
        apellido1:"",
        apellido2:""
    }*/
];

function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case "SAVE_GET_PostulanteB": {
      return [
        {
          id: 1,
          nombre: "bryan"
        }
      ];
    }
    default:
      return state;
  }
}

export default reducer;
