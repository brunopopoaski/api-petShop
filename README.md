# api-petShop

API backend para um sistema PetShop construído em Node.js com Express e MongoDB.

## Visão Geral
Este projeto é uma API REST que gerencia usuários, pets, tipos de pet, agendamentos e serviços. Ele usa autenticação JWT e controle de acesso por função para separar permissões de usuário comum e administrador.

## Arquitetura
- `src/app.js` monta o Express e registra as rotas.
- `src/server.js` conecta ao MongoDB e inicia o servidor.
- `src/config/` contém as configurações de ambiente e conexão com banco.
- `src/routes/` define todos os endpoints da API.
- `src/Controllers/` contém a lógica de entrada para cada recurso.
- `src/Services/` encapsula validação e regras de negócio.
- `src/Repositories/` faz o acesso direto aos schemas Mongoose.
- `src/Models/` define os schemas e modelos MongoDB.
- `src/Utils/` contém funções auxiliares como criação de token, hash de senha e erros.
- `src/Middlewares/` contém middleware de autenticação JWT.

## Dependências principais
- `express` - servidor HTTP
- `mongoose` - ODM MongoDB
- `dotenv` - variáveis de ambiente
- `bcrypt` - hash de senha
- `jsonwebtoken` - JWT
- `nodemon` - reload em desenvolvimento

## Variáveis de ambiente
O projeto lê as seguintes variáveis em `.env`:
- `PORT` - porta da API
- `URL_MONGODB` - string de conexão MongoDB
- `JWT_SECRET` - segredo para assinar tokens JWT
- `EXPIREIN` - tempo de expiração do token JWT
- `SALT_ROUNDS` - rounds do bcrypt
- `ROLE_ADMIN` - valor numérico da role admin
- `ROLE_USER` - valor numérico da role usuário comum

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com as variáveis necessárias.
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. A API ficará disponível em `http://localhost:${process.env.PORT || 3000}`.

## Rotas e recursos
As rotas estão agrupadas por recurso em `src/routes`.

### Autenticação
- `POST /login`
  - Body: `{ "cpf": "...", "senha": "..." }`
  - Retorna um token JWT no formato `{ acess_token, type }`.

### Usuários (`users`)
Usuário comum e admin usam o mesmo recurso, mas algumas rotas exigem `ROLE_ADMIN`.

- `GET /users/profile`
  - Retorna os dados do usuário autenticado.
- `PUT /users/profile`
  - Atualiza os dados do usuário autenticado.
- `POST /users`
  - Cria usuário novo (admin).
- `GET /users`
  - Lista todos os usuários (admin).
- `GET /users/:id`
  - Busca usuário por ID (admin).
- `PUT /users/:id`
  - Atualiza usuário por ID (admin).
- `DELETE /users/:id`
  - Inativa usuário por ID (admin).

Campos do schema `User`:
- `nome` (String, obrigatório)
- `cpf` (String, obrigatório, único)
- `email` (String, obrigatório, único)
- `telefone` (String, obrigatório)
- `senha` (String, obrigatório)
- `endereco` (objeto obrigatório):
  - `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`
- `status` (`ATIVO` | `INATIVO`, padrão `ATIVO`)
- `role` (`1` para usuário, `33144` para admin)

### Pets (`pets`)
Rotas do pet incluem tanto ações do admin quanto do tutor logado.

- `GET /pets/profile`
  - Rota de perfil para o tutor logado (atualmente chama um método que espera `petId`).
- `GET /pets/profile/mypets`
  - Lista pets do tutor autenticado.
- `POST /pets`
  - Cadastra um novo pet (admin).
- `GET /pets`
  - Lista todos os pets ativos (admin).
- `GET /pets/:id`
  - Busca pet por ID (admin).
- `PUT /pets/:id`
  - Atualiza pet por ID (admin).
- `DELETE /pets/:id`
  - Inativa pet por ID (admin).
- `POST /pets/tipo`
  - Cria um novo tipo de pet (admin).

