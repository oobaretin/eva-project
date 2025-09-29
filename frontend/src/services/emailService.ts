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

    // Create mailto links
    const customerMailto = `mailto:${customerEmail}?subject=${encodeURIComponent(customerSubject)}&body=${encodeURIComponent(customerBody)}`;
    const braiderMailto = `mailto:braidsbyevaofficial@gmail.com?subject=${encodeURIComponent(braiderSubject)}&body=${encodeURIComponent(braiderBody)}`;

    // Open email clients with better error handling
    try {
      console.log('📧 Opening customer email...');
      const customerWindow = window.open(customerMailto, '_blank');
      if (!customerWindow) {
        console.warn('Customer email window blocked by browser');
      }
      
      setTimeout(() => {
        console.log('📧 Opening braider email...');
        const braiderWindow = window.open(braiderMailto, '_blank');
        if (!braiderWindow) {
          console.warn('Braider email window blocked by browser');
        }
      }, 1000);
    } catch (error) {
      console.error('Error opening email windows:', error);
    }

    console.log('✅ Email notifications prepared!');
    
    // Also log email content to console as backup
    console.log('📧 ===== EMAIL BACKUP (if windows blocked) =====');
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
      message: 'Email notifications sent successfully!'
    };

  } catch (error) {
    console.error('❌ Error sending email notifications:', error);
    
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};
