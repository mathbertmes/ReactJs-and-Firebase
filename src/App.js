import React, { useReducer } from "react";
import "./App.css";
import Input from "./Input";
import Tabela from "./Tabela";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import Login from "./login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cabecalho from "./Header";
import CadastraHotel from "./CadastroHotel";
import Hoteis from "./listagemHoteis";
import CadastraUsuario from "./CadastroUsuario";
import CadastroDeDiaria from "./CadastroDeDiaria";
import Perfil from "./Perfil";
import MeusHoteis from "./MeusHoteis";
import HoteisIndividuais from "./HoteisIndividuais";
import Hotel from "./Hotel";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      buscas: [],
      last: {},
      first: {},
      isLogged: false,
      user: {},
      hoteisDoUsuario: [],
    };
  }

  leHoteisCadastro = () => {
    firebase
      .firestore()
      .collection("Usuarios")
      .doc(this.state.user.id)
      .get()
      .then((snapshot) => {
        const user = { ...snapshot.data(), id: snapshot.id };
        this.setState({ isLogged: true, user: user, hoteisDoUsuario: [] });
        console.log(this.state);
      })
      .then(this.leHoteis);
  };
  leHoteis = () => {
    console.log(this.state.user.idsHoteis);
    this.state.user.idsHoteis.map((hotel) =>
      firebase
        .firestore()
        .collection("Hoteis")
        .doc(hotel)
        .get()
        .then((h) =>
          this.setState((st) => {
            return {
              hoteisDoUsuario: [
                ...st.hoteisDoUsuario,
                { ...h.data(), id: h.id },
              ],
            };
          })
        )
        .then(() => {})
        .catch((e) => console.log(e))
    );
  };

  alteraUsuario = (name, value) => {
    this.setState((st) => {
      return { user: { ...st.user, [name]: value } };
    });
  };

  alteraNomeBanco = () => {
    firebase
      .firestore()
      .collection("Usuarios")
      .where("cpf", "==", this.state.user.cpf)
      .get()
      .then((snapshot) => {
        const userId = snapshot.docs[0].id;
        console.log(userId);
        firebase
          .firestore()
          .collection("Usuarios")
          .doc(userId)
          .update(this.state.user)
          .then(() => {
            alert("Usuario atualizado com sucesso!");
          });
      });
  };

  logaAuth = (email, senha) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        var user = userCredential.user;
        firebase
          .firestore()
          .collection("Usuarios")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const user = { ...snapshot.data(), id: snapshot.id };
            this.setState({ isLogged: true, user: user });
          })
          .then(this.leHoteis);

        // ...
      })
      .then(() => {
        console.log("Logado com sucesso!");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Usuario Não Cadastrado");
      });
  };

  loga = (email, senha) => {
    firebase
      .firestore()
      .collection("Usuarios")
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((u) => u.data());

        users.forEach((element) => {
          if (email == element["email"] && senha == element["senha"]) {
            console.log("LOGOU");
            firebase
              .firestore()
              .collection("Usuarios")
              .where("email", "==", email)
              .get()
              .then((snapshot) => {
                const user = snapshot.docs[0].data();
                this.setState({ isLogged: true, user: user });
                console.log(this.state);
              })
              .then(this.leHoteis)
              .then(console.log(this.state.hoteisDoUsuario));
          }
        });
      });
  };

  sair = () => {
    this.setState({
      isLogged: false,
      user: {},
      last: {},
      first: {},
      isLogged: false,
      hoteisDoUsuario: [],
    });
  };

  cadastraUsuario = (email, password, user) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var userId = userCredential.user.uid;
        console.log("Usuario cadastrado! Bem vindo " + user);
        let userCorrect = user;
        delete userCorrect.senha;
        delete userCorrect.confirmacao;

        firebase
          .firestore()
          .collection("Usuarios")
          .doc(userId)
          .set(userCorrect);
        // ...
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert("errorMessage");
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
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001/",
      },
    };

    axios
      .get(
        "https://us-central1-teste-5b3a5.cloudfunctions.net/HoteisJson?method=get"
      )
      .then((h) => console.log(h.data));
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

  getHoteis = async (pg = 1) => {
    if (Object.keys(this.state.first).length === 0) {
      return await firebase
        .firestore()
        .collection("Hoteis")
        .orderBy("index")
        .limit(5)
        .get()
        .then((snapshot) => {
          const hoteis = snapshot.docs.map((ht) => ht.data());
          const lastHotel = hoteis[hoteis.length - 1];
          const firstHotel = hoteis[0];
          console.log(lastHotel);
          console.log(firstHotel);
          this.setState({ last: lastHotel });
          this.setState({ first: firstHotel });
          return hoteis;
        })
        .catch(() => console.log("Não foi possivel efetuar a busca"));
    } else {
      return await firebase
        .firestore()
        .collection("Hoteis")
        .orderBy("index")
        .startAfter(pg * 5)
        .limit(5)
        .get()
        .then((snapshot) => {
          const hoteis = snapshot.docs.map((ht) => ht.data());
          const lastHotel = hoteis[hoteis.length - 1];
          const firstHotel = hoteis[0];
          this.setState({ last: lastHotel });
          this.setState({ first: firstHotel });
          return hoteis;
        })
        .catch(() => console.log("Não foi possivel efetuar a busca"));
    }
  };

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
          <Cabecalho
            hoteisDoUsuario={this.state.hoteisDoUsuario}
            sair={this.sair}
            isLogged={this.state.isLogged}
          />
          <Switch>
            {!this.state.isLogged && (
              <Route path="/login">
                <div>
                  <Login loga={this.logaAuth} />
                </div>
              </Route>
            )}

            {this.state.isLogged && this.state.hoteisDoUsuario.length > 0 && (
              <Route path="/meus-hoteis">
                <div>
                  <MeusHoteis
                    hoteisDoUsuario={this.state.hoteisDoUsuario}
                    user={this.state.user}
                  />
                </div>
              </Route>
            )}

            <Route path="/hoteis">
              <div>
                <Hoteis pegaHoteis={this.getHoteis} />
              </div>
            </Route>

            {this.state.isLogged && (
              <Route path="/perfil">
                <div>
                  <Perfil
                    alteraNomeBanco={this.alteraNomeBanco}
                    alteraUsuario={this.alteraUsuario}
                    user={this.state.user}
                  />
                </div>
              </Route>
            )}

            {!this.state.isLogged && (
              <Route path="/cadastro-usuario">
                <div>
                  <CadastraUsuario cadastra={this.cadastraUsuario} />
                </div>
              </Route>
            )}

            {this.state.isLogged && (
              <Route path="/cadastro-hoteis">
                <div>
                  <CadastraHotel
                    leHoteisCadastro={this.leHoteisCadastro}
                    user={this.state.user}
                  />
                </div>
              </Route>
            )}

            {this.state.isLogged &&
              this.state.hoteisDoUsuario.length > 0 &&
              this.state.hoteisDoUsuario.map((hotel) => {
                console.log(hotel);
                return (
                  <Route path={`/${hotel.id}/meus-hoteis`}>
                    <div>
                      <HoteisIndividuais hotel={hotel} />
                    </div>
                  </Route>
                );
              })}

            {this.state.isLogged &&
              this.state.hoteisDoUsuario.length > 0 &&
              this.state.hoteisDoUsuario.map((hotel) => {
                console.log(hotel);
                return (
                  <Route path={`/cadastro-de-diarias/${hotel.id}`}>
                    <div>
                      <CadastroDeDiaria idHotel={hotel.id} />
                    </div>
                  </Route>
                );
              })}

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
