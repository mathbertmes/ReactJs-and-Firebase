import React from "react";

class HotelCliente extends React.Component {
  handleClick = () => {
    this.props.selecionaHotel(this.props.hotel);
  };

  render() {
    return (
      <div className="hotel">
        <div>
          <img
            className="imgHotel"
            src="http://larlisa.com.br/wp-content/uploads/2019/01/sol-laralisa.png"
          />
        </div>
        <div>
          <h2>{this.props.hotel.nome}</h2>
          <br />
          <h2>{this.props.hotel.estrelas}</h2>
          <br />
          <h2>{this.props.hotel.localizacao.cidade}</h2>
          <br />
          <h2 id="descricaoHotel">{this.props.hotel.descricao}</h2>
          <br />
          <h2>{this.props.hotel.telefone}</h2>
          <br />
          <h2>{this.props.hotel.localizacao.estado}</h2>
          <br />
        </div>
        <button
          className="botaoVizualizaHotel"
          onClick={this.props.selecionaHotel.bind(this, this.props.hotel)}
        >
          Visualizar Hotel
        </button>
        <div></div>
      </div>
    );
  }
}
export default HotelCliente;
