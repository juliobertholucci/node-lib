export function contaPalavras(texto){ //exporta a função para todo o código
  const paragrafos = extraiParagrafos(texto);
  const contagem = paragrafos.flatMap((paragrafo) => { //realiza um filtro para cada espaço em branco, que são objetos vazios(flat) e depois realiza o map (conta quantas palavras apareceram)
    if(!paragrafo) return []; //se não tiver paragrafo retorna array vazio
    return palavrasDuplicadas(paragrafo); //envia para palavraDuplicada
  })
  return contagem; //retorna parfa ser usado pelo restante do código 
}

function extraiParagrafos(texto) {
  return texto.toLowerCase().split('\n'); //transforma todo o texto em minusculo e depois corta o texto a cada quebra de linha (parágrafo)
}

function limpaPalavra(palavra){
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); //limpa os caracteres, reconhecendo a partir de RegEx e substituindo por espaço vazio
}

function palavrasDuplicadas(texto){
  const listaPalavras = texto.split(' '); //divide o texto a cada palavra, usando o espaço
  const resultado = {}; //cria um objeto vazio
  
  listaPalavras.forEach(palavra => { //realiza um forEach percorrendo todas as palavras 
    if (palavra.length >= 3 ){ //se a palavra for maior ou igual a 3 ela será exibida
      const palavraLimpa = limpaPalavra(palavra); //limpa as palavras de caracteres especiais
      resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1 //se a palavra existir exibe ela e soma mais 1, se não existir começa com 1
    }
  });

  return resultado;

}