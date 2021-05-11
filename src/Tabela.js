import React from 'react'
import './App.css';

class Tabela extends React.Component{

    remove =  (id) =>{
        this.props.removeDocumento(id)
    }

    render = () => {
        const { buscas } = this.props
        return (
            <div>
                <table id="tabela">
                    <tr className="componentes">
                        <th >Destino</th>
                        <th className="componenetesTabela">Check-In</th>
                        <th className="componenetesTabela">Check-Out</th>
                        <th className="componenetesTabela">Nº de adultos</th>
                        <th className="componenetesTabela">Nº de crianças</th>
                        <th className="componenetes">Nº de quartos</th>
                        <th className="componenetes">Excluir</th>
                    </tr>
                    
                    {buscas.map((busca) => (
                        <tr className="componentes">
                            <td className="componenetesTabela">{busca.destino}</td>
                            <td className="componenetesTabela">{busca.checkIn}</td>
                            <td className="componenetesTabela">{busca.checkOut}</td>
                            <td className="componenetesTabela">{busca.nDeAdultos}</td>
                            <td className="componenetes">{busca.nDeCriancas}</td>
                            <td className="componenetes">{busca.nDeQuartos}</td>
                            <td> <i className="fas fa-trash-alt" onClick={() => this.remove(busca.id)}></i></td>

                        </tr>
                    ))}
                        
        
                    
                </table>
            </div>
        )
    }
}

export default Tabela;