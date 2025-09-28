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

    // Use the Vercel API endpoint for email sending
    const apiUrl = process.env.REACT_APP_API_URL || 'https://braidsbyeva.vercel.app/api';
    
    const response = await fetch(`${apiUrl}/send-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Email notifications sent:', result);
    
    return {
      success: true,
      message: 'Email notifications sent successfully!'
    };

  } catch (error) {
    console.error('❌ Error sending email notifications:', error);
    
    // Fallback: Show email content for manual sending
    const customerEmail = bookingData.customer_email;
    const customerName = bookingData.customer_name;
    const serviceName = bookingData.service_name;
    const servicePrice = bookingData.service_price;
    const serviceDuration = bookingData.service_duration;
    const appointmentDate = bookingData.appointment_date;
    const appointmentTime = bookingData.appointment_time;
    const paymentMethod = bookingData.payment_method;

    console.log('📧 ===== EMAIL NOTIFICATIONS (FALLBACK) =====');
    console.log('📧 CUSTOMER EMAIL:');
    console.log('To:', customerEmail);
    console.log('Subject: ✅ Your BraidsbyEva Appointment Confirmation');
    console.log('Body:', `Hello ${customerName},

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
BraidsbyEva`);
    console.log('');
    console.log('📧 BRAIDER EMAIL:');
    console.log('To: braidsbyevaofficial@gmail.com');
    console.log('Subject: 📅 New Booking - ' + customerName);
    console.log('Body:', `New booking received:

👤 Customer: ${customerName}
📧 Email: ${customerEmail}
📞 Phone: ${bookingData.customer_phone}

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📝 Notes: ${bookingData.notes || 'None'}`);
    console.log('=====================================');
    
    return {
      success: true,
      message: 'Booking confirmed! Email notifications failed, but booking details are in console for manual sending.'
    };
  }
};
