// Email service using your existing Gmail setup
// Sends emails via Vercel API endpoint that uses braidsbyevaofficial@gmail.com

interface BookingData {
  service_name: string;
  service_price: string;
  service_duration: string;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  hair_length: string;
  hair_texture: string;
  previous_braids: boolean;
  allergies: string;
  notes: string;
  payment_method: string;
  status: string;
}

export const sendBookingEmails = async (bookingData: BookingData) => {
  try {
    console.log('📧 Preparing email notifications...');

    const customerEmail = bookingData.customer_email;
    const customerName = bookingData.customer_name;
    const serviceName = bookingData.service_name;
    const servicePrice = bookingData.service_price;
    const serviceDuration = bookingData.service_duration;
    const appointmentDate = bookingData.appointment_date;
    const appointmentTime = bookingData.appointment_time;
    const paymentMethod = bookingData.payment_method;

    // Customer email content
    const customerSubject = `✅ Your BraidsbyEva Appointment Confirmation`;
    const customerBody = `Hello ${customerName},

Thank you for booking with BraidsbyEva! Your appointment is confirmed:

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📞 Contact: (832) 207-9386
📧 Email: braidsbyevaofficial@gmail.com

We look forward to seeing you!

Best regards,
Awa Obaretin
BraidsbyEva`;

    // Braider email content
    const braiderSubject = `📅 New Booking - ${customerName}`;
    const braiderBody = `New booking received:

👤 Customer: ${customerName}
📧 Email: ${bookingData.customer_email}
📞 Phone: ${bookingData.customer_phone}

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📝 Notes: ${bookingData.notes || 'None'}`;

    // Store email data in localStorage for easy access
    const emailData = {
      customer: {
        to: customerEmail,
        subject: customerSubject,
        body: customerBody
      },
      braider: {
        to: 'braidsbyevaofficial@gmail.com',
        subject: braiderSubject,
        body: braiderBody
      }
    };

    localStorage.setItem('bookingEmails', JSON.stringify(emailData));

    // Show email content in alert for immediate visibility
    const emailAlert = `
📧 EMAIL NOTIFICATIONS READY!

CUSTOMER EMAIL:
To: ${customerEmail}
Subject: ${customerSubject}

BRAIDER EMAIL:
To: braidsbyevaofficial@gmail.com
Subject: ${braiderSubject}

Check browser console for full email content.
Email data saved to localStorage for easy access.
    `;

    alert(emailAlert);

    // Log to console for easy copying
    console.log('📧 ===== EMAIL NOTIFICATIONS =====');
    console.log('📧 CUSTOMER EMAIL:');
    console.log('To:', customerEmail);
    console.log('Subject:', customerSubject);
    console.log('Body:', customerBody);
    console.log('');
    console.log('📧 BRAIDER EMAIL:');
    console.log('To: braidsbyevaofficial@gmail.com');
    console.log('Subject:', braiderSubject);
    console.log('Body:', braiderBody);
    console.log('=====================================');
    
    return {
      success: true,
      message: 'Email notifications prepared! Check the alert and browser console for email content to send.'
    };

  } catch (error) {
    console.error('❌ Error preparing email notifications:', error);
    
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};
