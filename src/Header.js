import React from "react";
import { Link } from "react-router-dom";

class Cabecalho extends React.Component {
  render() {
    return (
      <div className="cabecalho">
        <h1>HMAX</h1>
        <div className="navBar">
          <Link to = "/cadastro">Cadastre-Se</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

export default Cabecalho;
