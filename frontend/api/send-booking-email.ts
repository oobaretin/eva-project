import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    console.log('📧 Received booking email request');
    console.log('Environment check:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS
    });

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

    if (!customer_name || !customer_email || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Missing email credentials');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">🎉 Appointment Confirmed!</h1>
              <p style="margin: 10px 0 0 0;">BraidsbyEva - Professional Braiding Services</p>
            </div>
            
            <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <p>Hi ${customer_name},</p>
              
              <p>Thank you for booking with BraidsbyEva! We're excited to create a beautiful style for you.</p>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #f97316;">Appointment Details</h3>
                <table style="width: 100%;">
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Service:</strong></td><td style="text-align: right;">${service_name || 'Braiding Service'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Date:</strong></td><td style="text-align: right;">${formattedDate}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Time:</strong></td><td style="text-align: right;">${appointment_time}</td></tr>
                  ${service_price ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Price:</strong></td><td style="text-align: right;">${service_price}</td></tr>` : ''}
                  ${service_duration ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Duration:</strong></td><td style="text-align: right;">${service_duration}</td></tr>` : ''}
                </table>
                ${notes ? `<p style="margin-top: 15px;"><strong>Your Notes:</strong><br>${notes}</p>` : ''}
              </div>
              
              <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #1e40af;">💳 Payment Information</h4>
                <p style="margin: 5px 0;">Payment is due on the day of your appointment.</p>
                <p style="margin: 5px 0;"><strong>We accept:</strong> Cash and Zelle</p>
                <p style="margin: 5px 0;"><strong>Zelle:</strong> (832) 207-9386</p>
              </div>
              
              <p><strong>Location:</strong> Katy, Texas</p>
              
              <p style="margin-top: 25px;">If you need to reschedule or have questions:</p>
              <p style="margin: 5px 0;">📞 <strong>(832) 207-9386</strong></p>
              <p style="margin: 5px 0;">📧 <strong>braidsbyevaofficial@gmail.com</strong></p>
              
              <p style="margin-top: 25px;">Looking forward to seeing you!</p>
              <p><strong>Eva & Team</strong><br>BraidsbyEva</p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
              <p>BraidsbyEva - Professional Braiding Services</p>
              <p>Katy, Texas | (832) 207-9386</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to Eva
    const braiderEmail = {
      from: `BraidsbyEva Bookings <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔔 New Booking: ${customer_name} - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">📅 New Appointment!</h1>
              <p style="margin: 10px 0 0 0;">A new customer has booked</p>
            </div>
            
            <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981;">
                <h3 style="margin-top: 0; color: #10b981;">Customer Information</h3>
                <table style="width: 100%;">
                  <tr><td style="padding: 8px 0; color: #065f46;"><strong>Name:</strong></td><td style="text-align: right;"><strong>${customer_name}</strong></td></tr>
                  <tr><td style="padding: 8px 0; color: #065f46;"><strong>Phone:</strong></td><td style="text-align: right;"><a href="tel:${customer_phone}">${customer_phone}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #065f46;"><strong>Email:</strong></td><td style="text-align: right;"><a href="mailto:${customer_email}">${customer_email}</a></td></tr>
                </table>
              </div>
              
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981;">
                <h3 style="margin-top: 0; color: #10b981;">Appointment Details</h3>
                <table style="width: 100%;">
                  <tr><td style="padding: 8px 0; color: #065f46;"><strong>Service:</strong></td><td style="text-align: right;"><strong>${service_name || 'Braiding Service'}</strong></td></tr>
                  <tr><td style="padding: 8px 0; color: #065f46;"><strong>Date:</strong></td><td style="text-align: right;"><strong>${formattedDate}</strong></td></tr>
                  <tr><td style="padding: 8px 0; color: #065f46;"><strong>Time:</strong></td><td style="text-align: right;"><strong>${appointment_time}</strong></td></tr>
                  ${service_price ? `<tr><td style="padding: 8px 0; color: #065f46;"><strong>Price:</strong></td><td style="text-align: right;">${service_price}</td></tr>` : ''}
                  ${service_duration ? `<tr><td style="padding: 8px 0; color: #065f46;"><strong>Duration:</strong></td><td style="text-align: right;">${service_duration}</td></tr>` : ''}
                </table>
                ${notes ? `<div style="margin-top: 15px; background: white; padding: 10px; border-radius: 4px;"><strong>Special Notes:</strong><br>${notes}</div>` : ''}
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0;"><strong>⚠️ Action Required:</strong> Contact customer to confirm appointment.</p>
              </div>
              
              <p style="text-align: center; margin-top: 30px;">
                <a href="tel:${customer_phone}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 5px;">📞 Call</a>
                <a href="sms:${customer_phone}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 5px;">💬 Text</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log('📤 Sending emails...');
    await Promise.all([
      transporter.sendMail(customerEmail),
      transporter.sendMail(braiderEmail),
    ]);

    console.log('✅ Emails sent successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Booking emails sent successfully' 
    });

  } catch (error) {
    console.error('❌ Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send emails',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}