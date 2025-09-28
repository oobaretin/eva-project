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
    console.log('📧 Sending booking emails via Vercel API...');
    console.log('📧 Booking data:', bookingData);

    // Send to Vercel API endpoint
    const response = await fetch('/api/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData })
    });

    if (!response.ok) {
      throw new Error(`Email API failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Emails sent successfully:', result);
    return result;

  } catch (error) {
    console.error('❌ Error sending emails:', error);
    
    // If Vercel API fails, show the booking data for manual email sending
    console.log('📧 Manual email data for backup:');
    console.log('Customer:', bookingData.customer_name, bookingData.customer_email);
    console.log('Service:', bookingData.service_name, bookingData.service_price);
    console.log('Date:', bookingData.appointment_date, bookingData.appointment_time);
    
    throw new Error('Email service unavailable. Please contact us at (832) 207-9386');
  }
};
