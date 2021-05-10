import React from 'react'

class Tabela extends React.Component{
    render = () => {
        const { buscas } = this.props
        return (
            <div>
                <table>
                    <tr>
                        <th>Destino</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Nº de adultos</th>
                        <th>Nº de crianças</th>
                        <th>Nº de quartos</th>
                    </tr>
                    
                    {buscas.map((busca) => {
                        <tr>
                            <td>{busca.destino}</td>
                            <td>{busca.checkIn}</td>
                            <td>{busca.checkOut}</td>
                            <td>{busca.nDeAdultos}</td>
                            <td>{busca.nDeCriancas}</td>
                            <td>{busca.nDeQuartos}</td>

                        </tr>
                    })}
                        
        
                    
                </table>
            </div>
        )
    }
}

export default Tabela;