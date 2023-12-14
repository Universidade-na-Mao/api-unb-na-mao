const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const scrapsRouter = require('./scrap');

router.use('/', usuariosRouter);
router.use('/', scrapsRouter);

module.exports = router;