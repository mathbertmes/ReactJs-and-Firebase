import React from 'react'
import "./CadastroHotel.css";
import StarRatingComponent from 'react-star-rating-component';
import firebase from "./firebase";

class cadastroHotel extends React.Component{

    constructor(){
        super()
        this.state = {
            status : false,
            index : 0,
            estrelas : 1,
            cnpj : '',
            descricao : '',
            localizacao : {
                cidade : '',
                estado : '',
                endereco : '',
                rua : '',
                pais : '',
                bairro : ''
            },
            nome : '',
            telefone : '',
            comodidades : {
                academia : false,
                bar : false,
                cafeDaManha:false,
                piscina : false,
                playground : false,
                servicoDeQuarto : false,
                spa : false,
                wifi : false


            }       
        }
    }

    adicionaDocumentoHoteis = (hotel) => {
        firebase.firestore().collection("Hoteis").add(hotel);
      };

    cadastraHotel = (hotel) => {
        firebase.firestore().collection("configHoteis").doc("hCwGAgOZcSV8qQCTDdbR").get()
        .then((h) => this.setState((st) => {
            return {...st,index : h.data().qtdDocumentos + 1, status : true}}, () => {
            this.adicionaDocumentoHoteis(this.state)
            console.log("Hotel cadastrado")
        })).then(()=>firebase.firestore().collection("configHoteis").doc("hCwGAgOZcSV8qQCTDdbR").get())
        .then((h) => {firebase.firestore().collection("configHoteis").doc("hCwGAgOZcSV8qQCTDdbR").update({qtdDocumentos : h.data().qtdDocumentos + 1})})
        .then(() => {
            this.setState({
                status : false,
                index : 0,
                estrelas : 1,
                cnpj : '',
                descricao : '',
                localizacao : {
                    cidade : '',
                    estado : '',
                    endereco : '',
                    rua : '',
                    pais : '',
                    bairro : ''
                },
                nome : '',
                telefone : '',
                comodidades : {
                    academia : false,
                    bar : false,
                    cafeDaManha:false,
                    piscina : false,
                    playground : false,
                    servicoDeQuarto : false,
                    spa : false,
                    wifi : false
    
    
                }       
            })
        })
      };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangelocal = (event) => {
        this.setState((st) =>{ return {localizacao : {...st.localizacao,[event.target.name] : event.target.value}}})
    }

    handleChangeComodidades = (event) => {
        this.setState((st) =>{ return {comodidades : {...st.comodidades,[event.target.name] : event.target.checked}}})
    }

    handleClick = (event) => {
        event.preventDefault();
        this.cadastraHotel(this.state)
        
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({estrelas : nextValue});
      }

