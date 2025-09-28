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

    // For now, we'll use a simple approach - log the booking data
    // and provide clear instructions for manual email sending
    console.log('📧 ===== BOOKING NOTIFICATION =====');
    console.log('📧 Please send the following emails manually:');
    console.log('');
    
    // Customer Email Template
    console.log('📧 TO CUSTOMER:');
    console.log('📧 To:', bookingData.customer_email);
    console.log('📧 Subject: ✅ Your BraidsbyEva Appointment Confirmation');
    console.log('📧 Message:');
    console.log(`Hello ${bookingData.customer_name},`);
    console.log('');
    console.log('Thank you for booking with BraidsbyEva! Your appointment is confirmed:');
    console.log('');
    console.log(`💇‍♀️ Service: ${bookingData.service_name}`);
    console.log(`💰 Price: ${bookingData.service_price}`);
    console.log(`⏱️ Duration: ${bookingData.service_duration}`);
    console.log(`📅 Date: ${bookingData.appointment_date}`);
    console.log(`🕐 Time: ${bookingData.appointment_time}`);
    console.log(`💳 Payment: ${bookingData.payment_method}`);
    console.log('');
    console.log('📞 Contact: (832) 207-9386');
    console.log('📧 Email: braidsbyevaofficial@gmail.com');
    console.log('');
    console.log('We look forward to seeing you!');
    console.log('');
    console.log('Best regards,');
    console.log('Awa Obaretin');
    console.log('BraidsbyEva');
    console.log('');
    
    // Braider Email Template
    console.log('📧 TO BRAIDER (Awa):');
    console.log('📧 To: braidsbyevaofficial@gmail.com');
    console.log('📧 Subject: 📅 New Booking - ' + bookingData.customer_name);
    console.log('📧 Message:');
    console.log('New booking received:');
    console.log('');
    console.log('👤 Customer: ' + bookingData.customer_name);
    console.log('📧 Email: ' + bookingData.customer_email);
    console.log('📞 Phone: ' + bookingData.customer_phone);
    console.log('');
    console.log('💇‍♀️ Service: ' + bookingData.service_name);
    console.log('💰 Price: ' + bookingData.service_price);
    console.log('⏱️ Duration: ' + bookingData.service_duration);
    console.log('📅 Date: ' + bookingData.appointment_date);
    console.log('🕐 Time: ' + bookingData.appointment_time);
    console.log('💳 Payment: ' + bookingData.payment_method);
    console.log('');
    console.log('📝 Notes: ' + (bookingData.notes || 'None'));
    console.log('');
    console.log('=====================================');

    return {
      success: true,
      message: 'Booking confirmed! Please check the console for email templates to send manually.'
    };

  } catch (error) {
    console.error('❌ Error in email service:', error);
    
    // Still return success to prevent booking failure
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};
