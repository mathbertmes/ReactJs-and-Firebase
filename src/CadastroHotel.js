import React from 'react'
import "./CadastroHotel.css";
import StarRatingComponent from 'react-star-rating-component';
import firebase from "./firebase";

class cadastroHotel extends React.Component{

    constructor(){
        super()
        this.state = {
            estrelas : 1,
            cnpj : '',
            descricao : '',
            localizacao : {
                cidade : '',
                estado : '',
                endereco : '',
                pais : ''
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

    /*cadastraHotel = (hotel) => {
        var novaBusca = { ...busca, id: uuidv4() };
    
        this.setState(
          (stat) => {
            return { buscas: [...stat.buscas, novaBusca] };
          },
          () => {
            this.adicionaDocumento(novaBusca);
            console.log("Busca cadsatrada");
          }
        );
      };*/

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
                        <input name='cnpj' onChange={this.handleChange} className="inputsTextSmall"></input>
                    </div>
                    <div>
                        <label>Telefone:</label><br/>
                        <input name='telefone'  onChange={this.handleChange} className="inputsTextSmall"></input>
                    </div>
                    <div id="estrelas">
                        <label>Estrelas:</label><br/>
                        <StarRatingComponent 
                        name="estrela" 
                        starCount={5}
                        value={this.estrelas}
                        onStarClick={this.onStarClick.bind(this)}
                        />
                        
                        
                    </div>

                </div>


                <div className="camposJuntos">
                    <div>
                        <label>Nome do hotel:</label><br/>
                        <input name="nome"  onChange={this.handleChange} className="inputsTextBig"></input>
                    </div>
                    <div>
                        <label>Endereço:</label><br/>
                        <input name="endereco"  onChange={this.handleChange} className="inputsTextBig"></input>
                    </div>

                </div>

                <div className="camposJuntos">
                    <div>
                        <label>Cidade:</label><br/>
                        <input name="cidade" onChange={this.handleChangelocal} className="inputsTextSS"></input>
                    </div>

                    <div>
                        <label>Estado:</label><br/>
                        <select name="estado" onChange={this.handleChangelocal} className="selects">
                        {estados.map((hotel) => <option value={hotel}>{hotel}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>País:</label><br/>
                        <select name="pais" onChange={this.handleChangelocal} className="selects">
                        {paises.map((hotel) => <option value={hotel}>{hotel}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>Bairro:</label><br/>
                        <input name="bairro" onChange={this.handleChangelocal} className="inputsTextSS"></input>
                    </div>

                    <div>
                        <label>Rua:</label><br/>
                        <input name="rua" onChange={this.handleChangelocal} className="inputsTextSS"></input>
                    </div>

                </div>


                <div className="camposJuntos">
                    <div>
                        <label>Descrição:</label><br/>
                        <textarea  onChange={this.handleChange} name="descricao" className="textArea"></textarea>
                    </div>
                    

                </div>
                <label>Comodidades:</label><br/>
                <div className="camposJuntos">
                    
                        
                        <div>
                            <input checked={this.state.comodidades.piscina} onChange={this.handleChangeComodidades} name="piscina" type="checkbox" class="checkbox"></input>
                            <label> Piscina</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.spa} onChange={this.handleChangeComodidades} name="spa" type="checkbox" class="checkbox"></input>
                            <label> Spa</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.wifi} onChange={this.handleChangeComodidades} name="wifi" type="checkbox" class="checkbox"></input>
                            <label> Wi-Fi</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.academia} onChange={this.handleChangeComodidades} name="academia" type="checkbox" class="checkbox"></input>
                            <label> Academia</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.bar} onChange={this.handleChangeComodidades} name="bar" type="checkbox" class="checkbox"></input>
                            <label> Bar</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.playground} onChange={this.handleChangeComodidades} name="playground" type="checkbox" class="checkbox"></input>
                            <label> Playground</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.cafeDaManha} onChange={this.handleChangeComodidades} name="cafeDaManha" type="checkbox" class="checkbox"></input>
                            <label> Café da manã</label>
                        </div>
                        <div>
                            <input checked={this.state.comodidades.servicoDeQuarto} onChange={this.handleChangeComodidades} name="servicoDeQuarto" type="checkbox" class="checkbox"></input>
                            <label> Serviço de quarto</label>
                        </div>

                </div>

                <div className="camposJuntos">
                    <div>
                        <button id="botaoCadastrar">Cadastrar</button>
                    </div>
                    

                </div>

                
                    
                </div>
            </div>
        )
    }
}

export default cadastroHotel;