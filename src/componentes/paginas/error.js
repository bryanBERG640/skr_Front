import React from "react";
import Icon from "../Imagenes/500.gif";

function error() {
  return (
    <div>
      <img src={Icon} alt="error" />
      <h2>Error en el Servidor!</h2>
    </div>
  );
}

export default error;
