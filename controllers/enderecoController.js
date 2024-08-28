const enderecoService = require('../services/enderecoService');

const consultarCep = async (req, res) => {
    const { cep } = req.params;

    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)) {
        return res.status(400).send('CEP inválido. Formato: XXXXX-XXX');
    }

    try {
        const enderecoData = await enderecoService.buscarEnderecoPorCep(cep);
        if (enderecoData.erro) {
            return res.status(404).send('CEP não encontrado.');
        }

        await enderecoService.salvarEndereco(enderecoData);

        res.status(201).json(enderecoData);
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        res.status(500).send('Erro ao consultar o CEP.');
    }
};

module.exports = {
    consultarCep,
};
