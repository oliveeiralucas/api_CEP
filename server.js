const { Endereco } = require('./models');
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para permitir o parsing de JSON no corpo das requisições
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.send('Fala meu bom, para navegar em novas rotas, acesse: <br> <strong>/novarota</strong> ou <strong>/consulta-cep</strong>');
});

// Envia os arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota que conecta a página de consulta de CEP
app.get('/consulta-cep', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para consultar o CEP e salvar no banco de dados
app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    // Validação do CEP utilizando expressão regular
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)) {
        return res.status(400).send('CEP inválido. Formato: XXXXX-XXX');
    }

    try {
        const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
        const enderecoData = response.data;

        // Verifica se o CEP retornou um erro
        if (enderecoData.erro) {
            return res.status(404).send('CEP não encontrado.');
        }

        // Cria o endereço no banco de dados
        const novoEndereco = await Endereco.create({
            cep: enderecoData.cep.replace('-', ''),
            logradouro: enderecoData.logradouro,
            numero: null,  // Se você não tem o número na consulta, pode deixar como null
            complemento: enderecoData.complemento || '',
            bairro: enderecoData.bairro,
            cidade: enderecoData.localidade,
            estado: enderecoData.uf,
            municipioIBGE: enderecoData.ibge
        });

        // Retorna os dados do endereço como resposta
        res.status(201).json(novoEndereco);
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        res.status(500).send('Erro ao consultar o CEP.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
