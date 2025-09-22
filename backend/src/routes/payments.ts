import express from 'express';
import Stripe from 'stripe';
import { prisma } from '../index';
import { authenticateToken } from '../middleware/auth';
import { AppError, PaymentIntentRequest, PaymentIntentResponse, AuthenticatedRequest } from '../types';

const router = express.Router();

// Initialize Stripe (disabled for now)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-08-27.basil'
// });

// Create payment intent for card payments (disabled - Stripe not configured)
router.post('/create-intent', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  res.status(503).json({
    success: false,
    error: 'Card payments are temporarily unavailable. Please use Zelle payment.',
    message: 'Payment service is being updated'
  });
});

// Confirm payment and update appointment (disabled - Stripe not configured)
router.post('/confirm', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  res.status(503).json({
    success: false,
    error: 'Card payments are temporarily unavailable. Please use Zelle payment.',
    message: 'Payment service is being updated'
  });
});

// Get payment status
router.get('/status/:appointmentId', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: {
        id: true,
        userId: true,
        paymentStatus: true,
        paymentMethod: true,
        totalPrice: true,
        stripePaymentId: true
      }
    });

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    if (appointment.userId !== req.user!.id) {
      throw new AppError('Access denied', 403);
    }

    let paymentDetails = null;

    // Stripe payment details are temporarily unavailable
    if (appointment.paymentMethod === 'CARD') {
      paymentDetails = {
        status: 'service_unavailable',
        message: 'Card payment details are temporarily unavailable'
      };
    }

    res.json({
      success: true,
      data: {
        appointmentId: appointment.id,
        paymentStatus: appointment.paymentStatus,
        paymentMethod: appointment.paymentMethod,
        totalPrice: appointment.totalPrice,
        paymentDetails
      },
      message: 'Payment status retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Handle Stripe webhooks (disabled - Stripe not configured)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
  res.status(503).json({
    success: false,
    error: 'Webhook service is temporarily unavailable',
    message: 'Payment service is being updated'
  });
});

// Get Zelle payment instructions
router.get('/zelle-instructions', (req, res) => {
  res.json({
    success: true,
    data: {
      instructions: [
        '1. Open your Zelle app or online banking',
        '2. Send payment to: (832) 207-9386',
        '3. Include your appointment ID in the memo/note',
        '4. Payment must be completed within 24 hours of booking',
        '5. Contact us if you have any issues with payment'
      ],
      phone: '(832) 207-9386',
      note: 'Include your appointment ID in the payment memo'
    },
    message: 'Zelle payment instructions retrieved successfully'
  });
});

export default router;
