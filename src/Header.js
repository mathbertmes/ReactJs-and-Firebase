import React from "react";
import { Link } from "react-router-dom";
import "./Header.CSS";

class Cabecalho extends React.Component {
  handleClick = () => {
    this.props.sair();
  };

  render() {
    return (
      <div className="cabecalho">
        <h1>HMAX</h1>
        <div className="navBar">
          <div>
            <Link to="/">Home</Link>
          </div>
          {this.props.isLogged && this.props.hoteisDoUsuario.length < 1 && (
            <>
              <Link to="/hoteis">Buscar hoteis</Link>
              <Link to="/cadastro-hoteis">Cadastre seu hotel</Link>
              <Link to="/perfil">Minha conta</Link>
              <a id="sair" onClick={this.handleClick}>
                Sair
              </a>
            </>
          )}

          {this.props.isLogged && this.props.hoteisDoUsuario.length > 0 && (
            <>
              <Link to="/hoteis">Buscar hoteis</Link>
              <Link to="/cadastro-hoteis">Cadastre seu hotel</Link>
              <Link to="/perfil">Minha conta</Link>
              <Link to="/meus-hoteis">Meus Hoteis</Link>
              <a id="sair" onClick={this.handleClick}>
                Sair
              </a>
            </>
          )}

          {!this.props.isLogged && (
            <>
              <Link to="/hoteis">Buscar hoteis</Link>
              <Link to="/login">Login</Link>
              <Link to="/cadastro-usuario">Cadastre-Se</Link>
            </>
          )}

          <link></link>
        </div>
      </div>
    );
  }
}

export default Cabecalho;
