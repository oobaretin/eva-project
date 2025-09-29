// Vercel API endpoint for sending emails using your existing Gmail setup
// This file should be placed in the /api folder of your Vercel project

const nodemailer = require('nodemailer');

// Gmail SMTP configuration (same as your backend)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'braidsbyevaofficial@gmail.com',
    pass: process.env.EMAIL_PASSWORD, // Set this in Vercel environment variables
  },
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingData } = req.body;

    // Send customer confirmation email
    const customerEmailOptions = {
      from: 'braidsbyevaofficial@gmail.com',
      to: bookingData.customer_email,
      subject: `Booking Confirmation - ${bookingData.service_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>🎉 Booking Confirmation - BraidsbyEva</h2>
          
          <p>Dear ${bookingData.customer_name},</p>
          
          <p>Thank you for booking with BraidsbyEva! Here are your appointment details:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Appointment Details</h3>
            <p><strong>Service:</strong> ${bookingData.service_name}</p>
            <p><strong>Price:</strong> ${bookingData.service_price}</p>
            <p><strong>Duration:</strong> ${bookingData.service_duration}</p>
            <p><strong>Date:</strong> ${bookingData.appointment_date}</p>
            <p><strong>Time:</strong> ${bookingData.appointment_time}</p>
            <p><strong>Payment:</strong> ${bookingData.payment_method}</p>
          </div>
          
          <h3>📞 Contact Information</h3>
          <p><strong>Phone:</strong> (832) 207-9386</p>
          <p><strong>Email:</strong> braidsbyevaofficial@gmail.com</p>
          
          <p>We look forward to seeing you!</p>
          
          <p><strong>Best regards,</strong><br>
          <strong>Awa Obaretin</strong><br>
          BraidsbyEva</p>
        </div>
      `,
    };

    // Send braider notification email
    const braiderEmailOptions = {
      from: 'braidsbyevaofficial@gmail.com',
      to: 'braidsbyevaofficial@gmail.com',
      subject: `New Booking - ${bookingData.customer_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>📅 New Booking Received</h2>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>👤 Customer Information</h3>
            <p><strong>Name:</strong> ${bookingData.customer_name}</p>
            <p><strong>Email:</strong> ${bookingData.customer_email}</p>
            <p><strong>Phone:</strong> ${bookingData.customer_phone}</p>
          </div>
          
          <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>💇‍♀️ Service Details</h3>
            <p><strong>Service:</strong> ${bookingData.service_name}</p>
            <p><strong>Price:</strong> ${bookingData.service_price}</p>
            <p><strong>Duration:</strong> ${bookingData.service_duration}</p>
            <p><strong>Date:</strong> ${bookingData.appointment_date}</p>
            <p><strong>Time:</strong> ${bookingData.appointment_time}</p>
            <p><strong>Payment:</strong> ${bookingData.payment_method}</p>
          </div>
          
          <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📝 Additional Information</h3>
            <p><strong>Hair Length:</strong> ${bookingData.hair_length}</p>
            <p><strong>Hair Texture:</strong> ${bookingData.hair_texture}</p>
            <p><strong>Previous Braids:</strong> ${bookingData.previous_braids ? 'Yes' : 'No'}</p>
            <p><strong>Allergies:</strong> ${bookingData.allergies}</p>
            <p><strong>Notes:</strong> ${bookingData.notes || 'None'}</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerEmailOptions),
      transporter.sendMail(braiderEmailOptions)
    ]);

    console.log('✅ Both emails sent successfully');
    res.status(200).json({ success: true, message: 'Emails sent successfully' });

  } catch (error) {
    console.error('❌ Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
}
