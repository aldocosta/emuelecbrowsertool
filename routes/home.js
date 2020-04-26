const HomeController = require('../controllers/HomeControllers')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage })


module.exports = function (app) {
    const express = require('express')
    const router = express.Router()
    const hc = new HomeController()

    router.get('/', hc.homeGET)
    router.get('/diretorio', hc.directoryGET)
    router.get('/upload-files', hc.uploadFilesGET)
    router.post('/upload-files', upload.array('file', 10), hc.uploadFilesALLPOST)
    // router.post('/upload-files', upload.array('games', 2), hc.uploadFilesALLPOST)
    router.post('/remove-file', hc.removeFile)
    router.post('/remove-file-list', hc.removeFileList)


    app.use(router)
}