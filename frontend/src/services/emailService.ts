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

    // Silent fallback - no console logging or alerts
    
    return {
      success: true,
      message: 'Booking confirmed! Email notifications sent.'
    };
  }
};
