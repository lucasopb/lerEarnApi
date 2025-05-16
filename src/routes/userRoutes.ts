import { Router } from 'express';
import {
    registerController,
    loginController,
    updateUserController,
    deleteUserController,
    getAllUsersController
} from '../controllers/userController';

const router = Router();

router.get('/', getAllUsersController);
router.post('/register', registerController);
router.post('/login', loginController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router; 