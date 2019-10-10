import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
<<<<<<< HEAD
import { routerMiddleware } from "react-router-redux";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from "./store/ConfigureStore";

const history = createHistory(); //configuramos history
const middleware = routerMiddleware(history); //configuramos middleware
const store = configureStore(middleware); //asignamos middleware

/*const container = document.getElementById("app");
ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  container
);*/

const container = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
=======
import {routerMiddleware} from 'react-router-redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/ConfigureStore';
import { store } from './store/index';

const history=createHistory();//configuramos history
const middleware=routerMiddleware(history);//configuramos middleware
// const store=configureStore(middleware);//asignamos middleware------------------

const container = document.getElementById("app");
// ReactDOM.render(----------------------
//     <Provider store={store}>
//         <App />
//     </Provider>, container);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, container);
>>>>>>> e66e9683260a3d7f32203b8b93e2231373777e9d
