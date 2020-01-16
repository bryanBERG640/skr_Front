import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./componentes/paginas/NotFound";
import Entrevista from "./componentes/Entrevistas/Entrevista";
import Login from "./componentes/Login/LoginView";
import history from "./history";
import PrivateRoute from "./componentes/paginas/PrivateRoute";
import { AuthContextProvider } from "./componentes/Login/auth";
import Root from "./componentes/filtros/Root";

//RUTAS
import Usuarios from "./componentes/Administrador/consultaUsuarios";
import HomeView from "./Global/Home";
import Layout from "./Global/Layout";

//RUTA POSTULANTE
import Agregar_PB from "./componentes/Agregar_Postulante/agregar_PB";
import Postulante from "./componentes/Consultar_Postulantes/Postulante";
import agendar from "./componentes/Consultar_Postulantes/agendar";
import FichaPostulante from "./componentes/Consultar_Postulantes/Ficha_Postulante/FichaPostulante";
import consulta_PB from "./componentes/Consultar_Postulantes/consulta_PB";

//RUTA CITA
import consultarCita from "./componentes/Consultar_Citas/consultarCita";
import Examen from "./componentes/Consultar_Citas/examen/Examen";
import agregar_comentario from "./componentes/Consultar_Citas/agrcom";

// import Filter from "./componentes/filtros/general";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter
        basename={process.env.REACT_APP_ROUTER_BASE || ""}
        history={history}
      >
        <AuthContextProvider>
          <Layout>
            <Root>
              <Switch>
                <Route exact path="/" component={HomeView} />
                <PrivateRoute
                  exact
                  path="/Admin/Usuarios"
                  type="private"
                  allowed={["Admin", "SuperAdmin"]}
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
                  allowed={[
                    "Admin",
                    "Usuario(Lectura)",
                    "SuperAdmin",
                    "Usuario"
                  ]}
                  component={consulta_PB}
                />
                <PrivateRoute
                  type="private"
                  exact
                  path="/consultarCita"
                  allowed={[
                    "Admin",
                    "Usuario(Lectura)",
                    "SuperAdmin",
                    "Usuario"
                  ]}
                  component={consultarCita}
                />
                <PrivateRoute
                  exact
                  path="/agregar_PB"
                  allowed={["Admin", "SuperAdmin", "Usuario"]}
                  component={Agregar_PB}
                  type="private"
                />
                {/* no mostradas sin seleccionar un postulanteB */}
                <PrivateRoute
                  exact
                  path="/agendar_cita"
                  component={agendar}
                  type="privateB"
                  allowed={["Admin", "SuperAdmin", "Usuario"]}
                />
                <PrivateRoute
                  exact
                  path="/Completar_Datos_postulante"
                  component={Postulante}
                  type="privateB"
                  allowed={["Admin", "SuperAdmin", "Usuario"]}
                />
                <PrivateRoute
                  exact
                  path="/agregar_comentario"
                  component={agregar_comentario}
                  type="privateB"
                  allowed={["Admin", "SuperAdmin", "Usuario"]}
                />
                <PrivateRoute
                  exact
                  path="/Examen"
                  component={Examen}
                  type="privateB"
                  allowed={["Admin", "SuperAdmin", "Usuario"]}
                />

                <PrivateRoute
                  exact
                  path="/Entrevista"
                  component={Entrevista}
                  type="privateB"
                  allowed={["Admin", "SuperAdmin", "Usuario"]}
                />

                {/* no mostradas sin seleccionar un postulanteC */}

                <PrivateRoute
                  exact
                  path="/Ficha-Postulante"
                  component={FichaPostulante}
                  type="privateC"
                  allowed={[
                    "Admin",
                    "Usuario(Lectura)",
                    "SuperAdmin",
                    "Usuario"
                  ]}
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
