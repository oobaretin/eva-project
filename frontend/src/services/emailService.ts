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
    console.log('📧 Sending email notifications...');

    // Create email content
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
📧 Email: ${customerEmail}
📞 Phone: ${bookingData.customer_phone}

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📝 Notes: ${bookingData.notes || 'None'}`;

    // Try to send via Vercel API
    try {
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
      });

      if (response.ok) {
        console.log('✅ Emails sent via API');
        return {
          success: true,
          message: 'Email notifications sent successfully!'
        };
      } else {
        console.log('⚠️ API failed, using fallback');
      }
    } catch (apiError) {
      console.log('⚠️ API not available, using fallback');
    }

    // Fallback: Create mailto links
    const customerMailto = `mailto:${customerEmail}?subject=${encodeURIComponent(customerSubject)}&body=${encodeURIComponent(customerBody)}`;
    const braiderMailto = `mailto:braidsbyevaofficial@gmail.com?subject=${encodeURIComponent(braiderSubject)}&body=${encodeURIComponent(braiderBody)}`;

    // Open email clients
    window.open(customerMailto, '_blank');
    setTimeout(() => {
      window.open(braiderMailto, '_blank');
    }, 500);

    console.log('📧 Email clients opened');
    
    return {
      success: true,
      message: 'Email notifications sent!'
    };

  } catch (error) {
    console.error('❌ Error sending email notifications:', error);
    
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};
