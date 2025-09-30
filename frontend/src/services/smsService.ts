// SMS Service for sending booking notifications
// Integrates with Twilio via Vercel API

interface BookingSMSData {
  customer_name: string;
  customer_phone: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  total_price: number;
  notes?: string;
}

export const sendBookingSMS = async (bookingData: BookingSMSData): Promise<void> => {
  try {
    console.log('📱 Sending booking SMS via Vercel function...');
    console.log('📱 API URL:', '/api/send-sms');
    console.log('📱 Payload:', bookingData);
    
    // Call the Vercel serverless function
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData }),
    });

    console.log('📱 Response status:', response.status);
    console.log('📱 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('❌ SMS API failed:', `HTTP ${response.status}: ${response.statusText}`);
      return;
    }

    try {
      const result = await response.json();
      console.log('✅ Booking SMS sent successfully:', result);
    } catch (jsonError) {
      console.log('⚠️ SMS sent but response not JSON');
    }
  } catch (error) {
    console.error('❌ Error sending booking SMS:', error);
    // Don't throw error - just log it and continue
    // This ensures booking always succeeds even if SMS fails
  }
};

// SMS templates for different events
export const smsTemplates = {
  bookingConfirmation: (data: BookingSMSData) => 
    `🎉 Hi ${data.customer_name}! Your braids appointment with Eva is confirmed for ${data.appointment_date} at ${data.appointment_time}. Service: ${data.service_name} ($${data.total_price}). Please arrive 10 minutes early. Questions? Reply to this text! 💅✨`,

  appointmentReminder: (data: BookingSMSData) => 
    `⏰ Reminder: Your braids appointment with Eva is tomorrow at ${data.appointment_time}. Please arrive 10 minutes early. See you soon! 💅✨`,

  appointmentCancelled: (data: BookingSMSData) => 
    `❌ Your braids appointment for ${data.appointment_date} at ${data.appointment_time} has been cancelled. Please contact Eva to reschedule. 💅✨`,

  appointmentRescheduled: (data: BookingSMSData) => 
    `📅 Your braids appointment has been rescheduled to ${data.appointment_date} at ${data.appointment_time}. Service: ${data.service_name}. See you soon! 💅✨`
};
