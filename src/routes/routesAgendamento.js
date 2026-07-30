import { Router } from 'express';
import agendamentosController from '../Controllers/agendamentos/controller.agendamentos.js';
import authMiddleware from '../Middlewares/auth.middleware.js';
import env from '../config/env.js';

const routerAgendamentos = Router();

// rotas de agendamento para user comum logado
routerAgendamentos.get('/agendamentos/profile', authMiddleware(env.ROLE_USER, env.ROLE_ADMIN), agendamentosController.listAgendamentosProfile);
routerAgendamentos.put('/agendamentos/profile', agendamentosController.updateAgendamento);
routerAgendamentos.delete('/agendamentos/profile', authMiddleware(env.ROLE_USER, env.ROLE_ADMIN), agendamentosController.deleteAgendamento);
routerAgendamentos.get('/agendamentos/servicos', agendamentosController.listServices);

// rotas de agendamento para admin
routerAgendamentos.post('/agendamentos', agendamentosController.createAgendamento);
routerAgendamentos.get('/agendamentos', authMiddleware(env.ROLE_ADMIN), agendamentosController.listAgendamentos);
routerAgendamentos.get('/agendamentos/:id', authMiddleware(env.ROLE_ADMIN), agendamentosController.findAgendamentoById);
routerAgendamentos.put('/agendamentos/:id', authMiddleware(env.ROLE_ADMIN), agendamentosController.updateAgendamento);
routerAgendamentos.delete('/agendamentos/:id', authMiddleware(env.ROLE_ADMIN), agendamentosController.deleteAgendamento);

export default routerAgendamentos;