Campos do schema `Pet`:
- `nome` (String, obrigatório)
- `especie` (ObjectId, obrigatório)
- `raca` (String, obrigatório)
- `sexo` (`Macho` | `Fêmea`)
- `dataNascimento` (Date)
- `idade` (Number)
- `peso` (Number)
- `cor` (String)
- `porte` (`Pequeno` | `Médio` | `Grande`)
- `castrado` (Boolean)
- `observacoes` (String)
- `ativo` (Boolean, padrão `true`)
- `tutor` (ObjectId, obrigatório)

### Agendamentos (`agendamentos`)
O backend possui rotas para agendamentos com acesso de usuário comum e admin.

- `GET /agendamentos/profile`
  - Lista agendamentos do tutor autenticado.
- `PUT /agendamentos/profile`
  - Atualiza um agendamento (usuário logado).
- `DELETE /agendamentos/profile`
  - Cancela um agendamento (usuário logado).
- `POST /agendamentos`
  - Cria agendamento (admin).
- `GET /agendamentos`
  - Lista todos os agendamentos (admin).
- `GET /agendamentos/:id`
  - Busca agendamento por ID (admin).
- `PUT /agendamentos/:id`
  - Atualiza agendamento por ID (admin).
- `DELETE /agendamentos/:id`
  - Cancela agendamento por ID (admin).

Campos do schema `Agendamento`:
- `tipo` (ObjectId de serviço, obrigatório)
- `dataMarcada` (Date, obrigatório)
- `pet` (ObjectId, obrigatório)
- `status` (`Agendado` | `Aceito` | `Finalizado` | `Cancelado`)

### Serviços (`servico` / `servicos`)
O modelo de serviço está definido, mas a API não expõe rotas públicas de serviço além do tipo de pet.

Campos do schema `Servico`:
- `nome` (String, obrigatório)
- `descricao` (String, obrigatório)
- `preco` (Number, obrigatório)
- `duracao` (Number, obrigatório)
- `ativo` (Boolean)

### Tipos de pet (`raca`)
O projeto inclui um esquema para `raca` e uma rota `POST /pets/tipo` para cadastrar novos tipos de pet.

Campos do schema `Raca`:
- `especie` (String, obrigatório)
- `nome` (String, obrigatório)

## Autenticação e autorização
- A autenticação usa JWT, com tokens gerados em `src/Utils/createToken.js`.
- `auth.middleware.js` valida o token e extrai `req.user`.
- A rota exige `ROLE_USER` ou `ROLE_ADMIN` conforme a rota configurada.

## Estrutura de arquivos
```
src/
  app.js
  server.js
  config/
    db.js
    env.js
  Controllers/
    auth/
    pets/
    users/
    agendamentos/
  Services/
    auth/
    pets/
    users/
    agendamentos/
    raca/
  Repositories/
    auth/
    pets/
    users/
    agendamentos/
    raca/
  Models/
    user.schema.js
    pet.schema.js
    servico.schema.js
    agendamento.schema.js
    raca.schema.js
  Middlewares/
    auth.middleware.js
  Utils/
    createError.js
    createToken.js
    hash.js
  routes/
    routesUser.js
    routesPet.js
    routesAgendamento.js
```

## Observações
- A rota `GET /pets/profile` está configurada, mas a implementação atual exige um ID de pet e pode precisar de ajuste para o perfil do usuário.
- As rotas de agendamento de perfil (`PUT /agendamentos/profile` e `DELETE /agendamentos/profile`) usam os mesmos handlers de agendamento e provavelmente precisam ser refinadas para o ID correto de agendamento.
- O modelo `servico` existe, mas não há rotas específicas de listagem/CRUD de serviços implementadas no momento.

## Melhorias futuras
- Implementar rotas REST completas para `servico`.
- Ajustar endpoints de perfil para `pets` e `agendamentos` para usar IDs corretos e garantir consistência.
- Adicionar tratamento de erros centralizado e respostas JSON padronizadas.
- Adicionar testes automatizados e documentação Swagger.
