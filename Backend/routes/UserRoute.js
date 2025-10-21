import express from 'express'

import { registerUser,getCurrentUser,updatePassword,updateProfile } from '../controllers/UserController.js';
import { loginUser } from '../controllers/UserController.js';
import authMiddleWare from '../middleware/auth.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/me',authMiddleWare,getCurrentUser)
userRouter.put('/profile',authMiddleWare,updateProfile)
userRouter.put('/password',authMiddleWare,updatePassword)

export default userRouter