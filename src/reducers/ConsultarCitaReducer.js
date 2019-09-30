export default function ConsultarCitaReducer (
    state={
        citas:[]
    },action){

    switch(action.type){
        case "SAVE_GET_CITAS":
        return Object.assign({},state,{citas:action.citas});

        default:
        return state;
    }
}