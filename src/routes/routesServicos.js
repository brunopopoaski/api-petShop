import { Router } from 'express';
import authMiddleware from '../Middlewares/auth.middleware.js';
import env from '../config/env.js';

const routerServicos = Router();

const placeholderHandler = (req, res) => {
  res.status(501).json({ message: 'Rota ainda não implementada.' });
};

// rotas de serviços para user comum logado
routerServicos.get('/servicos/profile', authMiddleware(env.ROLE_USER), placeholderHandler);
routerServicos.put('/servicos/profile', authMiddleware(env.ROLE_USER), placeholderHandler);

// rotas de serviços para admin
routerServicos.post('/servicos', authMiddleware(env.ROLE_ADMIN), placeholderHandler);
routerServicos.get('/servicos', authMiddleware(env.ROLE_ADMIN), placeholderHandler);
routerServicos.get('/servicos/:id', authMiddleware(env.ROLE_ADMIN), placeholderHandler);
routerServicos.put('/servicos/:id', authMiddleware(env.ROLE_ADMIN), placeholderHandler);
routerServicos.delete('/servicos/:id', authMiddleware(env.ROLE_ADMIN), placeholderHandler);

export default routerServicos;
