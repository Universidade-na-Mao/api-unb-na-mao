const router = require('express').Router()

const scrappingController = require('../controllers/scrappingController');

router
    .route('/teste')
    .get((req, res) => scrappingController.getCardapio(req, res))

    router
    .route('/scrap/cardapio')
    .get((req, res) => scrappingController.scrapePDFLinks(req, res))


module.exports = router
