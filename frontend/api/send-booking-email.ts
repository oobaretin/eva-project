import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      notes,
    } = req.body;

    // Validate required fields
    if (!customer_name || !customer_email || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format date for better readability
    const formattedDate = new Date(appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Email to Customer
    const customerEmail = {
      from: `BraidsbyEva <${process.env.EMAIL_USER}>`,
      to: customer_email,
      subject: '✨ Appointment Confirmed - BraidsbyEva',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #111827; }
            .payment-box { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎉 Appointment Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">BraidsbyEva - Professional Braiding Services</p>
            </div>
            
            <div class="content">
              <p>Hi ${customer_name},</p>
              
              <p>Thank you for booking with BraidsbyEva! We're excited to create a beautiful style for you.</p>
              
              <div class="details">
                <h3 style="margin-top: 0; color: #f97316;">Appointment Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span class="detail-value">${service_name || 'Braiding Service'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${formattedDate}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${appointment_time}</span>
                </div>
                ${service_price ? `
                <div class="detail-row">
                  <span class="detail-label">Price:</span>
                  <span class="detail-value">${service_price}</span>
                </div>
                ` : ''}
                ${service_duration ? `
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${service_duration}</span>
                </div>
                ` : ''}
                ${notes ? `
                <div class="detail-row">
                  <span class="detail-label">Notes:</span>
                  <span class="detail-value">${notes}</span>
                </div>
                ` : ''}
              </div>
              
              <div class="payment-box">
                <h4 style="margin-top: 0; color: #1e40af;">💳 Payment Information</h4>
                <p style="margin: 5px 0;">Payment is due on the day of your appointment.</p>
                <p style="margin: 5px 0;"><strong>We accept:</strong> Cash and Zelle</p>
                <p style="margin: 5px 0;"><strong>Zelle:</strong> (832) 207-9386</p>
              </div>
              
              <p><strong>Location:</strong> Katy, Texas (address will be shared upon confirmation)</p>
              
              <p style="margin-top: 25px;">If you need to reschedule or have any questions, please contact us:</p>
              <p style="margin: 5px 0;">📞 <strong>(832) 207-9386</strong></p>
              <p style="margin: 5px 0;">📧 <strong>braidsbyevaofficial@gmail.com</strong></p>
              
              <p style="margin-top: 25px;">Looking forward to seeing you!</p>
              <p><strong>Eva & Team</strong><br>BraidsbyEva</p>
            </div>
            
            <div class="footer">
              <p>BraidsbyEva - Professional Braiding Services</p>
              <p>Katy, Texas | (832) 207-9386 | braidsbyevaofficial@gmail.com</p>
              <p style="font-size: 12px; color: #9ca3af;">© 2025 BraidsbyEva. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to Eva (Braider)
    const braiderEmail = {
      from: `BraidsbyEva Bookings <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔔 New Booking: ${customer_name} - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .details { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #d1fae5; }
            .detail-label { font-weight: 600; color: #065f46; }
            .detail-value { color: #111827; font-weight: 500; }
            .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">📅 New Appointment Booked!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">A new customer has scheduled an appointment</p>
            </div>
            
            <div class="content">
              <div class="details">
                <h3 style="margin-top: 0; color: #10b981;">Customer Information</h3>
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${customer_name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value"><a href="tel:${customer_phone}">${customer_phone}</a></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value"><a href="mailto:${customer_email}">${customer_email}</a></span>
                </div>
              </div>
              
              <div class="details">
                <h3 style="margin-top: 0; color: #10b981;">Appointment Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span class="detail-value">${service_name || 'Braiding Service'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${formattedDate}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${appointment_time}</span>
                </div>
                ${service_price ? `
                <div class="detail-row">
                  <span class="detail-label">Price:</span>
                  <span class="detail-value">${service_price}</span>
                </div>
                ` : ''}
                ${service_duration ? `
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${service_duration}</span>
                </div>
                ` : ''}
                ${notes ? `
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Special Notes:</span>
                </div>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 10px;">
                  <p style="margin: 0; white-space: pre-wrap;">${notes}</p>
                </div>
                ` : ''}
              </div>
              
              <div class="alert">
                <p style="margin: 0;"><strong>⚠️ Action Required:</strong> Please contact the customer to confirm this appointment.</p>
              </div>
              
              <p style="text-align: center; margin-top: 30px;">
                <a href="tel:${customer_phone}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 5px;">📞 Call Customer</a>
                <a href="sms:${customer_phone}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 5px;">💬 Text Customer</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerEmail),
      transporter.sendMail(braiderEmail),
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Booking emails sent successfully' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send booking emails',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
