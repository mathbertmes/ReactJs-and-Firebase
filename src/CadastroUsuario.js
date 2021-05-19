import React from 'react'
import './cadastraUsuario.css'


class CadastroUsuario extends React.Component{

    state = {
        email: "",
        senha: "",
      };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      handleClick = (e) => {
        e.preventDefault();
        this.setState({ email: "", senha: "" });
      };

    render(){
        return(
            <div id="principal">
                <div className="headerCadastraUsuario">
                    <h2>Cadastre-se</h2>
                </div>
                
                <form>
                    <label>Nome Completo:</label>
                    <br />
                    <input className="inputs"/>
                    <br />

                    <label>Email:</label>
                    <br/>
                    <input
                        className="inputs"
                        name="email"
                        value={this.state.email}
                        type="email"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Crie uma senha:</label>
                    <br />
                    <input
                        className="inputs"
                        name="senha"
                        value={this.state.senha}
                        type="password"
                        onChange={this.handleChange}
                    />
                    <br />

                    

                    <label>Repita sua senha:</label>
                    <br />
                    <input className="inputs"/>
                    <br />

                    <label>CPF:</label>
                    <br />
                    <input className="inputs"/>
                    <br />

                    <label>Telefone:</label>
                    <br />
                    <input className="inputs"/>
                    <br />

                    <a id="termos">Termos e condições</a>
                    <br/>
                    <input type="checkbox"></input>
                    <label> Eu concordo com os termos e condições</label>

                    <button id="botaoCad" onClick={this.handleClick}>Cadastre-se</button>
                </form>
            </div>
        )
    }
}

export default CadastroUsuario;