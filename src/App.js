import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import consulta_PB from "./componentes/consulta_PB";
import Layout from "./componentes/Layout";
import SolucionesKabec from "./componentes/SolucionesKabec";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
