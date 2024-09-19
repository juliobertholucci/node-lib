export default function trataErros(erro){ //exporta para toda a aplicação, como padrão (default) por ser a única função dentro do arquivo
    if(erro.code === 'ENOENT') throw new Error('arquivo não encontrado')
        //se houver erro, joga o objeto Error p/ catch
    else return 'erro na aplicação';

}

