import React from "react";
import SolucionesKabec from "./SolucionesKabec";

function layout(props) {
  return (
    <React.Fragment>
      <SolucionesKabec />
      {props.children}
    </React.Fragment>
  );
}

export default layout;
