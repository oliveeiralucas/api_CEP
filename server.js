const express = require('express');
const enderecoRoutes = require('./routes/enderecoRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', enderecoRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
