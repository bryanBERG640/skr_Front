import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import reducers from "../reducers";
import persistState from "redux-localstorage";
import { routerReducer } from "react-router-redux";
import thunk from "redux-thunk";
import PBseleccion from "../reducers/PBSeleccionReducer";

const enhancer = compose(persistState("user")); // nos permite hacer la persistenacia de datos aunque se recargue la pagina

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

//metemos el middleware para poder ocupar el history en el index
export default function configureStore(middleware) {
  return createStore(rootReducer, applyMiddleware(middleware, thunk));
}

/*const reducer = combineReducers({
  PBseleccion
});

const store = createStore(reducer);

export default store;*/
