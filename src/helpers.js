function filtraOcorrencias(paragrafo){
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
    //Object.keys obtém todas as chaves do objeto  
    //.filter irá filtrar os itens do array paragrafo que são maiores que um, ou seja, palavras que se repetem
    //arrow function busca as chaves que são maiores que um e devolve true para o filter, mantendo no array
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtraOcorrencias(paragrafo).join(', ');
        textoFinal += `palavras repeditas no paragrafo ${indice +1}: ${duplicadas} \n`
    });
    return textoFinal;
} 

export {montaSaidaArquivo};