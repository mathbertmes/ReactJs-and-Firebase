import React from 'react'


class Hotel extends React.Component{
    render(){
        return(
            <div className="hotel">
                <div>
                <img className="imgHotel" src="transferir.jpg"/>
                </div>
                <div>
                    <h2>{this.props.hotel.nome}</h2><br/>
                    <h4>{this.props.hotel.Cidade}</h4>
                    <h4>Avaliação: {this.props.hotel.estrelas} </h4>
                    <h4>Contato: {this.props.hotel.telefone}</h4>
                    <h4>{this.props.hotel.index}</h4>
                </div>
            </div>
        )
    }
}
export default Hotel;