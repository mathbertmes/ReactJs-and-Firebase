import React from "react";
import "./HoteisClientesIndividuais.css";
import firebase from "./firebase";

class HotelIndividualCliente extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriasHotel: [],
    };
  }
  componentDidMount = () => {
    this.leCategorias();
  };

  leCategorias = () => {
    console.log(this.props.hotel.id);
    firebase
      .firestore()
      .collection("Hoteis")
      .doc(this.props.hotel.id)
      .collection("Categorias")
      .get()
      .then((snapshot) => {
        const categorias = snapshot.docs.map((ht) => {
          return { ...ht.data(), id: ht.id };
        });
        this.setState({ categoriasHotel: categorias });
        console.log(categorias);
      });
  };

  render() {
    return (
      <div>
        <div id="hc-headerCategoria">
          <h2>Informações do Hotel</h2>
        </div>
        <div id="hc-informacoesHoteis">
          <div className="hc-linhainformacoes">
            <div>
              <h2>{this.props.hotel.nome}</h2>
            </div>
            <div>
              <label>Avaliação: </label>
              {this.props.hotel.estrelas}
            </div>
          </div>

          <div className="hc-linhainformacoes">
            <div>
              <label>Cidade: </label>
              {this.props.hotel.localizacao.cidade}
            </div>
            <div>
              <label>Estado: </label>
              {this.props.hotel.localizacao.estado}
            </div>
          </div>

          <div className="hc-linhainformacoes">
            <div>
              <label>Endereço: </label>
              {this.props.hotel.localizacao.endereco}
            </div>
            <div>
              <label>Telefone: </label>
              {this.props.hotel.telefone}
            </div>
          </div>
          <div className="hc-linhainformacoes">
            <div>
              <label>Descricao: </label>
              {this.props.hotel.descricao}
            </div>
          </div>
        </div>

        <div id="hc-headerCategoria">
          <h2>Categorias Disponiveis</h2>
        </div>

        <div id="hc-categorias">
          {this.state.categoriasHotel.map((cat) => {
            return (
              <div className="hc-categoriasIndividuais">
                <div className="hc-headerCategoriaIndividual">
                  <h2>{cat.nome}</h2>
                </div>
                <div className="hc-elementosCategorias ">
                  <div>
                    <label>Numero de pessoas: </label>
                    {cat.nDePessoas}
                    <br />

                    <label>Numero de Camas: </label>
                    {cat.nDeCamas}
                    <br />

                    <label>Metros quadrados: </label>
                    {cat.m2}
                  </div>
                  <div class="hc-valorReserva">
                    <h3>R$:{cat.valor}</h3>
                    <button className="hc-botaoReserva">Reservar</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HotelIndividualCliente;
