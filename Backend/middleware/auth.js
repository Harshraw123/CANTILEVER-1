import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const JWT_SECRET = process.env.JWT_SECRET || '1234FZ';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // ✅ correct property

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1]; // ✅ split by space

  try {
    // ✅ Verify token
    const payload = jwt.verify(token, JWT_SECRET);

    // ✅ Fetch user from DB
    const user = await User.findById(payload.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ✅ Attach user to request for use in routes
    req.user = user;

    // ✅ Continue to next middleware/route
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}


//Ye middleware har incoming request me check karta hai ki user ke request headers me valid JWT token hai ya nahi. Agar token missing hai ya “Bearer” format me nahi hai to ye 401 Unauthorized error deta hai. Agar token mil gaya to ye us token ko verify karta hai using jwt.verify(), phir us token me se user ka ID nikal kar database me user find karta hai (password field hide karke). Agar user mil gaya to uska data req.user me store karta hai taaki aage ke routes me use ho sake, aur phir next() se request ko aage bhej deta hai. Agar token invalid, expire ya user missing ho to appropriate error response bhejta hai.