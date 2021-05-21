import React from "react";
import "./CadastroDeDiaria.css";
import firebase from "./firebase";

class CadastroDeDiaria extends React.Component {
  constructor() {
    super();

    this.state = {
      nome: "",
      valor: 0,
      comodidades: {
        cafeDaManha: false,
        frigobar: false,
        arCondicionado: false,
        cofre: false,
        tv: false,
        cozinha: false,
      },
      nDeCamas: 0,
      m2: 0,
      nDeApartamentos: 0,
      nDePessoas: 0,
    };
  }
  cadastraCategoriaBanco = (categoria) => {
    firebase
      .firestore()
      .collection("Hoteis")
      .doc(this.props.idHotel)
      .collection("Categorias")
      .add(categoria)
      .then(alert(`categoria ${categoria.nome} cadastrada com sucesso!`))
      .then(() => {
        this.setState({
          nome: "",
          valor: 0,
          comodidades: {
            cafeDaManha: false,
            frigobar: false,
            arCondicionado: false,
            cofre: false,
            tv: false,
            cozinha: false,
          },
          nDeCamas: 0,
          m2: 0,
          nDeApartamentos: 0,
          nDePessoas: 0,
        });
      });
  };

  handleClick = (event) => {
    event.preventDefault();
    this.cadastraCategoriaBanco(this.state);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeComodidades = (event) => {
    this.setState((st) => {
      return {
        comodidades: {
          ...st.comodidades,
          [event.target.name]: event.target.checked,
        },
      };
    });
  };

  render() {
    return (
      <div id="cd-principal">
        <div id="cd-header">
          <h1>Cadastro de Categorias</h1>
        </div>

        <div className="cd-camposJuntos">
          <div>
            <label>Nome do quarto:</label>
            <br />
            <input
              name="nome"
              value={this.state.nome}
              onChange={this.handleChange}
              className="cd-inputsTextBig"
            ></input>
          </div>
          <div>
            <label>Valor:</label>
            <br />
            <input
              name="valor"
              value={this.state.valor}
              type="number"
              onChange={this.handleChange}
              className="cd-inputsTextBig"
            ></input>
          </div>
        </div>
        <br />
        <div id="cd-comodidadesGerais">
          <div>
            <input
              name="cafeDaManha"
              checked={this.state.comodidades.cafeDaManha}
              onChange={this.handleChangeComodidades}
              className="cd-check"
              type="checkbox"
            ></input>
            <label> Café da manhã</label>
            <br />
            <input
              name="frigobar"
              checked={this.state.comodidades.frigobar}
              onChange={this.handleChangeComodidades}
              className="cd-check"
              type="checkbox"
            ></input>
            <label> Frigobar</label>
            <br />
            <input
              checked={this.state.comodidades.arCondicionado}
              name="arCondicionado"
              onChange={this.handleChangeComodidades}
              className="cd-check"
              type="checkbox"
            ></input>
            <label> Ar condicionado</label>
          </div>

          <div>
            <input
              checked={this.state.comodidades.cofre}
              name="cofre"
              onChange={this.handleChangeComodidades}
              className="cd-check"
              type="checkbox"
            ></input>
            <label> Cofre</label>
            <br />
            <input
              checked={this.state.comodidades.tv}
              name="tv"
              onChange={this.handleChangeComodidades}
              className="cd-check"
              type="checkbox"
            ></input>
            <label> TV</label>
            <br />
            <input
              checked={this.state.comodidades.cozinha}
              name="cozinha"
              onChange={this.handleChangeComodidades}
              className="cd-check"
              type="checkbox"
            ></input>
            <label> Cozinha</label>
          </div>

          <div>
            <label>Nº de camas:</label>
            <br />
            <input
              name="nDeCamas"
              value={this.state.nDeCamas}
              onChange={this.handleChange}
              className="cd-qntP"
              type="number"
            ></input>
          </div>
          <div>
            <label>Nº de apartamentos:</label>
            <br />
            <input
              name="nDeApartamentos"
              value={this.state.nDeApartamentos}
              onChange={this.handleChange}
              className="cd-qntP"
              type="number"
            ></input>
          </div>
          <div>
            <label>Nº de pessoas:</label>
            <br />
            <input
              name="nDePessoas"
              value={this.state.nDePessoas}
              onChange={this.handleChange}
              className="cd-qntP"
            ></input>
          </div>
          <div>
            <label>M²:</label>
            <br />
            <input
              name="m2"
              value={this.state.m2}
              onChange={this.handleChange}
              id="cd-metragem"
            ></input>
          </div>
        </div>

        <button onClick={this.handleClick} id="cd-botaoEntrar">
          Cadastrar
        </button>
      </div>
    );
  }
}

export default CadastroDeDiaria;
