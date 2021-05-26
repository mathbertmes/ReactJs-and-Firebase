import React from "react";
import "./cadastraUsuario.css";
import firebase from "./firebase";

class CadastroUsuario extends React.Component {
  state = {
    email: "",
    senha: "",
    confirmacao: "",
    nome: "",
    cpf: "",
    telefone: "",
    idsHoteis: [],
    status: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.cadastraUser(this.state);
  };

  adicionaDocumentoUsuarios = (usuario) => {
    this.setState({
      email: "",
      senha: "",
      confirmacao: "",
      nome: "",
      cpf: "",
      telefone: "",
      idsHoteis: [],
      status: false,
    });
  };

  cadastraUser(user) {
    this.setState(
      (st) => {
        return { ...st, status: true };
      },
      () => {
        this.props.cadastra(user.email, user.senha, user);
        this.adicionaDocumentoUsuarios(user);
      }
    );
  }

  render() {
    return (
      <div id="principalCadastroUsuarios">
        <div className="headerCadastraUsuario">
          <h1 id="headerCadastroUsuario">Cadastre-se</h1>
        </div>

        <form id="formCadastroUsuario">
          <label>Nome Completo:</label>
          <br />
          <input
            onChange={this.handleChange}
            value={this.state.nome}
            name="nome"
            className="inputsCadastroUsuarioX"
          />
          <br />

          <label>Email:</label>
          <br />
          <input
            className="inputsCadastroUsuarioX"
            name="email"
            value={this.state.email}
            type="email"
            onChange={this.handleChange}
          />
          <br />
          <label>Crie uma senha:</label>
          <br />
          <input
            className="inputsCadastroUsuarioX"
            name="confirmacao"
            value={this.state.confirmacao}
            type="password"
            onChange={this.handleChange}
          />
          <br />

          <label>Confirme a senha:</label>
          <br />
          <input
            className="inputsCadastroUsuarioX"
            name="senha"
            value={this.state.senha}
            type="password"
            onChange={this.handleChange}
          />
          <br />

          <label>CPF:</label>
          <br />
          <input
            onChange={this.handleChange}
            value={this.state.cpf}
            name="cpf"
            className="inputsCadastroUsuarioX"
          />
          <br />

          <label>Telefone:</label>
          <br />
          <input
            onChange={this.handleChange}
            value={this.state.telefone}
            name="telefone"
            className="inputsCadastroUsuarioX"
          />
          <br />

          <a id="termos">Termos e condições</a>
          <br />
          <input type="checkbox"></input>
          <label> Eu concordo com os termos e condições</label>

          <button id="botaoCad" onClick={this.handleClick}>
            Cadastre-se
          </button>
        </form>
      </div>
    );
  }
}

export default CadastroUsuario;
