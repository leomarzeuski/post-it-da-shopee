import { useState } from 'react';
import Cards from './Cards.js';

export default function ListaBanners({ conteudo }) {
    const [Data, setData] = useState(getFormatedDate());

    function getFormatedDate() {
        let dateNow = new Date(Date.now())

        return dateNow.toISOString().split("T")[0]
    }

    function dataAlterar(e) {
        setData(e.target.value)
    }

    return (

        <div className='lista-banner'>
            <div className='lista-header'>
                <h1 className='titulo'>Cards cadastrados!!</h1>

                <input type="date" name="filtroData" value={Data} onChange={dataAlterar} />
            </div>

            <div className='showList'>
                <Cards conteudo={conteudo} data={Data} />
            </div>
        </div>
    );
}