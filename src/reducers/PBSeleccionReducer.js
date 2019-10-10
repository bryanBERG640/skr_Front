export default function PBseleccion(
  state = {
    postulanteB: []
  },
  action
) {
  switch (action.type) {
    case "SAVE_GET_POSTULANTEB":
      return Object.assign({}, state, { postulanteB: action.postulanteB });
    default:
      return state;
  }
}
/*const defaultState = [];

const reducer = (state = defaultState, action) => {
  switch(type)
  {
    case "SAVE_GET_POSTULANTEB":
      {
        return[
          {
            id:1,
            nombre: bryan
          }
        ]
      }
    default:
      return state;
  }
};

export default reducer;*/
