import React from "react";
import "./meusHoteis.css";
import Hotel from "./Hotel";
import firebase from "./firebase";
import { Link } from "react-router-dom";

class MeusHoteis extends React.Component {
  constructor() {
    super();
    this.state = {
      hoteisDoUsuario: [],
    };
  }

  render() {
    return (
      <div id="mh-principal">
        {this.props.hoteisDoUsuario.map((hotel) => (
          <div className="mh-hoteis">
            <div>
              <h1>{hotel.nome}</h1>
              <p>Avaliação: {hotel.estrelas}</p>
            </div>

            <div className="mh-opcoes">
              <Link
                to={`/cadastro-de-diarias/${hotel.id}`}
                className="mh-botaoCadastrar"
              >
                Cadastar Categoria
              </Link>
              <br />
              <button className="mh-botaoAlterar">Alterar Hotel</button>
              <br />
              <Link to={`/${hotel.id}/meus-hoteis`} className="mh-botaoAlterar">
                Vizualizar Hotel
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MeusHoteis;
