// Vercel API endpoint for sending booking confirmation emails
// This file should be placed in the /api folder of your Vercel project

const nodemailer = require('nodemailer');

// Gmail SMTP configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'braidsbyevaofficial@gmail.com',
    pass: process.env.EMAIL_PASSWORD, // Set this in Vercel environment variables
  },
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingData } = req.body;

    if (!bookingData) {
      return res.status(400).json({ error: 'Booking data is required' });
    }

    // Format the appointment date
    const appointmentDate = new Date(bookingData.appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send confirmation email to customer
    const customerEmailOptions = {
      from: 'braidsbyevaofficial@gmail.com',
      to: bookingData.customer_email,
      subject: `🎉 Booking Confirmed - BraidsbyEva`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                🎉 Booking Confirmed!
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                Thank you for choosing BraidsbyEva!
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${bookingData.customer_name}</strong>,
              </p>
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Your appointment has been successfully confirmed! We're excited to create beautiful braids for you.
              </p>

              <!-- Appointment Details -->
              <div style="background-color: #f8f9fa; border: 2px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">📅 Your Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Service:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.service_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; color: #333333;">${appointmentDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Time:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.appointment_time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Duration:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.service_duration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Price:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.service_price}</td>
                  </tr>
                </table>
              </div>

              <!-- Preparation Instructions -->
              <div style="background-color: #fff3cd; border: 2px solid #ffc107; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">📋 Important Preparation Instructions</h3>
                <div style="color: #856404; font-size: 14px; line-height: 1.6;">
                  <p style="margin: 0 0 10px 0;"><strong>1. Hair Preparation:</strong> Come with clean, dry hair (washed 24-48 hours before your appointment)</p>
                  <p style="margin: 0 0 10px 0;"><strong>2. Remove Existing Styles:</strong> Please remove any existing braids, twists, or extensions before coming</p>
                  <p style="margin: 0 0 10px 0;"><strong>3. Hair Products:</strong> Avoid heavy oils, gels, or styling products on the day of your appointment</p>
                  <p style="margin: 0 0 10px 0;"><strong>4. Arrival Time:</strong> Please arrive 10-15 minutes early for consultation and preparation</p>
                  <p style="margin: 0 0 10px 0;"><strong>5. Comfort:</strong> Wear comfortable clothing and bring a hair tie if needed</p>
                  <p style="margin: 0 0 10px 0;"><strong>6. Duration:</strong> This service takes ${bookingData.service_duration}, so plan accordingly</p>
                  <p style="margin: 0 0 0 0;"><strong>7. Questions:</strong> Feel free to bring photos or examples of styles you like</p>
                </div>
              </div>

              <!-- What to Expect -->
              <div style="background-color: #d4edda; border: 2px solid #28a745; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #155724; margin: 0 0 15px 0; font-size: 18px;">✨ What to Expect</h3>
                <div style="color: #155724; font-size: 14px; line-height: 1.6;">
                  <p style="margin: 0 0 8px 0;">• Professional consultation to discuss your desired style</p>
                  <p style="margin: 0 0 8px 0;">• High-quality hair products and tools</p>
                  <p style="margin: 0 0 8px 0;">• Expert braiding techniques for long-lasting results</p>
                  <p style="margin: 0 0 8px 0;">• Aftercare instructions for maintaining your style</p>
                  <p style="margin: 0 0 0 0;">• Comfortable seating and relaxing environment</p>
                </div>
              </div>

              <!-- Aftercare Instructions -->
              <div style="background-color: #e3f2fd; border: 2px solid #2196f3; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #0d47a1; margin: 0 0 15px 0; font-size: 18px;">💆‍♀️ Aftercare Instructions</h3>
                <div style="color: #0d47a1; font-size: 14px; line-height: 1.6;">
                  <p style="margin: 0 0 8px 0;">• Sleep with a satin or silk scarf to protect your braids</p>
                  <p style="margin: 0 0 8px 0;">• Avoid excessive pulling or manipulation of your braids</p>
                  <p style="margin: 0 0 8px 0;">• Use a lightweight oil or moisturizer on your scalp as needed</p>
                  <p style="margin: 0 0 8px 0;">• Keep your braids dry for the first 24-48 hours</p>
                  <p style="margin: 0 0 0 0;">• Schedule a follow-up appointment if needed</p>
                </div>
              </div>

              <!-- Contact Information -->
              <div style="background-color: #f8f9fa; border: 2px solid #6c757d; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Information</h3>
                <div style="color: #495057; font-size: 14px; line-height: 1.6;">
                  <p style="margin: 0 0 5px 0;"><strong>Phone:</strong> (832) 207-9386</p>
                  <p style="margin: 0 0 5px 0;"><strong>Email:</strong> braidsbyevaofficial@gmail.com</p>
                  <p style="margin: 0 0 0 0;"><strong>Service Hours:</strong> By appointment only</p>
                </div>
              </div>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                We're excited to create beautiful, long-lasting styles for you!
              </p>
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                <strong>Best regards,</strong><br>
                <strong>Awa Obaretin</strong><br>
                Professional Hair Stylist & Founder<br>
                BraidsbyEva
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send notification email to Eva
    const evaEmailOptions = {
      from: 'braidsbyevaofficial@gmail.com',
      to: 'braidsbyevaofficial@gmail.com',
      subject: `📅 New Booking - ${bookingData.customer_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                📅 New Booking Received
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                BraidsbyEva Website
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Customer Information -->
              <div style="background-color: #f8f9fa; border: 2px solid #28a745; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">👤 Customer Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Name:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.customer_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.customer_email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.customer_phone}</td>
                  </tr>
                </table>
              </div>

              <!-- Service Details -->
              <div style="background-color: #f8f9fa; border: 2px solid #007bff; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">💇‍♀️ Service Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Service:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.service_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; color: #333333;">${appointmentDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Time:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.appointment_time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Duration:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.service_duration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: bold;">Price:</td>
                    <td style="padding: 8px 0; color: #333333;">${bookingData.service_price}</td>
                  </tr>
                </table>
              </div>

              <!-- Customer Notes & Special Requests -->
              <div style="background-color: #f8f9fa; border: 2px solid #6f42c1; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">📝 Customer Notes & Special Requests</h3>
                <div style="background-color: #ffffff; border: 1px solid #dee2e6; padding: 15px; border-radius: 6px;">
                  <p style="color: #333333; margin: 0; font-size: 14px; line-height: 1.6;">
                    ${bookingData.notes ? bookingData.notes : 'No special requests or notes provided by the customer.'}
                  </p>
                </div>
              </div>

              <!-- Action Required -->
              <div style="background-color: #d4edda; border: 2px solid #28a745; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #155724; margin: 0 0 15px 0; font-size: 18px;">📞 Action Required</h3>
                <p style="color: #155724; margin: 0; font-size: 14px; line-height: 1.6;">
                  Please contact the customer to confirm all details and provide any additional preparation instructions.
                </p>
              </div>

              <p style="color: #666666; font-size: 12px; margin: 30px 0 0 0; text-align: center;">
                This booking was submitted through your website.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerEmailOptions);
    await transporter.sendMail(evaEmailOptions);

    console.log('✅ Booking confirmation emails sent successfully');
    
    return res.status(200).json({
      success: true,
      message: 'Booking confirmation emails sent successfully'
    });

  } catch (error) {
    console.error('❌ Error sending booking emails:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to send booking confirmation emails',
      message: 'Booking was recorded but email sending failed. Please contact the customer directly.'
    });
  }
};