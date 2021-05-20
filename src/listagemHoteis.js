import React from "react";
import Hotel from "./Hotel";
import ReactPaginate from "react-paginate";
import "./paginate.css";
import firebase from "./firebase";
import sortArray from "sort-array";

class listagemHoteis extends React.Component {
  constructor() {
    super();
    this.state = {
      hoteis: [],
      hoteisProcurados: [],
      pageCont: 1,
      selected: 0,
      filterNome: -1,
      filterEstrelas: -1,
      pesquisa: "",
    };
  }

  componentDidMount() {
    this.props
      .pegaHoteis()
      .then((h) => this.setState({ hoteis: h, hoteisProcurados: h }));
    firebase
      .firestore()
      .collection("configHoteis")
      .doc("hCwGAgOZcSV8qQCTDdbR")
      .get()
      .then((h) =>
        this.setState((st) => {
          return { ...st, elemCount: h.data().qtdDocumentos };
        })
      );

    this.setState((st) => {
      return { ...st, pageCont: Math.ceil(this.state.elemCount / 15) };
    });
  }
  avanca = () => {
    this.props.pegaHoteis().then((h) => this.setState({ hoteis: h }));
    console.log("Trocou");
  };

  handlePageClick = ({ selected: selectedPage }) => {
    this.props
      .pegaHoteis(selectedPage)
      .then((h) => this.setState({ hoteis: h, hoteisProcurados: h }));
    this.setState((st) => {
      return { ...st, selected: selectedPage };
    });
  };

  filtraNome = () => {
    if (this.state.filterNome < 0) {
      this.setState((st) => {
        return {
          ...st,
          filterNome: 1,
          hoteisProcurados: sortArray(this.state.hoteis, {
            by: "nome",
            order: "desc",
          }),
        };
      });
    } else {
      this.setState((st) => {
        return {
          ...st,
          filterNome: -1,
          hoteisProcurados: sortArray(this.state.hoteis, {
            by: "nome",
            order: "asc",
          }),
        };
      });
    }
  };

  filtraNomeIcone = () => {
    if (this.state.filterNome < 0) {
      return "fas fa-sort-alpha-down";
    } else {
      return "fas fa-sort-alpha-down";
    }
  };

  filtraEstrelas = () => {
    if (this.state.filterEstrelas < 0) {
      this.setState((st) => {
        return {
          ...st,
          filterEstrelas: 1,
          hoteisProcurados: sortArray(this.state.hoteisProcurados, {
            by: "estrelas",
            order: "desc",
          }),
        };
      });
    } else {
      this.setState((st) => {
        return {
          ...st,
          filterEstrelas: -1,
          hoteis: sortArray(this.state.hoteis, {
            by: "estrelas",
            order: "asc",
          }),
        };
      });
    }
  };

  filtraPoPesquisa = (e) => {
    let teste = [];
    let ht = [];
    let status = false;
    this.setState((st) => {
      return { ...st, hoteisProcurados: [] };
    });
    this.state.hoteis.forEach((element) => {
      Object.keys(element).forEach(function (item) {
        teste.push(element[item]);
      });

      teste.forEach((elem) => {
        console.log(elem);
        if (typeof elem === "string" || typeof elem == "number") {
          if (elem.toString().toLowerCase().includes(e.toLowerCase())) {
            if (ht.includes(element)) {
              return;
            }
            ht.push(element);
            status = true;
            return;
          }
          if (typeof elem == "object") {
            console.log("é um objeto");
          }
        }
      });

      teste = [];
    });
    this.setState((st) => {
      return { ...st, hoteisProcurados: ht };
    });
  };

  pesquisaComFilter = (hotel, chaves, quary) => {
    chaves.map((chave) => {
      if (typeof hotel[chave] == "string" || typeof hotel[chave] == "number") {
      }
    });
  };
  valuePesquisa = (e) => {
    this.setState(
      (st) => {
        return { ...st, pesquisa: e.target.value };
      },
      () => this.filtraPoPesquisa(this.state.pesquisa)
    );
  };

  defineHoteis = () => {
    if (this.state.hoteisProcurados.length > 0) {
      {
        this.state.hoteisProcurados.map((hotel) => <Hotel hotel={hotel} />);
      }
    } else {
      {
        this.state.hoteis.map((hotel) => <Hotel hotel={hotel} />);
      }
    }
  };

  render() {
    return (
      <div className="backgroundBranco">
        <h1>Listagem de Hoteis</h1>
        <br />
        <div>
          <input
            name="pesquisa"
            type="text"
            id="pesquisa"
            value={this.state.pesquisa}
            onChange={this.valuePesquisa}
          ></input>
        </div>
        <div id="div-filtros">
          <i></i>
          <button onClick={this.filtraNome} className="filtrosLi">
            Nome
          </button>
          <button className="filtrosLi" onClick={this.filtraEstrelas}>
            Estrelas
          </button>
        </div>

        <h3>
          {this.state.selected + 1}/{Math.ceil(this.state.elemCount / 15)}
        </h3>

        {this.state.hoteisProcurados.map((hotel) => (
          <Hotel hotel={hotel} />
        ))}

        <ReactPaginate
          containerClassName={"pagination"}
          previousLabel={"Anterior"}
          nextLabel={"Proximo"}
          pageCount={Math.ceil(this.state.elemCount / 15)}
          onPageChange={this.handlePageClick}
        />
      </div>
    );
  }
}
export default listagemHoteis;
