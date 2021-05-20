import React from 'react'
import firebase from "./firebase";

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

    adicionaDocumentoBusca = (busca) => {
      firebase.firestore().collection("Busca").add(busca);
      this.setState( {
          
        destino : '',
        checkIn : '',
        checkOut : '',
        nDeAdultos: 0,
        nDeCriancas: 0,
        nDeQuartos: 0,
    } )};

    cadastraBusca = (busca) => {
    this.adicionaDocumentoBusca(busca);
    
    }
      



    handleClick = (event) => {
        event.preventDefault();
        this.cadastraBusca(this.state)
        
    }

    render(){
        return(
          <div id="area-principal">

          
          
            <div id="pesquisaGeral">

            
            <form id="area-formulario">
            <h1 id="headerPesquisa">Escolha seu destino</h1><br/>
            <div>
                <label>Qual o seu destino?</label><br/>
                <input  name="destino" id="destino" onChange={this.handleChange} value={this.state.destino}></input><br/><br/>
                <div id="check">
                  <div>
                    <label >Check-In:</label><br/>
                    <input type="date" name="checkIn" className="checka" onChange={this.handleChange} value={this.state.checkIn}></input>

                  </div><br/>
                  <div>
                    <label>Check-Out:</label><br/>
                    <input type="date" name="checkOut" className="checka" onChange={this.handleChange} value={this.state.checkOut}></input>

                  </div><br/>

                </div>
                <div id="qtd">
                  <div id ="teste">
                    <label>Nº de adultos:</label><br/>
                    <input name="nDeAdultos" type="number" min="0" className="qtda" onChange={this.handleChange} value={this.state.nDeAdultos}></input>
                  </div><br/>
                  <div>
                    <label>Nº de Crianças:</label><br/>
                    <input name="nDeCriancas" type="number" min="0" className="qtda" onChange={this.handleChange} value={this.state.nDeCriancas}></input>
                  </div><br/>
                  <div>
                    <label>Nº de Quartos:</label><br/>
                    <input name="nDeQuartos" type="number" min="0" className="qtda" onChange={this.handleChange} value={this.state.nDeQuartos}></input>
                  </div><br/>

                </div>
                <button id="btn-buscar" onClick={this.handleClick}>Procurar</button>
                </div>

              </form>
            </div>
            <div className="exibicao">
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
          </div>
          
        )
    }
}

export default Input;