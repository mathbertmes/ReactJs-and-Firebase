import React from 'react'
import Hotel from './Hotel'
import ReactPaginate from "react-paginate";
import './paginate.css'
import firebase from "./firebase";
import sortArray from 'sort-array'




class listagemHoteis extends React.Component{

    constructor(){
        super()
        this.state = {
            hoteis: [],
            hoteisProcurados : [],
            pageCont  : 1,
            selected : 0,
            filterNome : -1,
            filterEstrelas : -1,
            pesquisa : ''

        }
    }

    componentDidMount(){
        this.props.pegaHoteis().then((h)=>this.setState({hoteis : h, hoteisProcurados : h}))
        firebase.firestore().collection("configHoteis").doc("hCwGAgOZcSV8qQCTDdbR").get().then((h) => this.setState((st) => {return {...st,elemCount : h.data().qtdDocumentos}}))
        
        this.setState((st) =>{
            return {...st,pageCont : Math.ceil(this.state.elemCount / 15)}})
        

        
        
    }
    avanca =() =>{
        this.props.pegaHoteis().then((h)=>this.setState({hoteis : h}))
        console.log("Trocou")
    }

       
    handlePageClick = ({ selected: selectedPage })=> {
        this.props.pegaHoteis(selectedPage).then((h)=>this.setState({hoteis : h, hoteisProcurados : h}))
        this.setState((st) => {
            return {...st, selected : selectedPage}
      })}

    filtraNome = () => {
        if(this.state.filterNome < 0){
            this.setState((st) => {
                return {...st, filterNome : 1 ,hoteisProcurados : sortArray(this.state.hoteis, {
                    by: 'nome',
                    order: 'desc'
                })}
                
            })
        }else{
            this.setState((st) => {
                return {...st, filterNome : -1 ,hoteisProcurados : sortArray(this.state.hoteis, {
                    by: 'nome',
                    order: 'asc'
                })}
                
            })
        }
        
    }
    filtraEstrelas = () => {
        if(this.state.filterEstrelas < 0){
            this.setState((st) => {
                return {...st, filterEstrelas : 1,hoteisProcurados : sortArray(this.state.hoteisProcurados, {
                    by: 'estrelas',
                    order: 'desc'
                })}
                
            })
        }else{
            this.setState((st) => {
                return {...st, filterEstrelas : -1,hoteis : sortArray(this.state.hoteis, {
                    by: 'estrelas',
                    order: 'asc'
                })}
                
            })
        }
    }

    
    

    filtraPoPesquisa = (e) => {
        let teste = []
        let ht = []
        let status = false
        this.setState((st) => {
            return {...st, hoteisProcurados : []}
        })
        this.state.hoteis.forEach(element => {
            Object.keys(element).forEach(function(item){
                teste.push(element[item]);

            })
            
        
            teste.forEach(elem => {
                if(typeof elem === "string"){
                    if(elem.includes(e)){
                        if(ht.includes(element)){
                            return
                        }
                        ht.push(element)
                        status = true
                        return
                            
                    }
                }
                    
                });
            
            
            teste = []
        });
        this.setState((st) => {
            return {...st, hoteisProcurados : ht}
        })
        
    }

    valuePesquisa = (e) => {
        this.setState((st) => {
            return {...st, pesquisa : e.target.value}
        },() => this.filtraPoPesquisa(this.state.pesquisa))
        
    }

    defineHoteis = () => {
        if(this.state.hoteisProcurados.length >0){
            {this.state.hoteisProcurados.map((hotel) => <Hotel hotel={hotel}/>)}
        }else{
            {this.state.hoteis.map((hotel) => <Hotel hotel={hotel}/>)}
        }
    }

    render(){
        return(

            
            <div className="backgroundBranco">
                <h1>Listagem de Hoteis</h1><br/>
                <div>
                    <input name="pesquisa" type="text" id="pesquisa" value={this.state.pesquisa} onChange={this.valuePesquisa}></input>
                    
                </div>
                <div>
                <button onClick={this.filtraNome}>Nome</button>
                <button onClick={this.filtraEstrelas}>Estrelas</button>
                </div>
                
                <h3>{this.state.selected+1}/{Math.ceil(this.state.elemCount / 15)}</h3>
               
                {this.state.hoteisProcurados.map((hotel) => <Hotel hotel={hotel}/>)}
                
                
                
                <ReactPaginate 
                containerClassName={"pagination"} 
                previousLabel={"Anterior"} 
                nextLabel={"Proximo"}
                pageCount={Math.ceil(this.state.elemCount / 15)}
                onPageChange={this.handlePageClick}/>
                
                
                
            </div>
        )
    }
}
export default listagemHoteis;