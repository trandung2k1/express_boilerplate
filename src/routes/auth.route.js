import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
const router = Router();
router.get('/', AuthController.getUsers);
router.post('/register', AuthController.register);
export default router;
