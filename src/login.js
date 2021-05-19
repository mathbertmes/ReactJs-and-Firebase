import React from "react";
import './login.css'

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.cadastraUsuario(this.state.email, this.state.senha);
    this.setState({ email: "", senha: "" });
  };

  render() {
    return (
      <div id="lg-principal">
        <div>
          <img id="lg-imagem" src="https://maladeaventuras.com/wp-content/uploads/2019/05/hoteis-romanticos-no-rio-de-janeiro-porto-bay.jpg" />
        </div>
        <div id="lg-telaLogin">
        <h2>Login</h2>
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
          <a className="lg-links">Esqueci a senha</a><br/>
          <a className="lg-links">Não tenho uma conta</a><br/>
          <button id="lg-botaoEntrar" onClick={this.handleClick}>Entrar</button>
        </form>
        </div>
      </div>
    );
  }
}
export default Login;
