import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import consulta_PB from "./componentes/consulta_PB";
import Layout from "./componentes/Layout";
import SolucionesKabec from "./componentes/SolucionesKabec";
import "./App.css";

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World! <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={SolucionesKabec} />
            <Route exact path="/consultar-PB" component={consulta_PB} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </React.Fragment>
>>>>>>> consultaPB
  );
}

export default App;
