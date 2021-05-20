import React from "react";
import "./Perfil.css";

class Perfil extends React.Component {
  constructor() {
    super();
    this.state = {
      editableNome: false,
      editableTelefone: false,
      editableEmail: false,
      editableSenha: false,
    };
  }

  handleClickNome = (event) => {
    this.setState({ editableNome: true });
  };
  handleClickTelefone = (event) => {
    this.setState({ editableTelefone: true });
  };
  handleClickEmail = (event) => {
    this.setState({ editableEmail: true });
  };
  handleClickSenha = (event) => {
    this.setState({ editableSenha: true });
  };

  handleChange = (e) => {
    this.props.alteraUsuario(e.target.name, e.target.value);
  };

  handleClickSaveNome = () => {
    this.props.alteraNomeBanco();
    this.setState({ editableNome: false });
  };
  handleClickSaveEmail = () => {
    this.props.alteraNomeBanco();
    this.setState({ editableEmail: false });
  };
  handleClickSaveTelefone = () => {
    this.props.alteraNomeBanco();
    this.setState({ editableTelefone: false });
  };
  handleClickSaveTelefone = (e) => {};

  render() {
    return (
      <div id="pf-principal">
        <h2>Dados Pessoais</h2>
        {!this.state.editableNome &&
          !this.state.editableEmail &&
          !this.state.editableTelefone &&
          !this.state.editableSenha && (
            <>
              <div id="pf-dadosGerais">
                <div className="elementosEditaveis">
                  <div>
                    <label>Nome: </label>
                    {this.props.user.nome}
                  </div>
                  <button
                    name="editableNome"
                    className="iconPen"
                    onClick={this.handleClickNome}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                </div>
                <div className="elementosEditaveis">
                  <div>
                    <label>E-mail: </label>
                    {this.props.user.email}
                  </div>
                  <button onClick={this.handleClickEmail} className="iconPen">
                    <i className="fas fa-pen"></i>
                  </button>
                </div>

                <div className="elementosEditaveis">
                  <div>
                    <label>Senha: </label>
                    <input
                      id="pf-labelSenha"
                      type="password"
                      disabled="disabled"
                      value={this.props.user.senha}
                    ></input>
                  </div>
                  <button onClick={this.handleClickSenha} className="iconPen">
                    <i className="fas fa-pen"></i>
                  </button>
                </div>

                <div className="elementosEditaveis">
                  <div>
                    <label>Telefone: </label>
                    {this.props.user.telefone}
                  </div>
                  <button
                    onClick={this.handleClickTelefone}
                    className="iconPen"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                </div>

                <div className="elementosEditaveis">
                  <div>
                    <label>CPF: </label>
                    {this.props.user.cpf}
                  </div>
                </div>
              </div>
            </>
          )}

        {this.state.editableNome && (
          <>
            <div id="pf-dadosGerais">
              <div className="elementosEditaveis">
                <div>
                  <label>Nome: </label>
                  <input
                    name="nome"
                    value={this.props.user.nome}
                    onChange={this.handleChange}
                    className="pf-inputDados"
                  ></input>
                  <button
                    onClick={this.handleClickSaveNome}
                    className="iconSave"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>
              <div className="elementosEditaveis">
                <div>
                  <label>E-mail: </label>
                  {this.props.user.email}
                </div>
              </div>
              <div className="elementosEditaveis">
                <div>
                  <label>Senha: </label>
                  <input
                    id="pf-labelSenha"
                    type="password"
                    disabled="disabled"
                    value={this.props.user.senha}
                  ></input>
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>Telefone: </label>
                  {this.props.user.telefone}
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>CPF: </label>
                  {this.props.user.cpf}
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.editableEmail && (
          <>
            <div id="pf-dadosGerais">
              <div className="elementosEditaveis">
                <div>
                  <label>Nome: </label>
                  {this.props.user.nome}
                </div>
              </div>
              <div className="elementosEditaveis">
                <div>
                  <label>E-mail: </label>
                  <input
                    name="email"
                    value={this.props.user.email}
                    onChange={this.handleChange}
                    className="pf-inputDados"
                  ></input>
                  <button
                    onClick={this.handleClickSaveEmail}
                    className="iconSave"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>Senha: </label>
                  <input
                    id="pf-labelSenha"
                    type="password"
                    disabled="disabled"
                    value={this.props.user.senha}
                  ></input>
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>Telefone: </label>
                  {this.props.user.telefone}
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>CPF: </label>
                  {this.props.user.cpf}
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.editableTelefone && (
          <>
            <div id="pf-dadosGerais">
              <div className="elementosEditaveis">
                <div>
                  <label>Nome: </label>
                  {this.props.user.nome}
                </div>
              </div>
              <div className="elementosEditaveis">
                <div>
                  <label>E-mail: </label>
                  {this.props.user.email}
                </div>
              </div>
              <div className="elementosEditaveis">
                <div>
                  <label>Senha: </label>
                  <input
                    id="pf-labelSenha"
                    type="password"
                    disabled="disabled"
                    value={this.props.user.senha}
                  ></input>
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>Telefone: </label>
                  <input
                    name="telefone"
                    value={this.props.user.telefone}
                    onChange={this.handleChange}
                    className="pf-inputDados"
                  ></input>
                  <button
                    onClick={this.handleClickSaveTelefone}
                    className="iconSave"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>CPF: </label>
                  {this.props.user.cpf}
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.editableSenha && (
          <>
            <div id="pf-dadosGeraisSenha">
              <div className="elementosEditaveis">
                <div>
                  <label>Nome: </label>
                  {this.props.user.nome}
                </div>
              </div>
              <div className="elementosEditaveis">
                <div>
                  <label>E-mail: </label>
                  {this.props.user.email}
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>Senha antiga: </label>
                  <input class="pf-inputDados" type="password"></input> <br />
                  <br />
                  <label>Nova senha: </label>
                  <input class="pf-inputDados" type="password"></input>
                  <button
                    onClick={this.handleClickSaveTelefone}
                    className="iconSave"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>Telefone: </label>
                  {this.props.user.telefone}
                </div>
              </div>

              <div className="elementosEditaveis">
                <div>
                  <label>CPF: </label>
                  {this.props.user.cpf}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Perfil;
