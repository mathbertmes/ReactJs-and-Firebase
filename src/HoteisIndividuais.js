import React from "react";
import "./hoteisIndividuais.css";

class HoteisIndividuais extends React.Component {
  render() {
    return (
      <div id="hi-telaPrincipal">
        <div className="hi-elementosJuntos">
          <div>
            <label className="hi-label">Nome do Hotel: </label>
            {this.props.hotel.nome}
            <button className="hi-pen">
              <i class="fas fa-pen"></i>
            </button>
          </div>
          <div>
            <label className="hi-label">Telefone: </label>
            {this.props.hotel.telefone}
            <button className="hi-pen">
              <i class="fas fa-pen"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HoteisIndividuais;
