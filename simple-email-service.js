// Simple email service that actually works
// This will send emails to both customer and Eva

const nodemailer = require('nodemailer');

// Create transporter using Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'braidsbyevaofficial@gmail.com',
    pass: 'dlrj tzws keuv wsdg' // Your Gmail app password
  }
});

// Send booking confirmation to customer
const sendCustomerConfirmation = async (bookingData) => {
  const appointmentDate = new Date(bookingData.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mailOptions = {
    from: 'braidsbyevaofficial@gmail.com',
    to: bookingData.customer_email,
    subject: `🎉 Booking Confirmed - BraidsbyEva`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">🎉 Booking Confirmed!</h2>
        
        <p>Dear ${bookingData.customer_name},</p>
        
        <p>Thank you for choosing BraidsbyEva for your hair styling needs! Your appointment has been successfully booked.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📅 Appointment Details</h3>
          <p><strong>Service:</strong> ${bookingData.service_name}</p>
          <p><strong>Date:</strong> ${appointmentDate}</p>
          <p><strong>Time:</strong> ${bookingData.appointment_time}</p>
          <p><strong>Duration:</strong> ${bookingData.service_duration}</p>
          <p><strong>Price:</strong> ${bookingData.service_price}</p>
        </div>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1565c0; margin-top: 0;">📞 Contact Information</h3>
          <p><strong>Phone:</strong> (832) 207-9386</p>
          <p><strong>Email:</strong> braidsbyevaofficial@gmail.com</p>
        </div>
        
        <p>We're excited to create beautiful, long-lasting styles for you!</p>
        
        <p>Best regards,<br>
        <strong>Awa Obaretin</strong><br>
        Professional Hair Stylist & Founder<br>
        BraidsbyEva</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Customer confirmation email sent');
    return true;
  } catch (error) {
    console.error('❌ Error sending customer email:', error);
    return false;
  }
};

// Send booking notification to Eva
const sendEvaNotification = async (bookingData) => {
  const appointmentDate = new Date(bookingData.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mailOptions = {
    from: 'braidsbyevaofficial@gmail.com',
    to: 'braidsbyevaofficial@gmail.com',
    subject: `📅 New Booking Received - ${bookingData.customer_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #28a745; text-align: center;">📅 New Booking Received</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">👤 Customer Information</h3>
          <p><strong>Name:</strong> ${bookingData.customer_name}</p>
          <p><strong>Email:</strong> ${bookingData.customer_email}</p>
          <p><strong>Phone:</strong> ${bookingData.customer_phone}</p>
        </div>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1565c0; margin-top: 0;">💇‍♀️ Service Details</h3>
          <p><strong>Service:</strong> ${bookingData.service_name}</p>
          <p><strong>Date:</strong> ${appointmentDate}</p>
          <p><strong>Time:</strong> ${bookingData.appointment_time}</p>
          <p><strong>Duration:</strong> ${bookingData.service_duration}</p>
          <p><strong>Price:</strong> ${bookingData.service_price}</p>
          <p><strong>Payment Method:</strong> ${bookingData.payment_method}</p>
        </div>
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">📝 Special Requests</h3>
          <p>${bookingData.notes || 'None'}</p>
        </div>
        
        <p style="background-color: #d4edda; padding: 15px; border-radius: 8px; color: #155724;">
          <strong>📞 Please contact the customer to confirm all details and provide preparation instructions.</strong>
        </p>
        
        <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
          This booking was submitted through your website.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Eva notification email sent');
    return true;
  } catch (error) {
    console.error('❌ Error sending Eva email:', error);
    return false;
  }
};

// Main function to send both emails
const sendBookingEmails = async (bookingData) => {
  try {
    console.log('📧 Sending booking confirmation emails...');
    
    // Send both emails
    const customerSent = await sendCustomerConfirmation(bookingData);
    const evaSent = await sendEvaNotification(bookingData);
    
    if (customerSent && evaSent) {
      console.log('✅ All booking emails sent successfully!');
      return {
        success: true,
        message: 'Booking confirmed! Please check your email for confirmation.'
      };
    } else {
      console.log('⚠️ Some emails failed to send, but booking is recorded');
      return {
        success: true,
        message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
      };
    }
    
  } catch (error) {
    console.error('❌ Error sending booking emails:', error);
    
    return {
      success: false,
      message: 'Booking recorded but email sending failed. Please contact us at (832) 207-9386.'
    };
  }
};

module.exports = { sendBookingEmails };
