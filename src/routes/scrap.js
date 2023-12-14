const router = require('express').Router()

const scrappingController = require('../controllers/scrappingController');

router
    .route('/teste')
    .get((req, res) => scrappingController.getCardapio(req, res))

    router
    .route('/scrap/cardapio')
    .get((req, res) => scrappingController.scrapePDFLinks(req, res))

const axios = require('axios');

// Exemplo de requisição GET
setInterval( async () => {
    await axios.get('http://localhost:0203/api/scrap/cardapio')
    .then(response => console.log(response))
    .catch(error => console.error('Ocorreu um erro:', error));
}, 604800000)

module.exports = router
