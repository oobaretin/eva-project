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
    // For now, just log the booking data since Vercel API isn't set up yet
    console.log('📧 Email notifications would be sent with data:', {
      customer: {
        name: bookingData.customer_name,
        email: bookingData.customer_email,
        phone: bookingData.customer_phone
      },
      service: {
        name: bookingData.service_name,
        price: bookingData.service_price,
        duration: bookingData.service_duration
      },
      appointment: {
        date: bookingData.appointment_date,
        time: bookingData.appointment_time
      },
      payment: bookingData.payment_method
    });

    // Return success for now - emails will be sent manually
    return {
      success: true,
      message: 'Booking saved successfully. Email notifications will be sent manually.'
    };

  } catch (error) {
    console.error('❌ Error in email service:', error);
    // Don't throw error - booking was successful, just email failed
    return {
      success: false,
      message: 'Booking saved but email notification failed. Please contact us at (832) 207-9386'
    };
  }
};
