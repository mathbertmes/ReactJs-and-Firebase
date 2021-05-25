import React from "react";
import firebase from "./firebase";
import HotelIndividuaisClientes from "./HoteisIndividuaisClientes";
import HotelCliente from "./HotelCliente";

class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      destino: "",
      checkIn: "",
      checkOut: "",
      nDeAdultos: 0,
      nDeCriancas: 0,
      nDeQuartos: 0,
      hoteisPesquisados: [],
      hoteisPesquisadosCat: [],
      hotelSelecionado: false,
      idHotelSelecionado: {},
    };
  }
  componentDidMount = () => {
    this.setState({
      destino: "",
      checkIn: "",
      checkOut: "",
      nDeAdultos: 0,
      nDeCriancas: 0,
      nDeQuartos: 0,
      hoteisPesquisados: [],
      hoteisPesquisadosCat: [],
      hotelSelecionado: false,
      idHotelSelecionado: {},
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  selecionaHotel = (hotel) => {
    console.log("Tentando");
    this.setState((st) => {
      return { ...st, hotelSelecionado: true, idHotelSelecionado: hotel };
    });
  };

  adicionaDocumentoBusca = (busca) => {
    firebase.firestore().collection("Busca").add(busca);
    this.setState({
      destino: "",
      checkIn: "",
      checkOut: "",
      nDeAdultos: 0,
      nDeCriancas: 0,
      nDeQuartos: 0,
    });
  };

  cadastraBusca = (busca) => {
    this.adicionaDocumentoBusca(busca);
  };

  pesquisaHoteis = (destino) => {
    firebase
      .firestore()
      .collection("Hoteis")
      .where("localizacao.cidade", "==", destino)
      .get()
      .then((h) => {
        let a = h.docs.map((m) => {
          return { ...m.data(), id: m.id };
        });
        this.setState((st) => {
          return {
            ...st,
            hoteisPesquisados: a,
            hotelSelecionado: false,
            idHotelSelecionado: {},
          };
        });
      })
      .then(() => {
        let promises = this.state.hoteisPesquisados.map((element) => {
          return firebase
            .firestore()
            .collection("Hoteis")
            .doc(element.id)
            .collection("Categorias")
            .get()
            .then((hotel) => {
              return hotel.docs.map((doc) => {
                return { ...doc.data(), idHotel: element.id };
              });
            });
        });
        Promise.all(promises).then((docs) => {
          let arrayCat = docs.filter((doc) => {
            return doc.length > 0;
          });
          let hoteisCat = this.state.hoteisPesquisados.filter((hotel) => {
            let categorias = arrayCat.map((categorias) => {
              return categorias.some((categoria) => {
                return categoria.idHotel === hotel.id;
              });
            });
            return categorias.some((categoria) => categoria);
          });
          this.setState((st) => {
            return { ...st, hoteisPesquisadosCat: hoteisCat };
          });
        });
      })
      .then(console.log(this.state.hoteisPesquisadosCat.length));
  };

  handleClick = (event) => {
    event.preventDefault();
    this.pesquisaHoteis(this.state.destino);
  };

  render() {
    return (
      <div id="area-principal">
        <div id="pesquisaGeral">
          <form id="area-formulario">
            <h1 id="headerPesquisa">Escolha seu destino</h1>
            <br />
            <div>
              <label>Qual o seu destino?</label>
              <br />
              <input
                name="destino"
                id="destino"
                onChange={this.handleChange}
                value={this.state.destino}
              ></input>
              <br />
              <br />
              <div id="check">
                <div>
                  <label>Check-In:</label>
                  <br />
                  <input
                    type="date"
                    name="checkIn"
                    className="checka"
                    onChange={this.handleChange}
                    value={this.state.checkIn}
                  ></input>
                </div>
                <br />
                <div>
                  <label>Check-Out:</label>
                  <br />
                  <input
                    type="date"
                    name="checkOut"
                    className="checka"
                    onChange={this.handleChange}
                    value={this.state.checkOut}
                  ></input>
                </div>
                <br />
              </div>
              <div id="qtd">
                <div id="teste">
                  <label>Nº de adultos:</label>
                  <br />
                  <input
                    name="nDeAdultos"
                    type="number"
                    min="0"
                    className="qtda"
                    onChange={this.handleChange}
                    value={this.state.nDeAdultos}
                  ></input>
                </div>
                <br />
                <div>
                  <label>Nº de Crianças:</label>
                  <br />
                  <input
                    name="nDeCriancas"
                    type="number"
                    min="0"
                    className="qtda"
                    onChange={this.handleChange}
                    value={this.state.nDeCriancas}
                  ></input>
                </div>
                <br />
                <div>
                  <label>Nº de Quartos:</label>
                  <br />
                  <input
                    name="nDeQuartos"
                    type="number"
                    min="0"
                    className="qtda"
                    onChange={this.handleChange}
                    value={this.state.nDeQuartos}
                  ></input>
                </div>
                <br />
              </div>
              <button id="btn-buscar" onClick={this.handleClick}>
                Procurar
              </button>
            </div>
          </form>
        </div>
        <div className="exibicao">
          {!this.state.hotelSelecionado &&
            this.state.hoteisPesquisadosCat.length == 0 && (
              <div>
                <div className="banner">
                  <h3 className="descricaoBanner">Imagem</h3>
                </div>
                <div className="imagensPequenasDestinosJuntas">
                  <div className="imagensPequenasDestinos">
                    <h3 className="descricaoBanner">Imagem</h3>
                  </div>
                  <div className="imagensPequenasDestinos">
                    <h3 className="descricaoBanner">Imagem</h3>
                  </div>
                </div>

                <div className="imagensPequenasDestinosJuntas">
                  <div className="imagensPequenasDestinos">
                    <h3 className="descricaoBanner">Imagem</h3>
                  </div>
                  <div className="imagensPequenasDestinos">
                    <h3 className="descricaoBanner">Imagem</h3>
                  </div>
                </div>
              </div>
            )}
          {!this.state.hotelSelecionado &&
            this.state.hoteisPesquisadosCat.length > 0 && (
              <div>
                {this.state.hoteisPesquisadosCat.map((hotel) => (
                  <HotelCliente
                    selecionaHotel={this.selecionaHotel}
                    hotel={hotel}
                  />
                ))}
              </div>
            )}

          {this.state.hotelSelecionado && (
            <div>
              <HotelIndividuaisClientes hotel={this.state.idHotelSelecionado} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Input;
