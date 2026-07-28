import { Router } from 'express';
import authController from '../Controllers/auth/controller.auth.js';
import userController from '../Controllers/users/controller.users.js';
import authMiddleware from '../Middlewares/auth.middleware.js';
import env from '../config/env.js';

const router = Router();

//rota de autenticação/login
router.post('/login', authController.login);

//rotas users para admin

// Cadastrar um novo user
router.post('/users', authMiddleware(env.ROLE_ADMIN), userController.createUser);

// Listar todos os users
router.get('/users', authMiddleware(env.ROLE_ADMIN), userController.listUsers);

// Buscar um user pelo ID
router.get('/users/:id', authMiddleware(env.ROLE_ADMIN), userController.findUserById);

// Atualizar um user
router.put('/users/:id', authMiddleware(env.ROLE_ADMIN), userController.updateUser);

// Excluir/Inativar um user
router.delete('/users/:id', authMiddleware(env.ROLE_ADMIN), userController.deleteUser);

export default router;