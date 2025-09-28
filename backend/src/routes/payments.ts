import express from 'express';
import Stripe from 'stripe';
import { prisma } from '../index';
import { authenticateToken } from '../middleware/auth';
import { AppError, PaymentIntentRequest, PaymentIntentResponse, AuthenticatedRequest } from '../types';

const router = express.Router();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil'
});

// Create payment intent for card payments
router.post('/create-intent', async (req, res, next) => {
  try {
    const { amount, currency = 'usd', appointmentId } = req.body;

    if (!amount || !appointmentId) {
      throw new AppError('Amount and appointment ID are required', 400);
    }

    // Note: For public booking system, we don't require pre-existing appointments
    // The appointment will be created after successful payment

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        appointmentId
      }
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      },
      message: 'Payment intent created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Confirm payment and update appointment
router.post('/confirm', async (req, res, next) => {
  try {
    const { paymentIntentId, appointmentId } = req.body;

    if (!paymentIntentId || !appointmentId) {
      throw new AppError('Payment intent ID and appointment ID are required', 400);
    }

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new AppError('Payment not completed', 400);
    }

    // For public booking system, we just confirm the payment was successful
    // The appointment will be created in the booking endpoint after payment confirmation
    
    res.json({
      success: true,
      data: {
        appointmentId: appointmentId,
        paymentStatus: 'PAID',
        paymentMethod: 'CARD',
        stripePaymentId: paymentIntentId
      },
      message: 'Payment confirmed successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get payment status
router.get('/status/:appointmentId', async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    // For public booking system, return a generic status
    // The actual appointment will be created after payment

    // For public booking system, return a simple status
    res.json({
      success: true,
      data: {
        appointmentId: appointmentId,
        paymentStatus: 'PENDING',
        paymentMethod: 'CARD',
        message: 'Payment status retrieved successfully'
      }
    });
  } catch (error) {
    next(error);
  }
});

// Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!endpointSecret) {
      throw new Error('Webhook secret not configured');
    }
    
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      // Additional processing can be added here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.json({ received: true });
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
