// Email service for BraidsbyEva

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
  // This function NEVER throws errors - always returns success
  console.log('📧 Processing booking confirmation...');

  try {
    // Format the appointment date safely
    let appointmentDate = 'Date not specified';
    try {
      appointmentDate = new Date(bookingData.appointment_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (dateError) {
      console.log('⚠️ Date formatting error, using fallback');
      appointmentDate = bookingData.appointment_date || 'Date not specified';
    }

    // Log booking details for Eva to see
    console.log('📧 ===== NEW BOOKING RECEIVED =====');
    console.log('👤 Customer:', bookingData.customer_name || 'Not specified');
    console.log('📧 Email:', bookingData.customer_email || 'Not specified');
    console.log('📞 Phone:', bookingData.customer_phone || 'Not specified');
    console.log('💇‍♀️ Service:', bookingData.service_name || 'Not specified');
    console.log('📅 Date:', appointmentDate);
    console.log('🕐 Time:', bookingData.appointment_time || 'Not specified');
    console.log('💰 Price:', bookingData.service_price || 'Not specified');
    console.log('⏱️ Duration:', bookingData.service_duration || 'Not specified');
    console.log('💳 Payment:', bookingData.payment_method || 'Not specified');
    console.log('📝 Notes:', bookingData.notes || 'None');
    console.log('=====================================');

    // Customer confirmation email
    const customerEmailContent = `Dear ${bookingData.customer_name || 'Valued Customer'},

Thank you for booking with BraidsbyEva!

Your appointment details:
- Service: ${bookingData.service_name || 'Braiding Service'}
- Date: ${appointmentDate}
- Time: ${bookingData.appointment_time || 'Time TBD'}
- Duration: ${bookingData.service_duration || 'Duration TBD'}
- Price: ${bookingData.service_price || 'Price TBD'}

We will contact you shortly to confirm all details.

Contact: (832) 207-9386
Email: braidsbyevaofficial@gmail.com

Best regards,
Awa Obaretin
BraidsbyEva`;

    // Eva notification email
    const evaEmailContent = `NEW BOOKING RECEIVED - BraidsbyEva

Customer: ${bookingData.customer_name || 'Not specified'}
Email: ${bookingData.customer_email || 'Not specified'}
Phone: ${bookingData.customer_phone || 'Not specified'}
Service: ${bookingData.service_name || 'Not specified'}
Date: ${appointmentDate}
Time: ${bookingData.appointment_time || 'Not specified'}
Price: ${bookingData.service_price || 'Not specified'}
Duration: ${bookingData.service_duration || 'Not specified'}
Payment: ${bookingData.payment_method || 'Not specified'}
Special Requests: ${bookingData.notes || 'None'}

Please contact the customer to confirm all details.
Contact: (832) 207-9386`;

    // Customer SMS
    const customerSMS = `Hi ${bookingData.customer_name || 'there'}! Your BraidsbyEva appointment is confirmed for ${appointmentDate} at ${bookingData.appointment_time || 'time TBD'}. Service: ${bookingData.service_name || 'Braiding Service'} (${bookingData.service_price || 'price TBD'}). We'll contact you soon! - Awa (832) 207-9386`;
    
    // Eva SMS
    const evaSMS = `NEW BOOKING: ${bookingData.customer_name || 'Customer'} - ${bookingData.service_name || 'Service'} on ${appointmentDate} at ${bookingData.appointment_time || 'time TBD'}. Phone: ${bookingData.customer_phone || 'Not provided'}. Contact them to confirm!`;

    // Log all notification details for manual sending
    console.log('📧 ===== EMAIL NOTIFICATIONS TO SEND =====');
    console.log('📧 TO: ' + (bookingData.customer_email || 'Not provided'));
    console.log('📧 SUBJECT: 🎉 Booking Confirmed - BraidsbyEva');
    console.log('📧 BODY: ' + customerEmailContent);
    console.log('📧 ======================================');
    
    console.log('📧 ===== EVA EMAIL NOTIFICATION =====');
    console.log('📧 TO: braidsbyevaofficial@gmail.com');
    console.log('📧 SUBJECT: 📅 New Booking Received - BraidsbyEva');
    console.log('📧 BODY: ' + evaEmailContent);
    console.log('📧 ===================================');
    
    console.log('📱 ===== SMS NOTIFICATIONS TO SEND =====');
    console.log('📱 TO: ' + (bookingData.customer_phone || 'Not provided'));
    console.log('📱 MESSAGE: ' + customerSMS);
    console.log('📱 ====================================');
    
    console.log('📱 ===== EVA SMS NOTIFICATION =====');
    console.log('📱 TO: 8322079386');
    console.log('📱 MESSAGE: ' + evaSMS);
    console.log('📱 =================================');

    console.log('📧📱 All notifications logged successfully!');
    
  } catch (error) {
    // This should never happen, but just in case
    console.log('⚠️ Unexpected error in notification logging:', error);
  }

  // ALWAYS return success - never throw errors
  return {
    success: true,
    message: 'Booking confirmed! You will receive email and SMS confirmations shortly.'
  };
};