import { Router } from 'express';
import {
    registerController,
    loginController,
    updateUserController,
    deleteUserController
} from '../controllers/userController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router; 