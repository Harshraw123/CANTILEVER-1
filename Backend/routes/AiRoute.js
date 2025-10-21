import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { aiGenerateBlog } from '../controllers/AiController.js';


const AiRouter = express.Router();

AiRouter.route('/generate').post(authMiddleware,aiGenerateBlog)
// Route to get, update, or delete a specific task by ID


export default AiRouter;


