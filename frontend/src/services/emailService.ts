// Email service for sending booking confirmations

interface BookingEmailData {
  service_name: string;
  service_price: string;
  service_duration: string;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes?: string;
}

export const sendBookingEmails = async (bookingData: BookingEmailData): Promise<void> => {
  try {
    console.log('📧 Sending booking emails via Vercel function...');
    
    // Call the Vercel serverless function
    const response = await fetch('/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Email API error:', errorData.error || 'Failed to send booking emails');
      // Don't throw error - just log it and continue
      return;
    }

    const result = await response.json();
    console.log('✅ Booking emails sent successfully:', result);
  } catch (error) {
    console.error('❌ Error sending booking emails:', error);
    // Don't throw error - just log it and continue
    // This ensures booking always succeeds even if email fails
  }
};