import React from "react";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
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
import Usuarios from "./componentes/admin/consultaUsuarios";

function App() {
  return (
    <React.Fragment>
      <Router history={history}>
        <AuthContextProvider>
          <Layout>
            <Root>
              <Switch>
                <Route exact path="/" />
                <PrivateRoute
                  exact
                  path="/Admin/Usuarios"
                  type="private"
                  allowed={["admin", "SuperAdmin"]}
                  component={Usuarios}
                />
                {/* no mostradas despues de iniciar sesion */}
                <PrivateRoute
                  exact
                  path="/Login"
                  type="public"
                  allowed={[]}
                  component={Login}
                />
                {/* no mostradas sin inicio de sesion */}
                <PrivateRoute
                  exact
                  path="/consultar-Postulantes"
                  type="private"
                  allowed={["admin", "evaluador", "SuperAdmin"]}
                  component={consulta_PB}
                />
                <PrivateRoute
                  type="private"
                  exact
                  path="/consultarCita"
                  allowed={[]}
                  component={consultarCita}
                />
                <PrivateRoute
                  exact
                  path="/agregar_PB"
                  allowed={[]}
                  component={Agregar_PB}
                  type="private"
                />
                {/* no mostradas sin seleccionar un postulanteB */}
                <PrivateRoute
                  exact
                  path="/agendar_cita"
                  component={agendar}
                  type="privateB"
                  allowed={[]}
                />
                <PrivateRoute
                  exact
                  path="/Completar_Datos_postulante"
                  component={Postulante}
                  type="privateB"
                  allowed={[]}
                />
                <PrivateRoute
                  exact
                  path="/agregar_comentario"
                  component={agregar_comentario}
                  type="privateB"
                  allowed={[]}
                />
                <PrivateRoute
                  exact
                  path="/Examen"
                  component={Examen}
                  type="privateB"
                  allowed={[]}
                />

                <PrivateRoute
                  exact
                  path="/Entrevista"
                  component={Entrevista}
                  type="privateB"
                  allowed={[]}
                />

                {/* no mostradas sin seleccionar un postulanteC */}

                <PrivateRoute
                  exact
                  path="/Ficha-Postulante"
                  component={FichaPostulante}
                  type="privateC"
                  allowed={[]}
                />

                <Route component={NotFound} />
              </Switch>
            </Root>
          </Layout>
        </AuthContextProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
