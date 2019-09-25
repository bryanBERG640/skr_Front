export default function fichaPostulanteReducer (
    state={
        postulanteC:[]
    },action){

    switch(action.type){
        case "SAVE_GET_POSTULANTEC":
        return Object.assign({},state,{postulanteC:action.postulanteC});

        default:
        return state;
    }
}