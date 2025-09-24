const nodemailer = require('nodemailer');

// Create transporter using your existing Gmail setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'braidsbyevaofficial@gmail.com',
    pass: 'dlrj tzws keuv wsdg' // Your Gmail app password
  }
});

// Send booking confirmation to customer
const sendCustomerConfirmation = async (bookingData) => {
  try {
    const mailOptions = {
      from: 'braidsbyevaofficial@gmail.com',
      to: bookingData.customer_email,
      subject: `🎉 Booking Confirmed! - ${bookingData.service_name}`,
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
                Dear <strong>${bookingData.customer_first_name}</strong>,
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
                    <span style="color: #666666; font-weight: 500;">Price:</span>
                    <span style="color: #28a745; font-weight: bold; font-size: 18px;">${bookingData.service_price}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Duration:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_duration}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Date:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.appointment_date}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Time:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.appointment_time}</span>
                  </div>
                </div>
              </div>

              <!-- Preparation Instructions -->
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 25px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">✨ Preparation Instructions</h3>
                <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Please arrive with clean, dry hair</li>
                  <li>Remove any previous braids or extensions</li>
                  <li>Bring your own hair products if you have specific preferences</li>
                  <li>Eat before your appointment (braiding can take several hours)</li>
                  <li>Bring a book or device for entertainment</li>
                  <li>Wear comfortable clothing</li>
                </ul>
              </div>

              <!-- Contact Information -->
              <div style="background-color: #e3f2fd; border: 1px solid #bbdefb; padding: 25px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #1565c0; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Information</h3>
                <div style="color: #1565c0; line-height: 1.8;">
                  <p style="margin: 5px 0;"><strong>Braider:</strong> Awa Obaretin</p>
                  <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:8322079386" style="color: #1565c0; text-decoration: none;">(832) 207-9386</a></p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:braidsbyevaofficial@gmail.com" style="color: #1565c0; text-decoration: none;">braidsbyevaofficial@gmail.com</a></p>
                </div>
              </div>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                If you need to reschedule or have any questions, please contact us at least 24 hours in advance.
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                We look forward to seeing you soon!
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong>Awa Obaretin</strong><br>
                <em>Professional Braider</em><br>
                <strong>BraidsbyEva</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                © 2024 BraidsbyEva. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Customer confirmation email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending customer email:', error);
    throw error;
  }
};

// Send booking notification to Eva
const sendEvaNotification = async (bookingData) => {
  try {
    const mailOptions = {
      from: 'braidsbyevaofficial@gmail.com',
      to: 'braidsbyevaofficial@gmail.com',
      subject: `📅 New Booking: ${bookingData.service_name} - ${bookingData.customer_first_name} ${bookingData.customer_last_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Notification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                📅 New Booking Received!
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                You have a new appointment scheduled
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Service Details -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 25px; margin: 0 0 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 20px;">💇‍♀️ Service Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Service:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_name}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Price:</span>
                    <span style="color: #28a745; font-weight: bold; font-size: 18px;">${bookingData.service_price}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Duration:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.service_duration}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Date:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.appointment_date}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666666; font-weight: 500;">Time:</span>
                    <span style="color: #333333; font-weight: bold;">${bookingData.appointment_time}</span>
                  </div>
                </div>
              </div>

              <!-- Customer Information -->
              <div style="background-color: #e3f2fd; border: 1px solid #bbdefb; padding: 25px; margin: 0 0 30px 0; border-radius: 8px;">
                <h3 style="color: #1565c0; margin: 0 0 20px 0; font-size: 18px;">👤 Customer Information</h3>
                <div style="color: #1565c0; line-height: 1.8;">
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${bookingData.customer_first_name} ${bookingData.customer_last_name}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${bookingData.customer_email}" style="color: #1565c0; text-decoration: none;">${bookingData.customer_email}</a></p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${bookingData.customer_phone}" style="color: #1565c0; text-decoration: none;">${bookingData.customer_phone}</a></p>
                  <p style="margin: 8px 0;"><strong>Hair Length:</strong> ${bookingData.customer_hair_length || 'Not specified'}</p>
                  <p style="margin: 8px 0;"><strong>Hair Texture:</strong> ${bookingData.customer_hair_texture || 'Not specified'}</p>
                  <p style="margin: 8px 0;"><strong>Previous Braids:</strong> ${bookingData.customer_previous_braids ? 'Yes' : 'No'}</p>
                  <p style="margin: 8px 0;"><strong>Allergies:</strong> ${bookingData.customer_allergies || 'None'}</p>
                </div>
              </div>

              <!-- Special Requests -->
              ${bookingData.customer_notes ? `
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 25px; margin: 0 0 30px 0; border-radius: 8px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">📝 Special Requests</h3>
                <p style="color: #856404; margin: 0; line-height: 1.6; font-style: italic;">
                  "${bookingData.customer_notes}"
                </p>
              </div>
              ` : ''}

              <!-- Action Items -->
              <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 25px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #721c24; margin: 0 0 15px 0; font-size: 18px;">✅ Action Items</h3>
                <ul style="color: #721c24; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Confirm appointment details with customer</li>
                  <li>Prepare necessary supplies and tools</li>
                  <li>Set up workspace for the appointment</li>
                  <li>Review any special requests or requirements</li>
                </ul>
              </div>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                <strong>Booking ID:</strong> ${bookingData.id || 'N/A'}<br>
                <strong>Received:</strong> ${new Date().toLocaleString()}
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                © 2024 BraidsbyEva. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Eva notification email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending Eva email:', error);
    throw error;
  }
};

module.exports = {
  sendCustomerConfirmation,
  sendEvaNotification
};
