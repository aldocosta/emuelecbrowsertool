const emuelecService = require('../services/ssh.services')

function Controllers() {
    this.homeGET = async (req, res) => {

        try {
            let path = '/storage/roms'
            emuelecService.listFoldersFromDirectory(path)
                .then((data) => {
                    res.render('pages/directoryInfo', { directoryInfo: data, title: path })
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
            let files = req.body.files
            let ret = {
                err: [],
                sucess: [],
                isFirst: true
            }


            let fnc = async (files) => {
        
                for (let index = 0; index < files.length; index++) {
                    const item = files[index];
                    try {
                        let isOk = item.indexOf('.') > -1
                        if (isOk) {
                            await emuelecService.removeFile(item)
                            ret.sucess.push(`${item} success removed `)
                        }

                    } catch (error) {
                        ret.err.push(item)
                        console.log(error)
                    }
                }
                res.status(200).json({ message: `${ret.sucess.length} files deleted from ${files.length}` })
            }
            await fnc(files)

            //éeee
            // while (fnc(ret).length > 0) {

            // }



            // for (let index = 0; index < files.length; index++) {
            //     const item = array[index];
            //     try {
            //         let proc = await emuelecService.removeFile(item)
            //         ret.sucess.push(proc)
            //     } catch (error) {
            //         ret.err.push(item)
            //         console.log(error)
            //     }
            // }

            // Promise.all(files.map(item => {
            //     return emuelecService.removeFile(item)
            // }))
            //     .then((data) => {
            //         res.status(200).json({ message: 'Arquivos removidos' })
            //     })
            //     .catch((error) => {
            //         res.render('pages/erro', { erro: error.stack })
            //     })



        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    }

    this.uploadFilesGET = async (req, res) => {
        try {
            let uploadFolder = req.query.uploadFolder
            res.render('pages/upload', { uploadFolder: uploadFolder })
        } catch (error) {
            res.render('pages/erro', { erro: error.stack })
        }
    },
        this.uploadFilesPOST = async (req, res) => {
            try {
                let uploadFolder = req.query.uploadFolder
                res.render('pages/upload', { uploadFolder: uploadFolder })
            } catch (error) {
                res.render('pages/erro', { erro: error.stack })
            }
        }

    this.uploadFilesALLPOST = (req, res) => {
        try {
            // console.log(req.files)


            const files = req.files
            let uploadFolder = req.body.uploadFolder

            Promise.all(files.map(item => emuelecService.putFile(item.path, uploadFolder + '/' + item.originalname)))
                .then(() => {
                    res.render('pages/upload', { uploadFolder: uploadFolder })
                })
                .catch((error) => {
                    res.render('pages/erro', { erro: error.stack })
                })

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