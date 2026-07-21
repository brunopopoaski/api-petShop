# api-petShop

Projeto em andamento com uma estrutura inicial de API em Node.js.

## O que está implementado
- Estrutura básica do projeto em Node.js com ES modules.
- Configuração do servidor Express em src/app.js.
- Inicialização do servidor e conexão com MongoDB em src/server.js.
- Leitura de variáveis de ambiente em src/config/env.js.
- Conexão com MongoDB usando Mongoose em src/config/db.js.
- Script de desenvolvimento com nodemon.

## Dependências principais
- express
- mongoose
- dotenv
- bcrypt
- jsonwebtoken
- nodemon

## Variáveis de ambiente
O projeto utiliza as seguintes variáveis:
- PORT
- URL_MONGODB

## Como executar
1. Instale as dependências:
   npm install
2. Configure as variáveis de ambiente no arquivo de ambiente do projeto.
3. Inicie o servidor:
   npm run dev

## Observação
No momento, a estrutura do projeto está em fase inicial e ainda não possui rotas, controllers, modelos ou serviços implementados.
