const axios = require('axios');
const { Endereco } = require('../models/endereco');

const buscarEnderecoPorCep = async (cep) => {
    const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
    return response.data;
};

const salvarEndereco = async (enderecoData) => {
    return await Endereco.create({
        cep: enderecoData.cep.replace('-', ''),
        logradouro: enderecoData.logradouro,
        numero: null,
        complemento: enderecoData.complemento || '',
        bairro: enderecoData.bairro,
        cidade: enderecoData.localidade,
        estado: enderecoData.uf,
        municipioIBGE: enderecoData.ibge
    });
};

module.exports = {
    buscarEnderecoPorCep,
    salvarEndereco,
};
