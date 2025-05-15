import { Router } from 'express';
import { signUpController, loginController, getUserController } from '../controllers/userController';

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);

export default router; 