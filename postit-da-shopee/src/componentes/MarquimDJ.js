import { useState } from 'react';
import Fila from './Fila';

export default function MarquimDJ(){
    
    const [Mensagem, setMensagem] = useState();
    const [Titulo, setTitulo] = useState();
    const [Data, setData] = useState();
    const [Lembrete, setLembrete] = useState([]);

    function enviarValidar(e){
        e.preventDefault()
        let novo = {Mensagem: Mensagem, Titulo: Titulo, Data: Data} 
        setLembrete([...Lembrete,novo])
        window.alert(Mensagem)
    }


    function mensagemAlterar(e){
        setMensagem(e.target.value)
    }
    function tituloAlterar(e){
        setTitulo(e.target.value)
    }
    function dataAlterar(e){
        setData(e.target.value)
    }

    return(
        
        <div className='container'>
                    <form className="formMensagem" onSubmit={enviarValidar}>
            <label>
                Mensagem:
                <input type="text" name="mensagem" value= {Mensagem} onChange={mensagemAlterar}/>
            </label>

            <label>
                titulo:
                <input type="text" name="titulo" value={Titulo} onChange={tituloAlterar} />
            </label>

            <label>
                data:
                <input type="date" name="data" value={Data} onChange={dataAlterar}/>
            </label>
            <button type="submit" value= "Enviar" onClick={enviarValidar}>Enviar</button>


        </form> 

        <div>
        <Fila conteudo={Lembrete}></Fila>
        </div>

        </div>
    );
}
