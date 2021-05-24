import React from "react";
import "./hoteisIndividuais.css";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import AtualizaCategoria from "./AtualizaCategoria";

class HoteisIndividuais extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriasHotel: [],
      catEditable: false,
      idCatEditable: {},
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
        console.log(categorias);
        this.setState({ categoriasHotel: categorias });
      })
      .then(console.log(this.state.categoriasHotel));
  };
  AtualizaCategoria = (cat, catTotal) => {
    let newCat = catTotal;
    delete newCat.id;

    console.log(cat);
    console.log(catTotal);
    firebase
      .firestore()
      .collection("Hoteis")
      .doc(this.props.hotel.id)
      .collection("Categorias")
      .doc(cat)
      .update(newCat)
      .then(() => {
        this.setState({
          categoriasHotel: [],
          catEditable: false,
          idCatEditable: {},
        });
      })
      .then(() => {
        this.leCategorias();
      })
      .then(() => {
        alert("Categoria Atualizada com Sucesso");
      });
  };

  handleClick = (categoria) => {
    console.log("CATEGORIAAAAAAAA");
    console.log(categoria);
    this.setState((st) => {
      return { ...st, catEditable: true, idCatEditable: { ...categoria } };
    });
  };

  render() {
    return (
      <div id="hi-geral">
        <div className="hi-headers">
          <h2>Informações do Hotel</h2>
        </div>
        <div id="hi-telaPrincipal">
          <div className="hi-elementosJuntos">
            <div>
              <label className="hi-label">Nome do Hotel: </label>
              {this.props.hotel.nome}
            </div>
            <div>
              <label className="hi-label">Telefone: </label>
              {this.props.hotel.telefone}
            </div>
          </div>
          <div className="hi-elementosJuntos">
            <div>
              <label className="hi-label">Estrelas: </label>
              {this.props.hotel.estrelas}
            </div>
            <div>
              <label className="hi-label">CNPJ: </label>
              {this.props.hotel.cnpj}
            </div>
          </div>

          <div className="hi-elementosJuntos">
            <div>
              <label className="hi-label">Descrição: </label>
              {this.props.hotel.descricao}
            </div>
            <div></div>
          </div>

          <div className="hi-elementosJuntos">
            <div>
              <label className="hi-label">Cidade: </label>
              {this.props.hotel.localizacao.cidade}
            </div>
            <div>
              <label className="hi-label">Estado: </label>
              {this.props.hotel.localizacao.estado}
            </div>
          </div>

          <div className="hi-elementosJuntos">
            <div>
              <label className="hi-label">Endereço: </label>
              {this.props.hotel.localizacao.endereco}
            </div>
            <div>
              <label className="hi-label">País: </label>
              {this.props.hotel.localizacao.pais}
            </div>
          </div>

          <button id="hi-botaoEdicao">Editar</button>
        </div>
        <br />

        <div id="hi-headerCat">
          <h2>Categorias de Apartamentos</h2>
          <Link
            id="hi-botaoCadastroCat"
            to={`/cadastro-de-diarias/${this.props.hotel.id}`}
          >
            Cadastar Categoria
          </Link>
        </div>
        {!this.state.catEditable &&
          this.state.categoriasHotel.map((categoria) => {
            return (
              <div className="hii-categoria">
                <div>
                  <div className="hi-elementosJuntosCat">
                    <div>
                      <label className="hi-label">Nome: </label>
                      {categoria.nome}
                    </div>
                    <div>
                      <label className="hi-label">Valor: </label>
                      {categoria.valor}
                    </div>
                  </div>

                  <div className="hi-elementosJuntosCat">
                    <div>
                      <label className="hi-label">M²: </label>
                      {categoria.m2}
                    </div>
                    <div>
                      <label className="hi-label">Numero de camas: </label>
                      {categoria.nDeCamas}
                    </div>
                  </div>

                  <div className="hi-elementosJuntosCat">
                    <div>
                      <label className="hi-label">Número de pessoas: </label>
                      {categoria.nDePessoas}
                    </div>
                    <div>
                      <label className="hi-label">
                        Numero de apartamentos:{" "}
                      </label>
                      {categoria.nDeApartamentos}
                    </div>
                  </div>
                </div>

                <button
                  id="hi-botaoEdicao"
                  onClick={this.handleClick.bind(this, categoria)}
                >
                  Editar
                </button>
              </div>
            );
          })}
        {this.state.catEditable && (
          <div>
            <AtualizaCategoria
              categoria={this.state.idCatEditable}
              hotelPai={this.props.hotel.id}
              alteraCategoria={this.AtualizaCategoria}
            />
          </div>
        )}
      </div>
    );
  }
}

export default HoteisIndividuais;
