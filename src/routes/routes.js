import { Router } from 'express';
import authController from '../Controllers/auth/controller.auth.js';
import userController from '../Controllers/users/controller.users.js';

const router = Router();

//rota de autenticação/login
router.post('/login', authController.login);


//rotas users para admin

// Cadastrar um novo user
router.post('/users',userController.createUser);

// Listar todos os users
router.get('/users', userController.listUsers);

/* 
// 
// Buscar um user pelo ID
router.get('/users/:id', userController.findUserById);

// Atualizar um user
router.put('/users/:id', userController.updateUser);

// Excluir/Inativar um user
router.delete('/users/:id', userController.deleteUser); */


export default router;