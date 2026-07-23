import { Router } from 'express';
import userController from '../Controllers/users/controller.users.js';

const router = Router();

router.post('/login', userController.login);

export default router;