import Loader from "react-loader-spinner";
import React from "react";

function progresBar(cambio) {
  //console.log(cambio);

  if (cambio === true) {
    return <Loader type="Bars" color="#00BFFF" height={100} width={100} />;
  } else {
  }
}

export { progresBar };
