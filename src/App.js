import React, { useReducer } from "react";
import "./App.css";
import Input from "./Input";
import Tabela from "./Tabela";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import Login from "./login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cabecalho from "./Header";
import CadastraHotel from "./CadastroHotel"
import Hoteis from "./listagemHoteis"
import CadastraUsuario from './CadastroUsuario'
import CadastroDeDiaria from './CadastroDeDiaria'
import Perfil from './Perfil'


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      buscas: [],
      last : {},
      first : {},
      isLogged : false,
      user : {}
    };
  }

  alteraUsuario = (name,value) =>{
    this.setState((st) =>{ return {user : {...st.user,[name] : value}}})
  }

  alteraNomeBanco = () =>{
    firebase.firestore().collection("Usuarios").where("cpf", "==", this.state.user.cpf).get()
    .then((snapshot) => { 
      const userId = snapshot.docs[0].id
      console.log(userId)
      firebase.firestore().collection("Usuarios").doc(userId).update(this.state.user)
      .then(()=> {alert("Usuario atualizado com sucesso!")})
  })}

  loga = (email, senha) =>{
    firebase.firestore().collection("Usuarios").get().then((snapshot) => {
      const users =  snapshot.docs.map((u) => u.data())
      
      users.forEach(element => {
        if(email == element["email"] && senha == element["senha"]){
          console.log("LOGOU")
          firebase.firestore().collection("Usuarios").where("email", "==", email).get()
          .then((snapshot)=>{
            const user = snapshot.docs[0].data()
            this.setState({isLogged : true, user : user})
            console.log(this.state)
            
            
          })

        }

        })
        
      });
  }

  sair = () =>{
    this.setState({isLogged : false, user : {}})

  }

  cadastraUsuario = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Usuario cadastrado! Bem vindo " + user);
        // ...
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  adicionaDocumento = (busca) => {
    firebase.firestore().collection("Busca").doc(busca.id).set(busca);
  };

  adicionaDocumentoHoteis = (hotel) => {
    firebase.firestore().collection("Hoteis").add(hotel);
  };

  lerBanco = async () => {
    const snapshot = await firebase.firestore().collection("Busca").get();
    return snapshot.docs.map((doc) => doc.data());
  };

  componentDidMount() {
    this.lerBanco()
      .then((buscas) => this.setState({ buscas }))
      .catch((erro) => console.log(erro));
  }

  removeDoc = (id) => {
    firebase
      .firestore()
      .collection("Busca")
      .doc(id)
      .delete()
      .then(() => console.log("Busca deletada com sucesso!"))
      .catch((erro) => console.log(erro));
  };

  /*getHoteis = async () =>{
    
    return await firebase.firestore().collection("Hoteis").orderBy("nome").get().then((snapshot)=>{
      const hoteis = snapshot.docs.map((ht) => ht.data())
      return hoteis
    }).catch(()=> console.log("Não foi possivel efetuar a busca"))

  }*/


  getHoteis = async (pg = 1) =>{
    if(Object.keys(this.state.first).length === 0){
      return await firebase.firestore().collection("Hoteis").orderBy("index").limit(15).get().then((snapshot)=>{
        const hoteis = snapshot.docs.map((ht) => ht.data())
        const lastHotel = hoteis[hoteis.length-1]
        const firstHotel = hoteis[0]
        console.log(lastHotel)
        console.log(firstHotel)
        this.setState({last : lastHotel})
        this.setState({first : firstHotel})
        return hoteis
      }).catch(()=> console.log("Não foi possivel efetuar a busca"))
      
    }else{
      return await firebase.firestore().collection("Hoteis").orderBy("index").startAfter(pg * 15).limit(15).get().then((snapshot)=>{
        const hoteis = snapshot.docs.map((ht) => ht.data())
        const lastHotel = hoteis[hoteis.length-1]
        const firstHotel = hoteis[0]
        this.setState({last : lastHotel})
        this.setState({first : firstHotel})
        return hoteis
      }).catch(()=> console.log("Não foi possivel efetuar a busca"))
    }
    
  }

  removeDocumento = (id) => {
    this.setState(
      (state) => {
        return {
          buscas: state.buscas.filter((b) => b.id !== id),
        };
      },
      () => {
        this.removeDoc(id);
      }
    );
  };

  cadastraBusca = (busca) => {
    var novaBusca = { ...busca, id: uuidv4() };

    this.setState(
      (stat) => {
        return { buscas: [...stat.buscas, novaBusca] };
      },
      () => {
        this.adicionaDocumento(novaBusca);
        console.log("Busca cadastrada");
      }
    );
  };

  

  render() {
    return (
      <div>
        <Router>
          <Cabecalho sair={this.sair} isLogged={this.state.isLogged}/>
          <Switch>
            {!this.state.isLogged && <Route  path="/login">
              <div>
                <Login loga={this.loga} />
              </div>
            </Route>}
            {this.state.isLogged && <Route path="/cadastro-de-diarias">
              <div>
                <CadastroDeDiaria />
              </div>
            </Route>}

            <Route path="/hoteis">
              <div>
                <Hoteis pegaHoteis={this.getHoteis}/>
              </div>
            </Route>

            {this.state.isLogged  &&<Route path="/perfil">
              <div>
                <Perfil alteraNomeBanco={this.alteraNomeBanco} alteraUsuario={this.alteraUsuario} user={this.state.user}/>
              </div>
            </Route>}

            {!this.state.isLogged &&<Route path="/cadastro-usuario">
              <div>
                <CadastraUsuario/>
              </div>
            </Route>}

            {this.state.isLogged &&<Route path="/cadastro-hoteis">
              <div>
                <CadastraHotel />
              </div>
            </Route>}

            <Route path="/">
              <div>
                <Input cadastraBusca={this.cadastraBusca} />
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
