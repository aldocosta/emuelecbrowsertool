var main = main || {}
main.pages = main.pages || {}

main.pages.DirectoryInfo = {
    showModalExcluir: (nomeArquivo, fullNomeArquivo) => {
        // $('#regName').html(nomeArquivo)
        // $('#hdRegName').val(fullNomeArquivo)
        $('#modalExcluir').modal()
    },
    postCheckboxArrays: (arrs) => {
        let arr = []
        $('#dirTable tbody tr')
            .each((i, v) => {
                let flag = $(v).find('input:checkbox').is(':checked')
                if (flag) {
                    let fullname = $(v).find('input:hidden').val()
                    arr.push(fullname)
                    console.log(`Arquivo a se apagar: ${fullname}`)
                }
            })

        fetch('/remove-file-list', {
            method: 'POST', // or 'PUT'            
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

            body: JSON.stringify({ files: arr })
        })
            .then((data) => {
                console.log('Data', data)
            })
            .then((response) => {
                window.location.reload(true)
            })
            .catch((err) => {
                console.log('Erro:', err)
            })
    },
    checkAll: (el) => {
        let isCheck = $('#chkCheckAll').is(':checked')
        if (isCheck) {
            $('#spnLoadingProcessarTodos').html('Process').show()
        } else {
            $('#spnLoadingProcessarTodos').html('Process').hide()
        }
        $('#dirTable tbody tr')
            .each((i, v) => {
                if (i <= 9) {
                    $(v).find('input[type=checkbox]').prop("checked", isCheck)
                }
            })
    }
    ,
    countChecked: (el) => {
        let checkedCounter = 0
        $('#dirTable tbody tr')
            .each((i, v) => {
                let flag = $(v).find('input:checkbox').is(':checked')
                if (flag) {
                    checkedCounter++
                }
            })
        if (checkedCounter > 0) {
            $('#spnLoadingProcessarTodos').html(`${checkedCounter} to delete!`).show()
        }
        else {
            $('#spnLoadingProcessarTodos').html('').hide()
        }
        if (checkedCounter == 10) {
            $.notify("Limited to 9 items per page", "info");
            $(el).prop("checked", false);
            checkedCounter = checkedCounter - 1
        }
    }, askProcessAll: () => {

    }
}