import nodemailer from 'nodemailer';

interface BookingData {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    hairLength?: string;
    hairTexture?: string;
    previousBraids?: boolean;
    allergies?: string;
    notes?: string;
  };
  service: {
    name: string;
    price: string;
    duration: string;
  };
  date: string;
  time: string;
  paymentInfo?: {
    totalAmount: number;
    paidAmount: number;
    remainingBalance: number;
    isDeposit: boolean;
    paymentMethod: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Using Gmail SMTP (you can change this to your preferred email provider)
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'braidsbyevaofficial@gmail.com',
        pass: process.env.EMAIL_PASSWORD || '', // You'll need to set this
      },
    });
  }

  async sendBookingNotification(bookingData: BookingData): Promise<void> {
    const { customer, service, date, time, paymentInfo } = bookingData;
    
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'braidsbyevaofficial@gmail.com',
      to: 'braidsbyevaofficial@gmail.com', // Your email address
      subject: `📅 NEW BOOKING: ${service.name} - ${customer.firstName} ${customer.lastName} - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Alert</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8f9fa;
            }
            
            .email-container {
              max-width: 800px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              border-radius: 12px;
              overflow: hidden;
            }
            
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 50px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: -50px;
              right: -50px;
              width: 120px;
              height: 120px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
            }
            
            .header::after {
              content: '';
              position: absolute;
              bottom: -40px;
              left: -40px;
              width: 80px;
              height: 80px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
            }
            
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 36px;
              font-weight: 700;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              position: relative;
              z-index: 1;
            }
            
            .card {
              background: white;
              border-radius: 15px;
              padding: 30px;
              margin-bottom: 30px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              border: 1px solid #e9ecef;
            }
            
            .gradient-card {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              border: none;
            }
            
            .blue-gradient-card {
              background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
              color: white;
              border: none;
            }
            
            .pink-gradient-card {
              background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
              color: white;
              border: none;
            }
            
            .action-card {
              background: #fff3cd;
              border: 2px solid #ffc107;
              border-radius: 15px;
              padding: 30px;
              margin-bottom: 30px;
            }
            
            .reminder-card {
              background: #e8f5e8;
              border: 2px solid #28a745;
              border-radius: 15px;
              padding: 30px;
            }
            
            .step-item {
              display: flex;
              align-items: center;
              padding: 15px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-bottom: 15px;
            }
            
            .step-number {
              background: #007bff;
              color: white;
              padding: 8px 12px;
              border-radius: 50%;
              margin-right: 15px;
              font-weight: bold;
              min-width: 32px;
              text-align: center;
            }
            
            .step-number.green { background: #28a745; }
            .step-number.yellow { background: #ffc107; }
            .step-number.blue { background: #17a2b8; }
            .step-number.red { background: #dc3545; }
            
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            
            .info-item {
              background: rgba(255, 255, 255, 0.2);
              padding: 15px;
              border-radius: 10px;
              margin-bottom: 15px;
            }
            
            .footer {
              background: #f8f9fa;
              padding: 20px 30px;
              text-align: center;
              border-top: 1px solid #e9ecef;
            }
            
            @media (max-width: 600px) {
              .info-grid {
                grid-template-columns: 1fr;
              }
              
              .header h1 {
                font-size: 28px;
              }
              
              .card {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
              <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
              <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3); position: relative; z-index: 1;">
                📅 NEW BOOKING ALERT
              </h1>
              <p style="color: #ffffff; margin: 15px 0 0 0; font-size: 18px; opacity: 0.9; position: relative; z-index: 1;">
                BraidsbyEva - Professional Hair Services
              </p>
              <div style="background: rgba(255, 255, 255, 0.2); padding: 10px 20px; border-radius: 25px; display: inline-block; margin-top: 15px; position: relative; z-index: 1;">
                <span style="color: #ffffff; font-weight: bold; font-size: 14px;">Booking ID: BK-${Date.now()}</span>
              </div>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Customer Information Card -->
              <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; color: white;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center;">
                  👤 Customer Information
                </h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <div>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Full Name:</strong> ${customer.firstName} ${customer.lastName}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${customer.email}" style="color: white; text-decoration: underline;">${customer.email}</a></p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <a href="tel:${customer.phone}" style="color: white; text-decoration: underline;">${customer.phone}</a></p>
                  </div>
                  <div>
                    ${customer.hairLength ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Hair Length:</strong> ${customer.hairLength}</p>` : ''}
                    ${customer.hairTexture ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Hair Texture:</strong> ${customer.hairTexture}</p>` : ''}
                    ${customer.previousBraids ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Previous Braids:</strong> Yes</p>` : ''}
                  </div>
                </div>
                ${customer.allergies ? `<div style="background: rgba(255, 255, 255, 0.2); padding: 15px; border-radius: 8px; margin-top: 15px;"><strong>⚠️ Allergies:</strong> ${customer.allergies}</div>` : ''}
                ${customer.notes ? `<div style="background: rgba(255, 255, 255, 0.2); padding: 15px; border-radius: 8px; margin-top: 15px;"><strong>📝 Special Notes:</strong> ${customer.notes}</div>` : ''}
              </div>

              <!-- Service Details Card -->
              <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; color: white;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center;">
                  💇‍♀️ Service Details
                </h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <div>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Service:</strong> ${service.name}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Duration:</strong> ${service.duration}</p>
                  </div>
                  <div>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Total Price:</strong> ${paymentInfo ? `$${paymentInfo.totalAmount}` : service.price}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Deposit Paid:</strong> $${paymentInfo ? paymentInfo.paidAmount : 'Not provided'}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Balance Due:</strong> $${paymentInfo ? paymentInfo.remainingBalance : 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <!-- Appointment Schedule Card -->
              <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; color: white;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center;">
                  📅 Appointment Schedule
                </h2>
                <div style="text-align: center;">
                  <p style="margin: 8px 0; font-size: 20px;"><strong>Date:</strong> ${formattedDate}</p>
                  <p style="margin: 8px 0; font-size: 20px;"><strong>Time:</strong> ${time}</p>
                </div>
              </div>

              <!-- Action Items -->
              <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 30px; border-radius: 15px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #856404; display: flex; align-items: center;">
                  📞 Immediate Action Required
                </h2>
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <span style="background: #007bff; color: white; padding: 8px 12px; border-radius: 50%; margin-right: 15px; font-weight: bold;">1</span>
                    <div>
                      <strong>Contact Customer:</strong> Call or text <a href="tel:${customer.phone}" style="color: #007bff;">${customer.phone}</a> to confirm appointment details
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <span style="background: #28a745; color: white; padding: 8px 12px; border-radius: 50%; margin-right: 15px; font-weight: bold;">2</span>
                    <div>
                      <strong>Send Preparation Instructions:</strong> Email hair care guidelines and what to bring
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <span style="background: #ffc107; color: white; padding: 8px 12px; border-radius: 50%; margin-right: 15px; font-weight: bold;">3</span>
                    <div>
                      <strong>Update Calendar:</strong> Add appointment to your scheduling system
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <span style="background: #17a2b8; color: white; padding: 8px 12px; border-radius: 50%; margin-right: 15px; font-weight: bold;">4</span>
                    <div>
                      <strong>Prepare Workspace:</strong> Set up tools and materials needed for ${service.name}
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <span style="background: #dc3545; color: white; padding: 8px 12px; border-radius: 50%; margin-right: 15px; font-weight: bold;">5</span>
                    <div>
                      <strong>Confirm Payment Status:</strong> ${paymentInfo ? (paymentInfo.isDeposit ? 'Collect remaining balance of $' + paymentInfo.remainingBalance + ' on appointment day' : 'Payment completed - no additional payment needed') : 'Collect full payment on appointment day'}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Professional Reminders -->
              <div style="background: #e8f5e8; border: 2px solid #28a745; padding: 30px; border-radius: 15px;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #155724; display: flex; align-items: center;">
                  📋 Professional Reminders
                </h2>
                <div style="display: grid; gap: 10px;">
                  <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px;">
                    <span style="color: #28a745; margin-right: 10px;">✓</span>
                    <span>Arrive 15 minutes early to set up your workspace</span>
                  </div>
                  <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px;">
                    <span style="color: #28a745; margin-right: 10px;">✓</span>
                    <span>Have all necessary tools and products ready</span>
                  </div>
                  <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px;">
                    <span style="color: #28a745; margin-right: 10px;">✓</span>
                    <span>Review customer's hair history and preferences</span>
                  </div>
                  <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px;">
                    <span style="color: #28a745; margin-right: 10px;">✓</span>
                    <span>Maintain professional communication throughout the service</span>
                  </div>
                  <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px;">
                    <span style="color: #28a745; margin-right: 10px;">✓</span>
                    <span>Follow up after the appointment for feedback</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                © 2024 BraidsbyEva. All rights reserved. | Professional Hair Services
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Booking notification email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send booking notification email:', error);
      throw error;
    }
  }

  async sendCustomerConfirmation(bookingData: BookingData): Promise<void> {
    const { customer, service, date, time, paymentInfo } = bookingData;
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'braidsbyevaofficial@gmail.com',
      to: customer.email,
      subject: `✅ BOOKING CONFIRMED: ${service.name} - ${formattedDate} at ${time}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8f9fa;
            }
            
            .email-container {
              max-width: 800px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              border-radius: 12px;
              overflow: hidden;
            }
            
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 50px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: -50px;
              right: -50px;
              width: 120px;
              height: 120px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
            }
            
            .header::after {
              content: '';
              position: absolute;
              bottom: -40px;
              left: -40px;
              width: 80px;
              height: 80px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
            }
            
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 42px;
              font-weight: 700;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              position: relative;
              z-index: 1;
            }
            
            .welcome-banner {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              padding: 25px;
              border-radius: 15px;
              text-align: center;
              margin: 40px 0;
            }
            
            .greeting-card {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 10px;
              margin-bottom: 30px;
              border-left: 4px solid #667eea;
            }
            
            .appointment-card {
              background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
              color: white;
              border-radius: 15px;
              padding: 35px;
              margin-bottom: 30px;
            }
            
            .preparation-card {
              background: #fff3cd;
              border: 2px solid #ffc107;
              border-radius: 15px;
              padding: 30px;
              margin-bottom: 30px;
            }
            
            .contact-card {
              background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
              color: white;
              border-radius: 15px;
              padding: 30px;
              margin-bottom: 30px;
            }
            
            .next-steps-card {
              background: #e8f5e8;
              border: 2px solid #28a745;
              border-radius: 15px;
              padding: 30px;
              margin-bottom: 30px;
            }
            
            .excitement-card {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 15px;
              padding: 30px;
              margin-bottom: 30px;
              text-align: center;
            }
            
            .signature-card {
              text-align: center;
              padding: 30px;
              background: #f8f9fa;
              border-radius: 15px;
            }
            
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            
            .info-item {
              background: rgba(255, 255, 255, 0.2);
              padding: 15px;
              border-radius: 10px;
              margin-bottom: 15px;
            }
            
            .preparation-step {
              display: flex;
              align-items: center;
              padding: 15px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-bottom: 15px;
            }
            
            .step-number {
              background: #ffc107;
              color: white;
              padding: 8px 12px;
              border-radius: 50%;
              margin-right: 15px;
              font-weight: bold;
              min-width: 32px;
              text-align: center;
            }
            
            .next-step-item {
              display: flex;
              align-items: center;
              padding: 15px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-bottom: 15px;
            }
            
            .step-icon {
              color: #28a745;
              margin-right: 15px;
              font-size: 20px;
            }
            
            .footer {
              background: #f8f9fa;
              padding: 20px 30px;
              text-align: center;
              border-top: 1px solid #e9ecef;
            }
            
            @media (max-width: 600px) {
              .info-grid {
                grid-template-columns: 1fr;
              }
              
              .header h1 {
                font-size: 32px;
              }
              
              .appointment-card,
              .preparation-card,
              .contact-card,
              .next-steps-card,
              .excitement-card {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            
            <!-- Header -->
            <div class="header">
              <h1>✅ BOOKING CONFIRMED!</h1>
              <p style="color: #ffffff; margin: 20px 0 0 0; font-size: 20px; opacity: 0.9; position: relative; z-index: 1;">
                Thank you for choosing BraidsbyEva
              </p>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.8; position: relative; z-index: 1;">
                Professional Hair Services by Awa Obaretin
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Welcome Message -->
              <div class="welcome-banner">
                <h2 style="margin: 0; font-size: 24px;">🎉 Your appointment has been successfully booked!</h2>
              </div>

              <!-- Greeting -->
              <div class="greeting-card">
                <p style="color: #333333; font-size: 18px; line-height: 1.6; margin: 0;">
                  Dear <strong>${customer.firstName}</strong>,
                </p>
                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 15px 0 0 0;">
                  Thank you for choosing BraidsbyEva for your hair styling needs! We're thrilled to have you as our valued client and look forward to providing you with exceptional service.
                </p>
              </div>

              <!-- Appointment Details Card -->
              <div class="appointment-card">
                <h2 style="margin: 0 0 25px 0; font-size: 28px; text-align: center;">
                  📅 Your Appointment Details
                </h2>
                <div class="info-grid">
                  <div>
                    <div class="info-item">
                      <p style="margin: 0; font-size: 16px;"><strong>Service:</strong> ${service.name}</p>
                    </div>
                    <div class="info-item">
                      <p style="margin: 0; font-size: 16px;"><strong>Date:</strong> ${formattedDate}</p>
                    </div>
                    <div class="info-item">
                      <p style="margin: 0; font-size: 16px;"><strong>Time:</strong> ${time}</p>
                    </div>
                  </div>
                  <div>
                    <div class="info-item">
                      <p style="margin: 0; font-size: 16px;"><strong>Duration:</strong> ${service.duration}</p>
                    </div>
                    <div class="info-item">
                      <p style="margin: 0; font-size: 16px;"><strong>Total Investment:</strong> ${paymentInfo ? `$${paymentInfo.totalAmount}` : service.price}</p>
                    </div>
                    <div class="info-item">
                      <p style="margin: 0; font-size: 16px;"><strong>Balance Due:</strong> $${paymentInfo ? paymentInfo.remainingBalance : 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preparation Instructions -->
              <div class="preparation-card">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #856404; display: flex; align-items: center;">
                  📋 Preparation Instructions
                </h2>
                <p style="color: #856404; font-size: 16px; margin-bottom: 20px;">Please follow these important steps to ensure the best results:</p>
                <div class="preparation-step">
                  <span class="step-number">1</span>
                  <div>
                    <strong>Hair Preparation:</strong> Come with clean, dry hair (washed 24-48 hours before)
                  </div>
                </div>
                <div class="preparation-step">
                  <span class="step-number">2</span>
                  <div>
                    <strong>Remove Previous Work:</strong> Take out any existing braids, extensions, or protective styles
                  </div>
                </div>
                <div class="preparation-step">
                  <span class="step-number">3</span>
                  <div>
                    <strong>Hair Accessories:</strong> Bring a hair tie and any preferred hair accessories
                  </div>
                </div>
                <div class="preparation-step">
                  <span class="step-number">4</span>
                  <div>
                    <strong>Arrival Time:</strong> Please arrive 10-15 minutes early for consultation
                  </div>
                </div>
                <div class="preparation-step">
                  <span class="step-number">5</span>
                  <div>
                    <strong>Comfort:</strong> Wear comfortable clothing and bring entertainment (books, phone, etc.)
                  </div>
                </div>
                <div class="preparation-step">
                  <span class="step-number">6</span>
                  <div>
                    <strong>Hydration:</strong> Stay hydrated and have a light meal before your appointment
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="contact-card">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; text-align: center;">
                  📞 Contact Information
                </h2>
                <div class="info-grid" style="text-align: center;">
                  <div>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <a href="tel:8322079386" style="color: white; text-decoration: underline;">(832) 207-9386</a></p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:braidsbyevaofficial@gmail.com" style="color: white; text-decoration: underline;">braidsbyevaofficial@gmail.com</a></p>
                  </div>
                  <div>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Service Hours:</strong> By appointment only</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>
              </div>

              <!-- What Happens Next -->
              <div class="next-steps-card">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #155724; text-align: center;">
                  📋 What Happens Next?
                </h2>
                <div class="next-step-item">
                  <span class="step-icon">📞</span>
                  <div>
                    <strong>Confirmation Call:</strong> We'll contact you within 24 hours to confirm all details
                  </div>
                </div>
                <div class="next-step-item">
                  <span class="step-icon">📧</span>
                  <div>
                    <strong>Preparation Guide:</strong> You'll receive detailed hair care instructions
                  </div>
                </div>
                <div class="next-step-item">
                  <span class="step-icon">⏰</span>
                  <div>
                    <strong>Reminder:</strong> We'll send a reminder 24 hours before your appointment
                  </div>
                </div>
                <div class="next-step-item">
                  <span class="step-icon">❓</span>
                  <div>
                    <strong>Questions:</strong> Feel free to contact us anytime with questions or concerns
                  </div>
                </div>
              </div>

              <!-- Excitement Message -->
              <div class="excitement-card">
                <h2 style="margin: 0 0 15px 0; font-size: 24px;">We're excited to create beautiful, long-lasting styles for you!</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">
                  Thank you for trusting BraidsbyEva with your hair care needs. We're committed to providing you with exceptional service and stunning results.
                </p>
              </div>

              <!-- Signature -->
              <div class="signature-card">
                <p style="color: #333333; font-size: 18px; margin: 0 0 10px 0;"><strong>Best regards,</strong></p>
                <p style="color: #333333; font-size: 20px; margin: 0 0 5px 0;"><strong>Awa Obaretin</strong></p>
                <p style="color: #666666; font-size: 16px; margin: 0 0 5px 0;">Professional Hair Stylist & Founder</p>
                <p style="color: #667eea; font-size: 18px; margin: 0; font-weight: bold;">BraidsbyEva</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                © 2024 BraidsbyEva. All rights reserved. | Professional Hair Services
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Customer confirmation email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send customer confirmation email:', error);
      // Don't throw error for customer email - booking should still succeed
    }
  }
}

export default new EmailService();
