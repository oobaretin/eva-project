import express from 'express';
import { prisma } from '../index';
import emailService from '../services/emailService';

const router = express.Router();

// Submit a new booking
router.post('/', async (req, res) => {
  try {
    const {
      service,
      date,
      time,
      customer
    } = req.body;

    // Validate required fields
    if (!service || !date || !time || !customer) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

    // Validate customer information
    if (!customer.firstName || !customer.lastName || !customer.email || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required customer information'
      });
    }

    // For now, we'll just log the booking since the schema doesn't match
    // In a real implementation, you'd create a proper booking table or modify the schema
    
    // Log booking for braider notification
    console.log('📅 NEW BOOKING RECEIVED:');
    console.log('=====================================');
    console.log(`👤 Customer: ${customer.firstName} ${customer.lastName}`);
    console.log(`📧 Email: ${customer.email}`);
    console.log(`📞 Phone: ${customer.phone}`);
    console.log(`💇‍♀️ Service: ${service.name}`);
    console.log(`💰 Price: $${service.price}`);
    console.log(`⏱️ Duration: ${service.duration} hours`);
    console.log(`📅 Date: ${new Date(date).toLocaleDateString()}`);
    console.log(`🕐 Time: ${time}`);
    console.log(`📏 Hair Length: ${customer.hairLength || 'Not specified'}`);
    console.log(`🌀 Hair Texture: ${customer.hairTexture || 'Not specified'}`);
    console.log(`🔗 Previous Braids: ${customer.previousBraids ? 'Yes' : 'No'}`);
    console.log(`⚠️ Allergies: ${customer.allergies || 'None'}`);
    console.log(`📝 Notes: ${customer.notes || 'None'}`);
    console.log('=====================================');

          // Generate a simple booking ID
          const bookingId = `BK-${Date.now()}`;

          // Send email notifications
          try {
            await emailService.sendBookingNotification({
              customer,
              service,
              date,
              time
            });
            
            // Also send confirmation to customer
            await emailService.sendCustomerConfirmation({
              customer,
              service,
              date,
              time
            });
          } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the booking if email fails
          }

          return res.json({
            success: true,
            message: 'Booking submitted successfully! We will contact you to confirm your appointment.',
            data: {
              bookingId: bookingId,
              appointmentDate: new Date(date).toISOString(),
              appointmentTime: time,
              serviceName: service.name,
              totalPrice: service.price
            }
          });

  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit booking. Please try again or contact us directly.'
    });
  }
});

// Get all bookings (for braider to view)
router.get('/', async (req, res) => {
  try {
    // For now, return a simple message since we're not storing in database
    res.json({
      success: true,
      data: [],
      message: 'Booking system is active. Check server logs for new bookings.'
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

export default router;
