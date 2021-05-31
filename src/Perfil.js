import React from "react";
import "./Perfil.css";
import firebase from "./firebase";
import "firebase/storage";

class Perfil extends React.Component {
  constructor() {
    super();
    this.state = {
      editableNome: false,
      editableTelefone: false,
      editableEmail: false,
      editableSenha: false,
      image: "",
    };
  }

  componentDidMount = () => {
    var storageRef = firebase.storage().ref();
    var starsRef = storageRef.child(`users/${this.props.user.id}`);
    starsRef.getDownloadURL().then((url) => this.setState({ image: url }));
  };

  handleChangeImage = (e) => {
    var storageRef = firebase.storage().ref();
    var mountainImagesRef = storageRef.child(`users/${this.props.user.id}`);
    console.log(e.target.files[0]);
    var file = e.target.files[0]; // use the Blob or File API
    mountainImagesRef
      .put(file)
      .then(function (snapshot) {
        console.log("Imagem salva com sucesso!");
      })
      .then(() => {
        var starsRef = storageRef.child(`users/${this.props.user.id}`);
        starsRef.getDownloadURL().then((url) => this.setState({ image: url }));
      });
  };

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
    let emailAddress = this.props.user.email;

    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then((task) => {
        alert("Email para alteração de senha foi enviado com sucesso!");
      });
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
        <br />
        <div id="pf-imagemPerfilGeral">
          <img id="pf-imagemPerfil" src={this.state.image}></img>
          <br />
          <br />
          <label id="pf-labelSelecao" for="selecao-arquivo">
            Alterar imagem de perfil
          </label>
          <input
            onChange={this.handleChangeImage}
            id="selecao-arquivo"
            type="file"
          />
        </div>

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
