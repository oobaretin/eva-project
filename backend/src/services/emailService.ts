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
        <div style="font-family: Arial, sans-serif; max-width: 100%; width: 100%; margin: 0 auto; background: #ffffff; word-wrap: break-word; overflow-wrap: break-word;">
          <h1>📅 NEW BOOKING ALERT</h1>
          <p>BraidsbyEva - Professional Hair Services</p>
          <p>Booking ID: BK-${Date.now()}</p>
          
          <h2>📅 Appointment Details</h2>
          
          <h3>👤 Customer Information</h3>
          <p><strong>Full Name:</strong> ${customer.firstName} ${customer.lastName}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          ${customer.hairLength ? `<p><strong>Hair Length:</strong> ${customer.hairLength}</p>` : ''}
          ${customer.hairTexture ? `<p><strong>Hair Texture:</strong> ${customer.hairTexture}</p>` : ''}
          ${customer.previousBraids ? `<p><strong>Previous Braids:</strong> Yes</p>` : ''}
          ${customer.allergies ? `<p><strong>⚠️ Allergies:</strong> ${customer.allergies}</p>` : ''}
          ${customer.notes ? `<p><strong>📝 Special Notes:</strong> ${customer.notes}</p>` : ''}

          <h3>💇‍♀️ Service Details</h3>
          <p><strong>Service:</strong> ${service.name}</p>
          <p><strong>Total Price:</strong> ${paymentInfo ? `$${paymentInfo.totalAmount}` : service.price}</p>
          <p><strong>Deposit Paid:</strong> $${paymentInfo ? paymentInfo.paidAmount : 'Not provided'}</p>
          <p><strong>Balance Due:</strong> $${paymentInfo ? paymentInfo.remainingBalance : 'Not provided'}</p>
          <p><strong>Duration:</strong> ${service.duration}</p>

          <h3>📅 Appointment Schedule</h3>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>

          <h3>📞 Immediate Action Required</h3>
          <ul>
            <li><strong>1. Contact Customer:</strong> Call or text ${customer.phone} to confirm appointment details</li>
            <li><strong>2. Send Preparation Instructions:</strong> Email hair care guidelines and what to bring</li>
            <li><strong>3. Update Calendar:</strong> Add appointment to your scheduling system</li>
            <li><strong>4. Prepare Workspace:</strong> Set up tools and materials needed for ${service.name}</li>
            <li><strong>5. Confirm Payment Status:</strong> ${paymentInfo ? (paymentInfo.isDeposit ? 'Collect remaining balance of $' + paymentInfo.remainingBalance + ' on appointment day' : 'Payment completed - no additional payment needed') : 'Collect full payment on appointment day'}</li>
          </ul>
          
          <h3>📋 Professional Reminders</h3>
          <ul>
            <li>Arrive 15 minutes early to set up your workspace</li>
            <li>Have all necessary tools and products ready</li>
            <li>Review customer's hair history and preferences</li>
            <li>Maintain professional communication throughout the service</li>
            <li>Follow up after the appointment for feedback</li>
          </ul>
        </div>
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

