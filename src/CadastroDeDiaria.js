import React from 'react'
import './CadastroDeDiaria.css'


class CadastroDeDiaria extends React.Component{


    render() {
        return(
            <div id="cd-principal">
                <div id="cd-header">
                <h1>Cadastro de Diárias</h1>
                </div>

                <div className="cd-camposJuntos">
                    <div>
                        <label>Nome do quarto:</label><br/>
                        <input className="cd-inputsTextBig"></input>
                    </div>
                    <div>
                        <label>Valor:</label><br/>
                        <input className="cd-inputsTextBig"></input>
                    </div>

                </div><br/>
                <div id="cd-comodidadesGerais">
                    <div>
                        <input type="checkbox"></input>
                        <label> Café da manhã</label><br/>
                        <input type="checkbox"></input>
                        <label> Frigobar</label><br/>
                        <input type="checkbox"></input>
                        <label> Ar condicionado</label>
                    </div>

                    <div>
                        <input type="checkbox"></input>
                        <label> Café da manhã</label><br/>
                        <input type="checkbox"></input>
                        <label> Frigobar</label><br/>
                        <input type="checkbox"></input>
                        <label> Ar condicionado</label>
                    </div>

                    <div>
                        <label>Nº de camas:</label><br/>
                        <input id="cd-camas" type="number"></input>
                    </div>
                    <div>
                        <label>M²:</label><br/>
                        <input className="cd-inputsTextSmall "></input>
                    </div>

                </div>

                <button id="cd-botaoEntrar">Cadastrar</button>
                
            </div>
        )
    }
}

export default CadastroDeDiaria;