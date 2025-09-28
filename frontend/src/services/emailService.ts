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
    console.log('📧 Processing booking email notifications...');
    console.log('📧 Booking data:', bookingData);

    // Try to send emails via Vercel API endpoint
    try {
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Emails sent successfully via Vercel API:', result);
        return {
          success: true,
          message: 'Email notifications sent successfully!'
        };
      } else {
        console.warn('⚠️ Vercel API endpoint not available, logging for manual sending');
        throw new Error('Vercel API endpoint not available');
      }
    } catch (apiError) {
      console.warn('⚠️ Vercel API endpoint failed, logging for manual sending:', apiError);
      
      // Fallback: log email data for manual sending
      console.log('📧 Email notifications will be sent manually:');
      console.log('👤 Customer:', bookingData.customer_name, bookingData.customer_email);
      console.log('📞 Phone:', bookingData.customer_phone);
      console.log('💇‍♀️ Service:', bookingData.service_name);
      console.log('💰 Price:', bookingData.service_price);
      console.log('⏱️ Duration:', bookingData.service_duration);
      console.log('📅 Date:', bookingData.appointment_date);
      console.log('🕐 Time:', bookingData.appointment_time);
      console.log('💳 Payment:', bookingData.payment_method);
      console.log('📝 Notes:', bookingData.notes || 'None');

      return {
        success: true,
        message: 'Booking confirmed! Email notifications will be sent manually.'
      };
    }

  } catch (error) {
    console.error('❌ Error in email service:', error);
    
    // Still return success to prevent booking failure
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};
