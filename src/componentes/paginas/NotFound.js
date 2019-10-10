import React from "react";
import Icon from "../../Imagenes/error404.jpg";

function NotFound() {
  return (
    <React.Fragment>
      <img className="img-404" src={Icon} alt="Error" width="300px" />
      <h1>Lo sentimos, pagina no disponible</h1>
    </React.Fragment>
  );
}

export default NotFound;
