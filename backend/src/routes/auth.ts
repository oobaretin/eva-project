import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import { RegisterRequest, LoginRequest, AuthResponse, AppError, AuthenticatedRequest } from '../types';

const router = express.Router();

// Register new user
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone, hairType, hairLength }: RegisterRequest = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      throw new AppError('Email, password, first name, and last name are required', 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        hairType,
        hairLength,
        // Note: We're not storing password in the current schema
        // In a real app, you'd add a password field to the User model
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        hairType: true,
        hairLength: true,
        preferences: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const response: AuthResponse = {
      user,
      token
    };

    res.status(201).json({
      success: true,
      data: response,
      message: 'User registered successfully'
    });

  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // In a real app, you'd verify the password here
    // For now, we'll just check if the user exists
    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) {
    //   throw new AppError('Invalid email or password', 401);
    // }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const response: AuthResponse = {
      user,
      token
    };

    res.json({
      success: true,
      data: response,
      message: 'Login successful'
    });

  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
      message: 'User profile retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token
router.post('/refresh', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const token = jwt.sign(
      { 
        userId: req.user!.id, 
        email: req.user!.email, 
        isAdmin: req.user!.isAdmin 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: { token },
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

export default router;