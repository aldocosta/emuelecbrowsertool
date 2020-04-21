const emuelecService = require('../services/ssh.services')

function Controllers() {
    this.homeGET = async (req, res) => {
        
        try {
            emuelecService.listFoldersFromRoot()
                .then((data) => {
                    res.render('pages/directoryInfo', { directoryInfo: data, title: '/storage' })
                })
                .catch((error) => {
                    res.render('pages/erro', { erro: error.stack })
                })

        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    }

    this.directoryGET = async (req, res) => {
        let diretorio = req.query.path

        try {
            let title = diretorio
            let dataDir = await emuelecService.listFoldersFromDirectory(diretorio)
            res.render('pages/directoryInfo', { directoryInfo: dataDir, title: title })
        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    }

    this.removeFile = async (req, res) => {
        let refers = req.headers.host + req.query.path
        try {
            let registro = req.body.registro

            await emuelecService.removeFile(registro)

            res.redirect(refers)
        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    }

    this.removeFileList = async (req, res) => {
        try {
            const files = req.body.files

            Promise.all(files.map(item => emuelecService.removeFile(p)))

            res.status(200).json({ message: 'Arquivos removidos' })
        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    }
}

async function sleep(timeout) {
    return new Promise((f, r) => {
        setTimeout(() => {
            f()
        }, timeout)
    })
}

module.exports = Controllers