import logo from './logo.svg';
import './App.css';



function Cabeca(){
  return(
    <div className="cabeca">
      <p>Teste</p>
    </div>
  )
}

function App() {
  return (
    <body>
      <div>
        <div className="cabeca">
          <p className="branco">HMAX</p>
        </div>

        <div>

          <div id="area-formulario">
            <form>
              <label className="branco">Qual o seu destino?</label><br/>
              <input id="destino"></input><br/><br/>
              <div id="check">
                <div>
                  <label className="branco">Check-In:</label><br/>
                  <input className="checka"></input>

                </div>
                <div>
                  <label className="branco">Check-Out:</label><br/>
                  <input className="checka"></input>

                </div>

              </div><br/>
              <div id="qtd">
                <div>
                  <label className="branco">Nº de adultos:</label><br/>
                  <input type="number" className="qtda"></input>
                </div>
                <div>
                  <label className="branco">Nº de Crianças:</label><br/>
                  <input type="number" className="qtda"></input>
                </div>
                <div>
                  <label className="branco">Nº de Quartos:</label><br/>
                  <input type="number" className="qtda"></input>
                </div>

              </div>

            </form>

          </div>

        </div>
          
      </div>
    </body>
  );
}

export default App;

