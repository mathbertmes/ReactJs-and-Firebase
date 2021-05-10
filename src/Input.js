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

    render(){
        return(
            <form>
                <label className="branco">Qual o seu destino?</label><br/>
                <input name="destino" id="destino" onChange={this.handleChange} value={this.state.destino}></input><br/><br/>
                <div id="check">
                  <div>
                    <label className="branco">Check-In:</label><br/>
                    <input name="checkIn" className="checka" onChange={this.handleChange} value={this.state.checkIn}></input>

                  </div>
                  <div>
                    <label className="branco">Check-Out:</label><br/>
                    <input name="checkOut" className="checka" onChange={this.handleChange} value={this.state.checkOut}></input>

                  </div>

                </div><br/>
                <div id="qtd">
                  <div>
                    <label className="branco">Nº de adultos:</label><br/>
                    <input name="nDeAdultos" type="number" className="qtda" onChange={this.handleChange} value={this.state.nDeAdultos}></input>
                  </div>
                  <div>
                    <label className="branco">Nº de Crianças:</label><br/>
                    <input name="nDeCriancas" type="number" className="qtda" onChange={this.handleChange} value={this.state.nDeCriancas}></input>
                  </div>
                  <div>
                    <label className="branco">Nº de Quartos:</label><br/>
                    <input name="nDeQuartos" type="number" className="qtda" onChange={this.handleChange} value={this.state.nDeQuartos}></input>
                  </div>

                </div><br/>
                <button id="btn-buscar">Buscar</button>

              </form>
        )
    }
}

export default Input;