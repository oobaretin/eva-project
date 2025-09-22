import express from 'express';
import { prisma } from '../index';
import { authenticateToken } from '../middleware/auth';
import { AppError, AuthenticatedRequest } from '../types';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { firstName, lastName, phone, hairType, hairLength, preferences } = req.body;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (hairType) updateData.hairType = hairType;
    if (hairLength) updateData.hairLength = hairLength;
    if (preferences) updateData.preferences = preferences;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: updateData,
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

    res.json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user's appointment history
router.get('/appointments', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { status, limit = 10 } = req.query;

    const where: any = { userId: req.user!.id };
    if (status) {
      where.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        service: true
      },
      orderBy: { appointmentDate: 'desc' },
      take: Number(limit)
    });

    res.json({
      success: true,
      data: appointments,
      message: 'Appointment history retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user's reviews
router.get('/reviews', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: reviews,
      message: 'Reviews retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Create a review
router.post('/reviews', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      throw new AppError('Rating must be between 1 and 5', 400);
    }

    // Check if user has completed appointments
    const completedAppointments = await prisma.appointment.count({
      where: {
        userId: req.user!.id,
        status: 'COMPLETED'
      }
    });

    if (completedAppointments === 0) {
      throw new AppError('You must have completed appointments to leave a review', 400);
    }

    // Check if user already has a review
    const existingReview = await prisma.review.findFirst({
      where: { userId: req.user!.id }
    });

    if (existingReview) {
      throw new AppError('You have already left a review', 409);
    }

    const review = await prisma.review.create({
      data: {
        userId: req.user!.id,
        rating,
        comment
      }
    });

    res.status(201).json({
      success: true,
      data: review,
      message: 'Review created successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
