import React from 'react'

class Input extends React.Component{
    constructor(){
        super()
    
        this.state = {
          
            destino : '',
            checkIn : '',
            checkOut : '',
            nDeAdultos: 0,
            nDeCriancas: 0,
            nDeQuartos: 0,
        }
      }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.cadastraBusca(this.state)
        
    }

    render(){
        return(
            <form>
                <label>Qual o seu destino?</label><br/>
                <input name="destino" id="destino" onChange={this.handleChange} value={this.state.destino}></input><br/><br/>
                <div id="check">
                  <div>
                    <label >Check-In:</label><br/>
                    <input name="checkIn" className="checka" onChange={this.handleChange} value={this.state.checkIn}></input>

                  </div>
                  <div>
                    <label>Check-Out:</label><br/>
                    <input name="checkOut" className="checka" onChange={this.handleChange} value={this.state.checkOut}></input>

                  </div>

                </div><br/>
                <div id="qtd">
                  <div>
                    <label>Nº de adultos:</label><br/>
                    <input name="nDeAdultos" type="number" min="0" className="qtda" onChange={this.handleChange} value={this.state.nDeAdultos}></input>
                  </div>
                  <div>
                    <label>Nº de Crianças:</label><br/>
                    <input name="nDeCriancas" type="number" min="0" className="qtda" onChange={this.handleChange} value={this.state.nDeCriancas}></input>
                  </div>
                  <div>
                    <label>Nº de Quartos:</label><br/>
                    <input name="nDeQuartos" type="number" min="0" className="qtda" onChange={this.handleChange} value={this.state.nDeQuartos}></input>
                  </div>

                </div><br/><br/>
                <button id="btn-buscar" onClick={this.handleClick}>Buscar</button>

              </form>
        )
    }
}

export default Input;