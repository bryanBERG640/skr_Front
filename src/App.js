import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import consulta_PB from "./componentes/consulta_PB";
import Layout from "./componentes/Layout";
import FichaPostulante from "./componentes/FichaPostulante";
import consultarCita from "./componentes/consultarCita";
import Agregar_PB from "./componentes/agregar_PB";
import agendar from "./componentes/agendar";
import agregar_comentario from "./componentes/agrcom";
import Examen from "./componentes/examen/Examen";
import Postulante from "./componentes/Postulante";
import NotFound from "./componentes/paginas/NotFound";
import Entrevista from "./componentes/Entrevistas/Entrevista";
import Login from "./componentes/Login/LoginView";
import "./App.css";
import history from "./history";
import PrivateRoute from "./componentes/paginas/PrivateRoute";
import { AuthContextProvider } from "./componentes/Login/auth";
import Root from "./componentes/filtros/Root";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter history={history}>
        <AuthContextProvider>
          <Layout>
            <Root>
              <Switch>
                <Route exact path="/" />
                {/* no mostradas despues de iniciar sesion */}
                <PrivateRoute
                  exact
                  path="/Login"
                  type="public"
                  component={Login}
                />
                {/* no mostradas sin inicio de sesion */}
                <PrivateRoute
                  exact
                  path="/consultar-Postulantes"
                  type="private"
                  component={consulta_PB}
                />
                <PrivateRoute
                  type="private"
                  exact
                  path="/consultarCita"
                  component={consultarCita}
                />
                <PrivateRoute
                  exact
                  path="/agregar_PB"
                  component={Agregar_PB}
                  type="private"
                />
                {/* no mostradas sin seleccionar un postulanteB */}
                <PrivateRoute
                  exact
                  path="/agendar_cita"
                  component={agendar}
                  type="privateB"
                />
                <PrivateRoute
                  exact
                  path="/Completar_Datos_postulante"
                  component={Postulante}
                  type="privateB"
                />

                {/* no mostradas sin seleccionar un postulanteC */}

                <PrivateRoute
                  exact
                  path="/Entrevista"
                  component={Entrevista}
                  type="privateC"
                />
                <PrivateRoute
                  exact
                  path="/Ficha-Postulante"
                  component={FichaPostulante}
                  type="privateC"
                />
                <PrivateRoute
                  exact
                  path="/agregar_comentario"
                  component={agregar_comentario}
                  type="privateC"
                />
                <PrivateRoute
                  exact
                  path="/Examen"
                  component={Examen}
                  type="privateC"
                />

                <Route component={NotFound} />
              </Switch>
            </Root>
          </Layout>
        </AuthContextProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
