import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from './routes/UserRoute.js';

import BlogRouter from './routes/BlogRoute.js';

import AiRouter from './routes/AiRoute.js';

dotenv.config(); //  Load environment variables

const app = express();
const port = process.env.PORT || 4000; 

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://mindcast-ai.netlify.app",'https://cantilever-1.vercel.app'],  
  credentials: true,                // allow cookies / auth headers
}));
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true }));

// DB Connect
connectDB(); 

app.get('/', (req, res) => {
  res.send('Hello from the server! The app is working.'); // Send some text or HTML
});
// Routes
app.use('/api/user',userRouter)

app.use('/api/blog',BlogRouter)

app.use('/api/ai',AiRouter)

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
