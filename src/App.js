import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import consulta_PB from "./componentes/consulta_PB";
import Layout from "./componentes/Layout";
import SolucionesKabec from "./componentes/SolucionesKabec";
import FichaPostulante from "./componentes/FichaPostulante";
import consultarCita from "./componentes/consultarCita";
import Agregar_PB from "./componentes/agregar_PB";
import agendar from "./componentes/agendar";
import agregar_comentario from "./componentes/agrcom";
import Examen from "./componentes/examen/Examen";
import Postulante from "./componentes/Postulante";
import NotFound from "./componentes/paginas/NotFound";
import Entrevista from "./componentes/Entrevistas/Entrevista";
import "./App.css";
import history from "./history";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter history={history}>
        <Layout>
          <Switch>
            <Route exact path="/Entrevista" component={Entrevista} />
            <Route exact path="/" />
            <Route exact path="/Ficha-Postulante" component={FichaPostulante} />
            <Route
              exact
              path="/consultar-Postulantes"
              component={consulta_PB}
            />
            <Route exact path="/consultarCita" component={consultarCita} />
            <Route exact path="/agregar_PB" component={Agregar_PB} />
            <Route exact path="/agendar_cita" component={agendar} />
            <Route
              exact
              path="/agregar_comentario"
              component={agregar_comentario}
            />
            <Route exact path="/Examen" component={Examen} />
            <Route
              exact
              path="/Completar_Datos_postulante"
              component={Postulante}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
