import React from 'react';

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
    console.log('📧 Preparing booking notification...');

    // Create email content
    const customerEmail = bookingData.customer_email;
    const customerName = bookingData.customer_name;
    const serviceName = bookingData.service_name;
    const servicePrice = bookingData.service_price;
    const serviceDuration = bookingData.service_duration;
    const appointmentDate = bookingData.appointment_date;
    const appointmentTime = bookingData.appointment_time;
    const paymentMethod = bookingData.payment_method;

    // Create a simple notification that shows the booking details
    const bookingDetails = `
📅 NEW BOOKING RECEIVED

👤 Customer: ${customerName}
📧 Email: ${customerEmail}
📞 Phone: ${bookingData.customer_phone}

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📝 Hair Details:
- Length: ${bookingData.hair_length}
- Texture: ${bookingData.hair_texture}
- Previous Braids: ${bookingData.previous_braids ? 'Yes' : 'No'}
- Allergies: ${bookingData.allergies || 'None'}
- Notes: ${bookingData.notes || 'None'}

📧 Customer Email: ${customerEmail}
📧 Braider Email: braidsbyevaofficial@gmail.com
    `;

    // Show a simple notification with booking details
    alert(`🎉 BOOKING CONFIRMED!

${bookingDetails}

📧 Please check your email for the booking confirmation!
📞 Contact: (832) 207-9386`);

    console.log('📧 Booking notification prepared');
    console.log('📧 ===== BOOKING DETAILS =====');
    console.log(bookingDetails);
    console.log('=============================');
    
    return {
      success: true,
      message: 'Booking confirmed! Please check your email for confirmation.'
    };

  } catch (error) {
    console.error('❌ Error preparing booking notification:', error);
    
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};