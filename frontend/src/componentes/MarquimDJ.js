import { useState } from 'react';
import ListaBanners from './ListaBanners.js';

export default function MarquimDJ() {

    const [Mensagem, setMensagem] = useState();
    const [Titulo, setTitulo] = useState();
    const [Data, setData] = useState();
    const [Lembrete, setLembrete] = useState([]);

    function enviarValidar(e) {
        e.preventDefault()
        let novo = { Mensagem: Mensagem, Titulo: Titulo, Data: Data }
        setLembrete([...Lembrete, novo])
    }


    function mensagemAlterar(e) {
        setMensagem(e.target.value)
    }
    function tituloAlterar(e) {
        setTitulo(e.target.value)
    }
    function dataAlterar(e) {
        setData(e.target.value)
    }

    return (
        <div className='componente1'>
            <div className='form'>
                <form className="formMensagem" onSubmit={enviarValidar}>
                    <label className='Mensagem'>
                       <div className='Tites'>Mensagem:</div> 
                        <textarea id="Men" type="text" name="mensagem" value={Mensagem} onChange={mensagemAlterar} />
                    </label>

                    <label className='titulo'>
                        Titulo:
                        <input id="tit" type="text" name="titulo" value={Titulo} onChange={tituloAlterar} />
                    </label>

                    <label className='data'>
                        Data:
                        <input type="date" name="data" value={Data} onChange={dataAlterar} />
                    </label>
                    <button className='button' type="submit" value="Enviar" onClick={enviarValidar}>Enviar</button>
                </form>
            </div>

            <ListaBanners conteudo={Lembrete} />
        </div>
    );
}
