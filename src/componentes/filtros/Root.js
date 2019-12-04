import React from "react";
import { AuthContext } from "../Login/auth";
import Progress from "../paginas/Loading";

class Root extends React.Component {
  render() {
    const { children } = this.props;
    const { authReady } = this.context;

    if (!authReady) return <Progress />;

    return children;
  }
}

Root.contextType = AuthContext;

export default Root;
