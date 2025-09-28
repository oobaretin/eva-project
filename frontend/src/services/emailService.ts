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
    // Send to your Vercel API endpoint
    const response = await fetch('/api/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData })
    });

    if (!response.ok) {
      throw new Error('Failed to send emails');
    }

    const result = await response.json();
    console.log('✅ Emails sent successfully:', result);
    return result;

  } catch (error) {
    console.error('❌ Error sending emails:', error);
    // Don't throw error - booking was successful, just email failed
    return {
      success: false,
      message: 'Booking saved but email notification failed. Please contact us at (832) 207-9386'
    };
  }
};
