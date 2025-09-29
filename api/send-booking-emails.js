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
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                🎉 Booking Confirmed!
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
                Thank you for choosing BraidsbyEva!
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Dear <strong>${bookingData.customer_name}</strong>,
              </p>
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Your appointment has been successfully confirmed! We're excited to create beautiful braids for you.
              </p>

              <!-- Appointment Details -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">📅 Appointment Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Service:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_name}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Date:</span>
                    <span style="color: #333333; font-weight: bold;">${appointmentDate}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Time:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.appointment_time}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Duration:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_duration}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Price:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_price}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Payment:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.payment_method}</span>
                  </div>
                </div>
              </div>

              <!-- Preparation Instructions -->
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">📋 Preparation Instructions</h3>
                <ul style="color: #856404; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Come with clean, dry hair (washed 24-48 hours before)</li>
                  <li style="margin-bottom: 8px;">Remove any existing braids or extensions</li>
                  <li style="margin-bottom: 8px;">Bring a hair tie and any preferred accessories</li>
                  <li style="margin-bottom: 8px;">Arrive 10-15 minutes early for consultation</li>
                  <li style="margin-bottom: 8px;">Wear comfortable clothing</li>
                </ul>
              </div>

              <!-- Contact Information -->
              <div style="background-color: #e3f2fd; border: 1px solid #bbdefb; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #1565c0; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Information</h3>
                <p style="color: #1565c0; margin: 5px 0;"><strong>Phone:</strong> (832) 207-9386</p>
                <p style="color: #1565c0; margin: 5px 0;"><strong>Email:</strong> braidsbyevaofficial@gmail.com</p>
                <p style="color: #1565c0; margin: 5px 0;"><strong>Service Hours:</strong> By appointment only</p>
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
      subject: `📅 New Booking Received - ${bookingData.customer_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                📅 New Booking Received
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
                BraidsbyEva Website
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Customer Information -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">👤 Customer Information</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Name:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.customer_name}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Email:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.customer_email}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Phone:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.customer_phone}</span>
                  </div>
                </div>
              </div>

              <!-- Service Details -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">💇‍♀️ Service Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Service:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_name}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Date:</span>
                    <span style="color: #333333; font-weight: bold;">${appointmentDate}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Time:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.appointment_time}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Duration:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_duration}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Price:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_price}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Payment:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.payment_method}</span>
                  </div>
                </div>
              </div>

              <!-- Hair Details -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #6f42c1; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">📝 Hair Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Length:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.hair_length}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Texture:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.hair_texture}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Previous Braids:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.previous_braids ? 'Yes' : 'No'}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Allergies:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.allergies || 'None'}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Special Requests:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.notes || 'None'}</span>
                  </div>
                </div>
              </div>

              <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <p style="color: #155724; margin: 0; font-weight: 500;">
                  📞 Please contact the customer to confirm all details and provide preparation instructions.
                </p>
              </div>

              <p style="color: #666666; font-size: 14px; margin: 30px 0 0 0; text-align: center;">
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
