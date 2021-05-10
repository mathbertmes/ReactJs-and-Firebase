import React from 'react'
import './App.css';
import Input from './Input'
import Tabela from './Tabela'




class App extends React.Component {

  constructor(){
    super()

    this.state = {
      buscas: [{destino : "nova york", checkIn : "19/04/22",checkOut:"25/04/22", nDeAdultos: 2, nDeCriancas:1, nDeQuartos:1}]
    }
  }

  cadastraBusca = (busca) => {
    this.setState(
      (stat) =>{
        return(
          {buscas: [...stat.buscas,{...busca}]}
        )
      }
    )
  }

  render(){
    return (
      <body>
        <div>
          <div className="cabeca">
            <p className="branco">HMAX</p>
          </div>

          <div id="area-principal">

            <div id="area-formulario">
              <Input cadastraBusca={this.cadastraBusca}/>

            </div>

            <div id="area-hoteis">
              <Tabela buscas={this.state.buscas}/>
            </div>

          </div>
            
        </div>
      </body>
    )};
}

export default App;

