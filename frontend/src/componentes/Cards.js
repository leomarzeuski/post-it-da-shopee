import React from 'react';

export default function Cards(props) {
    let conteudo = props.conteudo
    let data = props.data

    return (
        conteudo.filter(x => x.Data === data).map(dados => {
            return (
                <div className='card'>
                    <h3 className='card-title'>{dados.Titulo}</h3>
                    <p className='card-msg'>{dados.Mensagem}</p>
                </div>
            )
        })
    )
}