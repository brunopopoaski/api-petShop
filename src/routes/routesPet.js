import { Router } from 'express';
import petController from '../Controllers/pets/controller.pet.js';
import authMiddleware from '../Middlewares/auth.middleware.js';
import env from '../config/env.js';

const routerPet = Router();

//rotas pets para user comum logado

routerPet.get('/pets/profile', authMiddleware(env.ROLE_USER), petController.findPetByIdProfile);

routerPet.get('/pets/profile/mypets', authMiddleware(env.ROLE_USER), petController.listPetsByIdProfile);

routerPet.get('/pets/tipo', authMiddleware(env.ROLE_USER), petController.listTypesPet);



//rotas pets para admin

// Cadastrar um novo pet
routerPet.post('/pets', authMiddleware(env.ROLE_ADMIN), petController.createPet);

// Listar todos os pets
routerPet.get('/pets', authMiddleware(env.ROLE_ADMIN), petController.listPets);

// Buscar um pet pelo ID
routerPet.get('/pets/:id', authMiddleware(env.ROLE_ADMIN), petController.findPetById);

// Atualizar um pet
routerPet.put('/pets/:id', authMiddleware(env.ROLE_ADMIN), petController.updatePet);

// Excluir/Inativar um pet
routerPet.delete('/pets/:id', authMiddleware(env.ROLE_ADMIN), petController.deletePet);

//rota para criar um tipo de pet apenas admin
routerPet.post('/pets/tipo', authMiddleware(env.ROLE_ADMIN), petController.createTypePet);

export default routerPet;