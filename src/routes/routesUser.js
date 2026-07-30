import { Router } from 'express';
import authController from '../Controllers/auth/controller.auth.js';
import userController from '../Controllers/users/controller.users.js';
import authMiddleware from '../Middlewares/auth.middleware.js';
import env from '../config/env.js';

const routerUser = Router();

//rota de autenticação/login
routerUser.post('/login', authController.login);

//rotas users para user comum logado

// Buscar o próprio user pelo ID

routerUser.get('/users/profile', authMiddleware(env.ROLE_USER, env.ROLE_ADMIN), userController.findUserByIdProfile);
routerUser.put('/users/profile', authMiddleware(env.ROLE_USER, env.ROLE_ADMIN), userController.updateUserProfile);

//rotas users para admin

// Cadastrar um novo user
routerUser.post('/users', authMiddleware(env.ROLE_ADMIN), userController.createUser);

// Listar todos os users
routerUser.get('/users', authMiddleware(env.ROLE_ADMIN), userController.listUsers);

// Buscar um user pelo ID
routerUser.get('/users/:id', authMiddleware(env.ROLE_ADMIN), userController.findUserById);

// Atualizar um user
routerUser.put('/users/:id', authMiddleware(env.ROLE_ADMIN), userController.updateUser);

// Excluir/Inativar um user
routerUser.delete('/users/:id', authMiddleware(env.ROLE_ADMIN), userController.deleteUser);



export default routerUser;