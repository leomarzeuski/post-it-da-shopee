import React from 'react';

export default function Fila ({conteudo}){
return(
    <ul>
        {conteudo.map(dados => {return <li>{dados.Mensagem} - {dados.Titulo}- {dados.Data}</li>} )}
    </ul>
)
}