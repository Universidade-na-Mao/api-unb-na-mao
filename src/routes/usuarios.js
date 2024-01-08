const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController');

router
    .route('/usuarios')
    .post((req, res) => usuarioController.create(req, res))

    router
  .route('/usuarios/atualizar')
  .put((req, res) => usuarioController.atualizaDadosUsuario(req, res));

    router
    .route('/login')
    .post((req,res) => usuarioController.validaUsuario(req,res))


module.exports = router
