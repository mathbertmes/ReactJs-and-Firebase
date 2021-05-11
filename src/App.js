import React from 'react'
import './App.css';
import Input from './Input'
import Tabela from './Tabela'
import firebase from './firebase'
import {v4 as uuidv4 } from 'uuid'




class App extends React.Component {

  constructor(){
    super()

    this.state = {
      buscas: []
    }
  }

  adicionaDocumento = (busca) =>{
    firebase.firestore().collection('Busca').doc(busca.id).set(busca)
  
  }

  removeDocumento = (id) =>{
    this.setState(
      (state) => {
        return{
          buscas: state.buscas.filter((b) => b.id !==id)
        }
      }
    )
  }


  cadastraBusca = (busca) => {
    var novaBusca = {...busca,id:uuidv4()}

    this.setState(
      (stat) =>{
        return(
          {buscas: [...stat.buscas, novaBusca]}
        )
      },() => {
        this.adicionaDocumento(novaBusca)
        console.log("Busca cadsatrada")
      }
    )
  }

  render(){
    return (
      
        <div>
          <div className="cabeca">
            <p className="branco">HMAX</p>
          </div>

          <div id="area-principal">

            <div id="area-formulario">
              <Input cadastraBusca={this.cadastraBusca}/>

            </div>

            <div id="area-hoteis">
              <Tabela buscas={this.state.buscas} removeDocumento={this.removeDocumento}/>
            </div>

          </div>
            
        </div>
      
    )};
}

export default App;

