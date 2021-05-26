import React from "react";
import "./login.css";
import firebase from "./firebase";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    redefinicao: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  esqueciClick = () => {
    this.setState({ redefinicao: true, email: "" });
  };

  esqueciLoginSenha = (event) => {
    event.preventDefault();
    const email = this.state.email;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Email de redefinição enviado com sucesso");
        this.setState({ redefinicao: false, email: "" });
      })
      .catch(() => {
        alert("Email invalido");
      });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.loga(this.state.email, this.state.senha);
    this.setState({
      email: "",
      senha: "",
    });
  };

  render() {
    return (
      <div id="lg-principal">
        <div>
          <img
            id="lg-imagem"
            src="https://maladeaventuras.com/wp-content/uploads/2019/05/hoteis-romanticos-no-rio-de-janeiro-porto-bay.jpg"
          />
        </div>
        <div id="lg-telaLogin">
          {!this.state.redefinicao && (
            <>
              <h2>Login</h2>
              <div id="lg-form">
                <form>
                  <label id="lg-form">Email:</label>
                  <br />
                  <input
                    className="lg-inputs"
                    name="email"
                    value={this.state.email}
                    type="email"
                    onChange={this.handleChange}
                  />
                  <br />
                  <label>Senha:</label>
                  <br />
                  <input
                    className="lg-inputs"
                    name="senha"
                    value={this.state.senha}
                    type="password"
                    onChange={this.handleChange}
                  />
                  <br />
                  <a onClick={this.esqueciClick} className="lg-links">
                    Esqueci a senha
                  </a>
                  <br />
                  <Link className="lg-links" to="/cadastro-usuario">
                    Não tenho conta
                  </Link>
                  <br />
                  <button id="lg-botaoEntrar" onClick={this.handleClick}>
                    Entrar
                  </button>
                </form>
              </div>
            </>
          )}
          {this.state.redefinicao && (
            <>
              <h2>Redefinição de senha</h2>
              <p>Será enviado um email de redefinição para você!</p>
              <form>
                <label>Email:</label>
                <br />
                <input
                  className="lg-inputs"
                  name="email"
                  value={this.state.email}
                  type="email"
                  onChange={this.handleChange}
                />
                <button id="lg-botaoEntrar" onClick={this.esqueciLoginSenha}>
                  Enviar
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default Login;
