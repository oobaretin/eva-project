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
    this.transporter = nodemailer.createTransport({
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
        <div style="font-family: Arial, sans-serif; max-width: 100%; width: 100%; margin: 0 auto; background: #ffffff; word-wrap: break-word; overflow-wrap: break-word;">
          <h1>✅ BOOKING CONFIRMED!</h1>
          <p>Thank you for choosing BraidsbyEva</p>
          <p>Professional Hair Services by Awa Obaretin</p>
          
          <p>🎉 Your appointment has been successfully booked!</p>
          
          <p>Dear ${customer.firstName},</p>
          
          <p>Thank you for choosing BraidsbyEva for your hair styling needs! We're thrilled to have you as our valued client and look forward to providing you with exceptional service.</p>
          
          <h3>📅 Your Appointment Details</h3>
          <p><strong>Service:</strong> ${service.name}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Duration:</strong> ${service.duration}</p>
          <p><strong>Total Investment:</strong> ${paymentInfo ? `$${paymentInfo.totalAmount}` : service.price}</p>
          <p><strong>Deposit Paid:</strong> $${paymentInfo ? paymentInfo.paidAmount : 'Not provided'}</p>
          <p><strong>Balance Due:</strong> $${paymentInfo ? paymentInfo.remainingBalance : 'Not provided'}</p>

          <h3>📋 Preparation Instructions</h3>
          <p>Please follow these important steps to ensure the best results:</p>
          <ul>
            <li><strong>Hair Preparation:</strong> Come with clean, dry hair (washed 24-48 hours before)</li>
            <li><strong>Remove Previous Work:</strong> Take out any existing braids, extensions, or protective styles</li>
            <li><strong>Hair Accessories:</strong> Bring a hair tie and any preferred hair accessories</li>
            <li><strong>Arrival Time:</strong> Please arrive 10-15 minutes early for consultation</li>
            <li><strong>Comfort:</strong> Wear comfortable clothing and bring entertainment (books, phone, etc.)</li>
            <li><strong>Hydration:</strong> Stay hydrated and have a light meal before your appointment</li>
          </ul>

          <h3>📞 Contact Information</h3>
          <p><strong>Phone:</strong> (832) 207-9386</p>
          <p><strong>Email:</strong> braidsbyevaofficial@gmail.com</p>
          <p><strong>Service Hours:</strong> By appointment only</p>
          <p><strong>Response Time:</strong> Within 24 hours</p>

          <h3>📋 What Happens Next?</h3>
          <ul>
            <li><strong>Confirmation Call:</strong> We'll contact you within 24 hours to confirm all details</li>
            <li><strong>Preparation Guide:</strong> You'll receive detailed hair care instructions</li>
            <li><strong>Reminder:</strong> We'll send a reminder 24 hours before your appointment</li>
            <li><strong>Questions:</strong> Feel free to contact us anytime with questions or concerns</li>
          </ul>
          
          <p><strong>We're excited to create beautiful, long-lasting styles for you!</strong></p>
          
          <p>Thank you for trusting BraidsbyEva with your hair care needs. We're committed to providing you with exceptional service and stunning results.</p>
          
          <p><strong>Best regards,</strong></p>
          <p><strong>Awa Obaretin</strong></p>
          <p>Professional Hair Stylist & Founder</p>
          <p>BraidsbyEva</p>
        </div>
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

