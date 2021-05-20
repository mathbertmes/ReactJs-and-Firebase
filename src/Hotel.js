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
                    <h2 id="descricaoHotel">{this.props.hotel.descricao}</h2><br/>
                    <h2>{this.props.hotel.telefone}</h2><br/>
                    <h2>{this.props.hotel.localizacao.estado}</h2><br/>
                    
                </div>
            </div>
        )
    }
}
export default Hotel;