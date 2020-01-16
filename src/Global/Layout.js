import React from "react";
import Navbar from "../Global/NavBar";
function layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}

export default layout;
