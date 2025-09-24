import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Send booking confirmation to customer
export const sendCustomerConfirmation = async (bookingData: any) => {
  try {
    const templateParams = {
      to_email: bookingData.customer_email,
      to_name: bookingData.customer_first_name,
      service_name: bookingData.service_name,
      service_price: bookingData.service_price,
      service_duration: bookingData.service_duration,
      appointment_date: bookingData.appointment_date,
      appointment_time: bookingData.appointment_time,
      braider_name: 'Awa Obaretin',
      braider_phone: '8322079386'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Customer confirmation email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending customer email:', error);
    throw error;
  }
};

// Send booking notification to Eva
export const sendEvaNotification = async (bookingData: any) => {
  try {
    const templateParams = {
      to_email: 'braidsbyevaofficial@gmail.com',
      to_name: 'Eva',
      customer_name: `${bookingData.customer_first_name} ${bookingData.customer_last_name}`,
      customer_email: bookingData.customer_email,
      customer_phone: bookingData.customer_phone,
      service_name: bookingData.service_name,
      service_price: bookingData.service_price,
      service_duration: bookingData.service_duration,
      appointment_date: bookingData.appointment_date,
      appointment_time: bookingData.appointment_time,
      special_requests: bookingData.customer_notes || 'None'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'eva_notification_template', // Different template for Eva
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Eva notification email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending Eva email:', error);
    throw error;
  }
};
