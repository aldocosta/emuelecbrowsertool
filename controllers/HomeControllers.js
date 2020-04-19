const emuelecService = require('../services/ssh.services')

function Controllers() {
    this.homeGET = async (req, res) => {
        try {
            let data = await emuelecService.listFoldersFromRoot()
            res.render('pages/home', { data: data })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    this.directoryGET = async (req, res) => {
        try {
            let diretorio = req.query.path            
            let title = diretorio
            let dataDir = await emuelecService.listFoldersFromDirectory(diretorio)
            let data = await emuelecService.listFoldersFromRoot()
            res.render('pages/directoryInfo', { directoryInfo: dataDir, data: data, title: title })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    this.removeFile = async (req, res) => {
        let refers = req.headers.referer
        try {
            let registro = req.body.registro

            await emuelecService.removeFile(registro)
            
            res.redirect(refers)
        } catch (error) {
            res.redirect(refers)
        }
        // let diretorio = req.query.path
        // let splited = diretorio.split('/')
        // let title = splited[splited.length - 1]
        // //await emuelecService.removeFile(diretorio)

        // let dataDir = await emuelecService.listFoldersFromDirectory(diretorio)
        // let data = await emuelecService.listFoldersFromRoot()
        // res.render('pages/directoryInfo', { directoryInfo: dataDir, data: data, title: title })
    }
}

module.exports = Controllers