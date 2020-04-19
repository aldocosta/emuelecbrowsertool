var main = main || {}
main.pages = main.pages || {}

main.pages.DirectoryInfo = {
    showModalExcluir : (nomeArquivo,fullNomeArquivo) => {
        $('#regName').html(nomeArquivo)
        $('#hdRegName').val(fullNomeArquivo)
        $('#modalExcluir').modal()
    }
}