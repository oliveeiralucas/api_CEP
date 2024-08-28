CEP Consulta e Registro
Este é um projeto Node.js que utiliza o framework Express para criar uma API capaz de consultar informações de endereços a partir de um CEP e, em seguida, registrar essas informações em um banco de dados PostgreSQL usando Sequelize.

Funcionalidades
Consulta de CEP: A API permite consultar um CEP utilizando o serviço ViaCEP.
Registro de Endereço: Após a consulta, os dados do endereço são automaticamente salvos em um banco de dados PostgreSQL.
Rotas adicionais: O projeto inclui rotas adicionais para demonstração de funcionalidades básicas do Express.
Requisitos
Node.js v14 ou superior
PostgreSQL v12 ou superior
npm v6 ou superior
Instalação
1. Clonar o Repositório
bash
Copiar código
git clone https://github.com/seuusuario/cep-consulta-registro.git
cd cep-consulta-registro
2. Instalar as Dependências
bash
Copiar código
npm install
3. Configurar o Banco de Dados
Edite o arquivo config/config.json para configurar a conexão com seu banco de dados PostgreSQL.

json
Copiar código
{
  "development": {
    "username": "seu_usuario",
    "password": "sua_senha",
    "database": "api-node",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
4. Criar o Banco de Dados
Execute o comando para criar o banco de dados configurado:

bash
Copiar código
npx sequelize-cli db:create
5. Executar as Migrations
Aplique as migrations para criar as tabelas necessárias no banco de dados:

bash
Copiar código
npx sequelize-cli db:migrate
Como Usar
Iniciar o Servidor
Para iniciar o servidor, execute:

bash
Copiar código
node server.js
O servidor estará rodando em http://localhost:3000.

Rotas Disponíveis
Rota Principal
Rota: /
Método: GET
Descrição: Retorna uma mensagem de boas-vindas com links para as rotas disponíveis.
Nova Rota
Rota: /novarota
Método: GET
Descrição: Exemplo de uma rota simples que retorna uma mensagem.
Consulta de CEP
Rota: /consulta-cep/:cep
Método: GET
Descrição: Consulta um CEP na API ViaCEP e salva o resultado no banco de dados.
Exemplo: http://localhost:3000/consulta-cep/30130-110
Exemplo de Uso
Após iniciar o servidor, você pode consultar um CEP e registrar o endereço no banco de dados utilizando a seguinte URL:

bash
Copiar código
http://localhost:3000/consulta-cep/30130-110
Se o CEP for válido, o endereço será salvo no banco de dados e os detalhes serão retornados como resposta.

Estrutura do Projeto
bash
Copiar código
cep-consulta-registro/
├── config/            # Configurações do banco de dados
├── migrations/        # Arquivos de migração do Sequelize
├── models/            # Models do Sequelize
├── public/            # Arquivos públicos (HTML, CSS, etc.)
├── server.js          # Arquivo principal do servidor Express
└── README.md          # Documentação do projeto