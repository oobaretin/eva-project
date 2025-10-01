import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      service_name,
      service_price,
      service_duration,
      appointment_date,
      appointment_time,
      customer_name,
      customer_email,
      customer_phone,
      notes
    } = req.body;

    console.log('📧 Email service called with:', {
      service_name,
      customer_name,
      customer_email,
      appointment_date,
      appointment_time
    });

    // Use the original working Gmail setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'braidsbyevaofficial@gmail.com',
        pass: 'dlrj tzws keuv wsdg' // Your working app password
      }
    });

    // Format date
    const formattedDate = new Date(appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Customer email with improved template
    const customerEmail = {
      from: 'BraidsbyEva <braidsbyevaofficial@gmail.com>',
      to: customer_email,
      subject: '✨ Appointment Confirmed - BraidsbyEva',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .appointment-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .preparation { background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .contact { background: #e8f5e8; border: 2px solid #28a745; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
            h1 { margin: 0; font-size: 28px; }
            h2 { color: #333; margin-top: 0; }
            .step { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
            .step-number { background: #ffc107; color: white; padding: 5px 10px; border-radius: 50%; margin-right: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ BOOKING CONFIRMED!</h1>
              <p>Thank you for choosing BraidsbyEva</p>
              <p>Professional Hair Services by Awa Obaretin</p>
            </div>
            
            <div class="content">
              <h2>🎉 Your appointment has been successfully booked!</h2>
              
              <p>Dear <strong>${customer_name}</strong>,</p>
              
              <p>Thank you for choosing BraidsbyEva for your hair styling needs! We're thrilled to have you as our valued client and look forward to providing you with exceptional service.</p>
              
              <div class="appointment-details">
                <h2>📅 Your Appointment Details</h2>
                <p><strong>Service:</strong> ${service_name || 'Braiding Service'}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${appointment_time}</p>
                <p><strong>Duration:</strong> ${service_duration || 'Not specified'}</p>
                <p><strong>Price:</strong> ${service_price || 'Contact for pricing'}</p>
                <p><strong>Location:</strong> Katy, Texas</p>
                ${notes ? `<p><strong>Your Notes:</strong> ${notes}</p>` : ''}
              </div>
              
              <div class="preparation">
                <h2>📋 Preparation Instructions</h2>
                <p>Please follow these important steps to ensure the best results:</p>
                <div class="step">
                  <span class="step-number">1</span>
                  <strong>Hair Preparation:</strong> Come with clean, dry hair (washed 24-48 hours before)
                </div>
                <div class="step">
                  <span class="step-number">2</span>
                  <strong>Remove Previous Work:</strong> Take out any existing braids, extensions, or protective styles
                </div>
                <div class="step">
                  <span class="step-number">3</span>
                  <strong>Hair Accessories:</strong> Bring a hair tie and any preferred hair accessories
                </div>
                <div class="step">
                  <span class="step-number">4</span>
                  <strong>Arrival Time:</strong> Please arrive 10-15 minutes early for consultation
                </div>
                <div class="step">
                  <span class="step-number">5</span>
                  <strong>Comfort:</strong> Wear comfortable clothing and bring entertainment (books, phone, etc.)
                </div>
                <div class="step">
                  <span class="step-number">6</span>
                  <strong>Hydration:</strong> Stay hydrated and have a light meal before your appointment
                </div>
              </div>
              
              <div class="contact">
                <h2>📞 Contact Information</h2>
                <p><strong>Phone:</strong> <a href="tel:8322079386">(832) 207-9386</a></p>
                <p><strong>Email:</strong> <a href="mailto:braidsbyevaofficial@gmail.com">braidsbyevaofficial@gmail.com</a></p>
                <p><strong>Service Hours:</strong> By appointment only</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
              </div>
              
              <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h4 style="margin-top: 0; color: #1e40af;">💳 Payment Information</h4>
                <p style="margin: 5px 0; color: #1e40af;"><strong>Payment is due on the day of your appointment.</strong></p>
                <p style="margin: 5px 0; color: #1e40af;"><strong>We accept:</strong> Cash and Zelle</p>
                <p style="margin: 5px 0; color: #1e40af;"><strong>Zelle:</strong> (832) 207-9386</p>
              </div>
              
              <p><strong>We're excited to create beautiful, long-lasting styles for you!</strong></p>
              <p>Thank you for trusting BraidsbyEva with your hair care needs. We're committed to providing you with exceptional service and stunning results.</p>
              
              <p><strong>Best regards,</strong><br>
              <strong>Awa Obaretin</strong><br>
              Professional Hair Stylist & Founder<br>
              <strong>BraidsbyEva</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 BraidsbyEva. All rights reserved. | Professional Hair Services</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Braider email with improved template
    const braiderEmail = {
      from: 'BraidsbyEva Bookings <braidsbyevaofficial@gmail.com>',
      to: 'braidsbyevaofficial@gmail.com',
      subject: `🔔 New Booking: ${customer_name} - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Alert</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .customer-info { background: #f093fb; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .service-info { background: #4facfe; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .action-items { background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .reminders { background: #e8f5e8; border: 2px solid #28a745; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
            h1 { margin: 0; font-size: 24px; }
            h2 { color: #333; margin-top: 0; }
            .action-step { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
            .step-number { background: #007bff; color: white; padding: 5px 10px; border-radius: 50%; margin-right: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 NEW BOOKING ALERT</h1>
              <p>BraidsbyEva - Professional Hair Services</p>
              <p>Booking ID: BK-${Date.now()}</p>
            </div>
            
            <div class="content">
              <div class="customer-info">
                <h2>👤 Customer Information</h2>
                <p><strong>Full Name:</strong> ${customer_name}</p>
                <p><strong>Email:</strong> <a href="mailto:${customer_email}" style="color: white;">${customer_email}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${customer_phone}" style="color: white;">${customer_phone}</a></p>
                ${notes ? `<p><strong>Special Notes:</strong> ${notes}</p>` : ''}
              </div>
              
              <div class="service-info">
                <h2>💇‍♀️ Service Details</h2>
                <p><strong>Service:</strong> ${service_name || 'Braiding Service'}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${appointment_time}</p>
                <p><strong>Duration:</strong> ${service_duration || 'Not specified'}</p>
                <p><strong>Price:</strong> ${service_price || 'Contact for pricing'}</p>
                <p><strong>Location:</strong> Katy, Texas</p>
              </div>
              
              <div class="action-items">
                <h2>📞 Immediate Action Required</h2>
                <div class="action-step">
                  <span class="step-number">1</span>
                  <strong>Contact Customer:</strong> Call or text <a href="tel:${customer_phone}">${customer_phone}</a> to confirm appointment details
                </div>
                <div class="action-step">
                  <span class="step-number">2</span>
                  <strong>Send Preparation Instructions:</strong> Email hair care guidelines and what to bring
                </div>
                <div class="action-step">
                  <span class="step-number">3</span>
                  <strong>Update Calendar:</strong> Add appointment to your scheduling system
                </div>
                <div class="action-step">
                  <span class="step-number">4</span>
                  <strong>Prepare Workspace:</strong> Set up tools and materials needed for ${service_name || 'Braiding Service'}
                </div>
                <div class="action-step">
                  <span class="step-number">5</span>
                  <strong>Confirm Payment Status:</strong> Collect payment on appointment day
                </div>
              </div>
              
              <div class="reminders">
                <h2>📋 Professional Reminders</h2>
                <p>✓ Arrive 15 minutes early to set up your workspace</p>
                <p>✓ Have all necessary tools and products ready</p>
                <p>✓ Review customer's hair history and preferences</p>
                <p>✓ Maintain professional communication throughout the service</p>
                <p>✓ Follow up after the appointment for feedback</p>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2024 BraidsbyEva. All rights reserved. | Professional Hair Services</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log('📧 Sending emails...');
    
    // Send both emails using the original working method
    const results = await Promise.all([
      transporter.sendMail(customerEmail),
      transporter.sendMail(braiderEmail)
    ]);

    console.log('✅ Emails sent successfully:', {
      customerEmail: results[0].messageId,
      braiderEmail: results[1].messageId
    });

    res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully',
      customerEmail: customer_email,
      braiderEmail: 'braidsbyevaofficial@gmail.com',
      messageIds: {
        customer: results[0].messageId,
        braider: results[1].messageId
      }
    });

  } catch (error) {
    console.error('❌ Error sending emails:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send emails',
      error: error.message 
    });
  }
}