const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const scrapsRouter = require('./scrap');
const faltasRouter = require('./faltas');
const avaliacaoRouter = require('./avaliacao');


router.use('/', usuariosRouter);
router.use('/', scrapsRouter);
router.use('/', faltasRouter );
router.use('/', avaliacaoRouter);

module.exports = router;