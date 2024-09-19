import fs from 'fs'; //import da lib fs
import path from 'path'; //nativa do node p/ gerenciar caminhos relativos e absolutos dentro do programa
import trataErros from './erros/funcoesErros.js'; //require do modulo de tratar erros
import { contaPalavras } from './index.js'; //importando a função do index.js dentro de um objeto, pois podemos exportar e importar várias funções
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command(); //executando uma instância da biblioteca e salvando na variável

program
  .version('0.0.1')
  .option('-t, --texto <string>', 'caminho do texto a ser processado') //argumento do tipo string que o usuário irá passar
  .option('-d, --destino <string>', 'caminho para salvar arquivo') //argumento do tipo string 
  .action((options) => {
    const {texto, destino} = options; //desestruturação de objetos
    if(!texto || !destino){
      console.error(chalk.red('favor inserir caminho de origem e destino'));
      program.help();
      return;
    }
    const caminhoTexto = path.resolve(texto); //utilização da lib path para gerenciar o arquivo
    const caminhoDestino = path.resolve(destino);//utilização da lib path para gerenciar o arquivo

    try{
      processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.bgGreen('texto processado'));
    }catch(erro){
      console.log(chalk.bgRed('Ocorreu um erro no processamento'), erro);
    }
  })
program.parse(); //conversão

const caminhoArquivo = process.argv; //leitura de comandos pelo terminal
const link = caminhoArquivo[2]; //adquire o endereço do arquivo de texto que queremos ler
const endereco = caminhoArquivo[3]; //adquire o endereço onde o arquivo será salvo


function processaArquivo(texto, destino){
  fs.readFile(texto, 'utf-8', (erro, texto) => { //lê o arquivo (link), codifica para utf-8 e insere o arquivo no código;
  try{ //bloco try catch - tudo o que é esperado dar algum erro é inserido dentro do try
        if (erro) throw erro; //se houver erro, joga (throw) o erro para fora da função p/ ser captudara pelo catch (pegar)
        const resultado = contaPalavras(texto); //salva o resultado do processamento do arquivo em index.js
        criaESalvaArquivo(resultado, destino);//parametros da função para criar e salvar arquivo
      }catch(erro){ 
        trataErros(erro)
      }
  })
}

async function criaESalvaArquivo(listaPalavras, endereco){ //criado uma função que recebe a lista de palavras e o endereço onde o arquivo será salvo, uma função assincrona
    const arquivoNovo = `${endereco}/resultado.txt`; //variável com o endereço de salvamento do arquivo
    const textoPalavas = montaSaidaArquivo(listaPalavras); //converte o objeto para string p/ ser exibido
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavas); //linha de comando do terminal para criar o arquivo, usa o await para finalizar a função primeiro e depois acontecer a escrita (await)
        console.log('Arq criado');    
    }catch(erro){
        throw erro;
    }
}