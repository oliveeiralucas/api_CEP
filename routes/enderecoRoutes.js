const express = require('express');
const enderecoController = require('../controllers/enderecoController');

const router = express.Router();

router.get('/consulta-cep/:cep', enderecoController.consultarCep);

module.exports = router;
