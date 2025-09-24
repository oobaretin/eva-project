"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'braidsbyeva@gmail.com',
                pass: process.env.EMAIL_PASSWORD || '',
            },
        });
    }
    async sendBookingNotification(bookingData) {
        const { customer, service, date, time } = bookingData;
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const mailOptions = {
            from: process.env.EMAIL_USER || 'braidsbyeva@gmail.com',
            to: 'braidsbyeva@gmail.com',
            subject: `🎉 New Booking: ${service.name} - ${customer.firstName} ${customer.lastName}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f2760b, #ff8c42); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🎉 New Booking Received!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">BraidsbyEva Booking System</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">📅 Appointment Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #f2760b; margin-top: 0;">👤 Customer Information</h3>
              <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${customer.email}" style="color: #f2760b;">${customer.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${customer.phone}" style="color: #f2760b;">${customer.phone}</a></p>
              ${customer.hairLength ? `<p><strong>Hair Length:</strong> ${customer.hairLength}</p>` : ''}
              ${customer.hairTexture ? `<p><strong>Hair Texture:</strong> ${customer.hairTexture}</p>` : ''}
              ${customer.previousBraids ? `<p><strong>Previous Braids:</strong> Yes</p>` : ''}
              ${customer.allergies ? `<p><strong>Allergies:</strong> ${customer.allergies}</p>` : ''}
              ${customer.notes ? `<p><strong>Notes:</strong> ${customer.notes}</p>` : ''}
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #f2760b; margin-top: 0;">💇‍♀️ Service Details</h3>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Price:</strong> ${service.price}</p>
              <p><strong>Duration:</strong> ${service.duration}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #f2760b; margin-top: 0;">📅 Appointment Schedule</h3>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>

            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
              <p style="margin: 0; color: #155724;"><strong>📞 Next Steps:</strong></p>
              <ul style="margin: 10px 0 0 0; color: #155724;">
                <li>Contact the customer to confirm the appointment</li>
                <li>Send them preparation instructions</li>
                <li>Add the appointment to your calendar</li>
              </ul>
            </div>
          </div>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ Booking notification email sent successfully');
        }
        catch (error) {
            console.error('❌ Failed to send booking notification email:', error);
            throw error;
        }
    }
    async sendCustomerConfirmation(bookingData) {
        const { customer, service, date, time } = bookingData;
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const mailOptions = {
            from: process.env.EMAIL_USER || 'braidsbyeva@gmail.com',
            to: customer.email,
            subject: `✅ Booking Confirmation - ${service.name} with BraidsbyEva`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f2760b, #ff8c42); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">✅ Booking Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing BraidsbyEva</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Hi ${customer.firstName},</p>
            
            <p>Thank you for booking with BraidsbyEva! We're excited to work with you.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #f2760b; margin-top: 0;">📅 Your Appointment</h3>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Duration:</strong> ${service.duration}</p>
              <p><strong>Price:</strong> ${service.price}</p>
            </div>

            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <p style="margin: 0; color: #856404;"><strong>📋 Preparation Instructions:</strong></p>
              <ul style="margin: 10px 0 0 0; color: #856404;">
                <li>Come with clean, dry hair</li>
                <li>Remove any previous braids or extensions</li>
                <li>Bring a hair tie to secure your hair during the process</li>
                <li>Arrive 10 minutes early</li>
              </ul>
            </div>

            <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; border-left: 4px solid #17a2b8;">
              <p style="margin: 0; color: #0c5460;"><strong>📞 Contact Information:</strong></p>
              <p style="margin: 5px 0 0 0; color: #0c5460;">
                Phone: <a href="tel:+18322079386" style="color: #f2760b;">(832) 207-9386</a><br>
                Email: <a href="mailto:braidsbyeva@gmail.com" style="color: #f2760b;">braidsbyeva@gmail.com</a>
              </p>
            </div>

            <p>We'll contact you within 24 hours to confirm your appointment and provide any additional details.</p>
            
            <p>Looking forward to seeing you soon!</p>
            
            <p>Best regards,<br>Awa Obaretin<br>BraidsbyEva</p>
          </div>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ Customer confirmation email sent successfully');
        }
        catch (error) {
            console.error('❌ Failed to send customer confirmation email:', error);
        }
    }
}
exports.default = new EmailService();
//# sourceMappingURL=emailService.js.map