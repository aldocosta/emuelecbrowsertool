const HomeController = require('../controllers/HomeControllers')

module.exports = function (app) {
    const express = require('express')
    const router = express.Router()
    const hc = new HomeController()

    router.get('/', hc.homeGET)
    router.get('/diretorio', hc.directoryGET)
    router.post('/remove-file', hc.removeFile)
    
    app.use(router)
}