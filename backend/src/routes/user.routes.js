import { Router } from 'express';

// controllers
import {
  handleUserLogin,
  handleUserSignup,
} from '../controllers/user.controllers.js';

const userRoutes = Router();

// signup route
userRoutes.post('/signup', handleUserSignup);

// login route
userRoutes.post('/login', handleUserLogin);

export default userRoutes;
