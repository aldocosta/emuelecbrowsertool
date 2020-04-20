const emuelecService = require('../services/ssh.services')

function Controllers() {
    this.homeGET = async (req, res) => {
        let refers = req.headers.host + req.query.path
        try {
            let data = await emuelecService.listFoldersFromRoot()
            res.render('pages/directoryInfo', { directoryInfo: data, title: 'Raiz' })
        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    }

    this.directoryGET = async (req, res) => {
        let refers = req.headers.host + req.query.path
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
        let refers = req.headers.host + req.query.path
        try {
            const files = req.body.files

            const promises = []
            files.forEach(p => {                
                promises.push(emuelecService.removeFile(p))
            });

            await Promise.race(promises)

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