    render() {
        const estados = [
            'Acre',
            'Alagoas',
            'Amapá',
            'Amazonas',
            'Bahia',
            'Ceará',
            'Distrito Federal',
            'Espírito Santo',
            'Goiás',
            'Maranhão',
            'Mato Grosso',
            'Mato Grosso do Sul',
            'Minas Gerais',
            'Pará',
            'Paraíba',
            'Paraná',
            'Pernambuco',
            'Piauí',
            'Rio de Janeiro',
            'Rio Grande do Norte',
            'Rio Grande do Sul',
            'Rondônia',
            'Roraima',
            'Santa Catarina',
            'São Paulo',
            'Sergipe',
            'Tocantins',
          ];

          const paises = [
            'Argentina',
            'Brasil',
            'Uruguai',
            'Colombia',
            'Bolivia',
            'Paraguai',
            'Chile'
            
          ];
        return(
            <div id="telaPrincipal">
                <div id="headerCadastro">
                    <h1>Cadastre seu hotel</h1>
                </div>
                <div id="cadastroGeral">
                <div className="camposJuntos">
                    <div>
                        <label>CNPJ:</label><br/>
                        <input value={this.state.cnpj} name='cnpj' onChange={this.handleChange} className="inputsTextSmall"></input>
                    </div>
                    <div>
                        <label>Telefone:</label><br/>
                        <input value={this.state.telefone} name='telefone'  onChange={this.handleChange} className="inputsTextSmall"></input>
                    </div>
                    <div id="estrelas">
                        <label>Estrelas:</label><br/>
                        <StarRatingComponent 
                        name="estrela" 
                        starCount={5}
                        value={this.state.estrelas}
                        onStarClick={this.onStarClick.bind(this)}
                        />
                        
                        
                    </div>

                </div>


                <div className="camposJuntos">
                    <div>
                        <label>Nome do hotel:</label><br/>
                        <input name="nome" value={this.state.nome}  onChange={this.handleChange} className="inputsTextBig"></input>
                    </div>
                    <div>
                        <label>Endereço:</label><br/>
                        <input name="endereco" value={this.state.localizacao.endereco} onChange={this.handleChangelocal} className="inputsTextBig"></input>
                    </div>

                </div>

                <div className="camposJuntos">
                    <div>
                        <label>Cidade:</label><br/>
                        <input name="cidade" value={this.state.localizacao.cidade} onChange={this.handleChangelocal} className="inputsTextSS"></input>
                    </div>

                    <div>
                        <label>Estado:</label><br/>
                        <select name="estado" value={this.state.localizacao.estado} onChange={this.handleChangelocal} className="selects">
                        {estados.map((hotel) => <option value={hotel}>{hotel}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>País:</label><br/>
                        <select name="pais" value={this.state.localizacao.pais} onChange={this.handleChangelocal} className="selects">
                        {paises.map((hotel) => <option value={hotel}>{hotel}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Bairro:</label><br/>
                        <input name="bairro" value={this.state.localizacao.bairro} onChange={this.handleChangelocal} className="inputsTextSS"></input>
                    </div>

                    <div>
                        <label>Rua:</label><br/>
                        <input name="rua" value={this.state.localizacao.rua} onChange={this.handleChangelocal} className="inputsTextSS"></input>
                    </div>

                </div>


                <div className="camposJuntos">
                    <div>
                        <label>Descrição:</label><br/>
                        <textarea value={this.state.descricao}  onChange={this.handleChange} name="descricao" className="textArea"></textarea>
                    </div>
                    

                </div>
                <label>Comodidades:</label><br/>
                <div className="camposJuntos">
                    
                        
                        <div>
                            <input value={this.state.comodidades.piscina} checked={this.state.comodidades.piscina} onChange={this.handleChangeComodidades} name="piscina" type="checkbox" class="checkbox"></input>
                            <label> Piscina</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.spa} checked={this.state.comodidades.spa} onChange={this.handleChangeComodidades} name="spa" type="checkbox" class="checkbox"></input>
                            <label> Spa</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.wifi} checked={this.state.comodidades.wifi} onChange={this.handleChangeComodidades} name="wifi" type="checkbox" class="checkbox"></input>
                            <label> Wi-Fi</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.academia} checked={this.state.comodidades.academia} onChange={this.handleChangeComodidades} name="academia" type="checkbox" class="checkbox"></input>
                            <label> Academia</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.bar} checked={this.state.comodidades.bar} onChange={this.handleChangeComodidades} name="bar" type="checkbox" class="checkbox"></input>
                            <label> Bar</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.playground} checked={this.state.comodidades.playground} onChange={this.handleChangeComodidades} name="playground" type="checkbox" class="checkbox"></input>
                            <label> Playground</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.cafeDaManha} checked={this.state.comodidades.cafeDaManha} onChange={this.handleChangeComodidades} name="cafeDaManha" type="checkbox" class="checkbox"></input>
                            <label> Café da manã</label>
                        </div>
                        <div>
                            <input value={this.state.comodidades.servicoDeQuarto} checked={this.state.comodidades.servicoDeQuarto} onChange={this.handleChangeComodidades} name="servicoDeQuarto" type="checkbox" class="checkbox"></input>
                            <label> Serviço de quarto</label>
                        </div>

                </div>

                <div className="camposJuntos">
                    <div>
                        <button id="botaoCadastrar" onClick={this.handleClick}>Cadastrar</button>
                    </div>
                    

                </div>

                
                    
                </div>
            </div>
        )
    }
}

export default cadastroHotel;