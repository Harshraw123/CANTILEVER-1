import User from '../models/UserModel.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || '1234FZ';
const TOKEN_EXPIRES = '24h';

// ✅ Token generator function
const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

// ✅ Register User
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long',
    });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// ✅ Login User
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// ✅ Get Current User
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select('name email');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update User Profile


export async function updateProfile(req, res) {
    const { name, email } = req.body;
  
    // Basic validation
    if (!name || !email || !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Valid name and email required' });
    }
  
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true, runValidators: true }
      ).select('name email');
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({
        success: true,
        message: 'Profile updated successfully',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  //changePassword


  
  export async function updatePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
  
    // ✅ Validate input
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'Password invalid or too short (min 8 chars)' });
    }
  
    try {
      // ✅ Find user and select password
      const user = await User.findById(req.user.id).select('password');
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // ✅ Compare current password
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ success: false, message: 'Current password is incorrect' });
      }
  
      // ✅ Hash new password and update
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
  
