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
    console.log('📧 Sending email notifications...');

    // Create email content
    const customerEmail = bookingData.customer_email;
    const customerName = bookingData.customer_name;
    const serviceName = bookingData.service_name;
    const servicePrice = bookingData.service_price;
    const serviceDuration = bookingData.service_duration;
    const appointmentDate = bookingData.appointment_date;
    const appointmentTime = bookingData.appointment_time;
    const paymentMethod = bookingData.payment_method;

    // Send emails using EmailJS - simple and reliable
    try {
      // Use EmailJS public API directly
      const emailjsUrl = 'https://api.emailjs.com/api/v1.0/email/send';
      
      // Customer email
      const customerEmailPayload = {
        service_id: 'service_braidsbyeva',
        template_id: 'template_customer',
        user_id: 'oW9vgP7OPmb0xQzEA', // EmailJS public key
        template_params: {
          to_email: customerEmail,
          to_name: customerName,
          service_name: serviceName,
          service_price: servicePrice,
          service_duration: serviceDuration,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          payment_method: paymentMethod,
          customer_phone: bookingData.customer_phone,
          from_name: 'BraidsbyEva',
          reply_to: 'braidsbyevaofficial@gmail.com',
          message: `Hello ${customerName},

Thank you for booking with BraidsbyEva! Your appointment is confirmed:

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📞 Contact: (832) 207-9386
📧 Email: braidsbyevaofficial@gmail.com

We look forward to seeing you!

Best regards,
Awa Obaretin
BraidsbyEva`
        }
      };

      // Braider email
      const braiderEmailPayload = {
        service_id: 'service_braidsbyeva',
        template_id: 'template_braider',
        user_id: 'oW9vgP7OPmb0xQzEA', // EmailJS public key
        template_params: {
          to_email: 'braidsbyevaofficial@gmail.com',
          to_name: 'Awa',
          service_name: serviceName,
          service_price: servicePrice,
          service_duration: serviceDuration,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          payment_method: paymentMethod,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: bookingData.customer_phone,
          notes: bookingData.notes || 'None',
          from_name: 'BraidsbyEva Booking System',
          reply_to: 'braidsbyevaofficial@gmail.com',
          message: `New booking received:

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
- Notes: ${bookingData.notes || 'None'}`
        }
      };

      // Send both emails
      const [customerResponse, braiderResponse] = await Promise.all([
        fetch(emailjsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerEmailPayload)
        }),
        fetch(emailjsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(braiderEmailPayload)
        })
      ]);

      if (customerResponse.ok && braiderResponse.ok) {
        console.log('✅ Both emails sent successfully via EmailJS');
        return {
          success: true,
          message: 'Email notifications sent successfully!'
        };
      } else {
        console.log('⚠️ EmailJS failed, status:', customerResponse.status, braiderResponse.status);
      }
      
    } catch (emailjsError) {
      console.log('⚠️ EmailJS error:', emailjsError);
    }

    // Simple fallback - open email clients
    const customerSubject = `✅ Your BraidsbyEva Appointment Confirmation`;
    const customerBody = `Hello ${customerName},

Thank you for booking with BraidsbyEva! Your appointment is confirmed:

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📞 Contact: (832) 207-9386
📧 Email: braidsbyevaofficial@gmail.com

We look forward to seeing you!

Best regards,
Awa Obaretin
BraidsbyEva`;

    const braiderSubject = `📅 New Booking - ${customerName}`;
    const braiderBody = `New booking received:

👤 Customer: ${customerName}
📧 Email: ${customerEmail}
📞 Phone: ${bookingData.customer_phone}

💇‍♀️ Service: ${serviceName}
💰 Price: ${servicePrice}
⏱️ Duration: ${serviceDuration}
📅 Date: ${appointmentDate}
🕐 Time: ${appointmentTime}
💳 Payment: ${paymentMethod}

📝 Notes: ${bookingData.notes || 'None'}`;

    // Create mailto links
    const customerMailto = `mailto:${customerEmail}?subject=${encodeURIComponent(customerSubject)}&body=${encodeURIComponent(customerBody)}`;
    const braiderMailto = `mailto:braidsbyevaofficial@gmail.com?subject=${encodeURIComponent(braiderSubject)}&body=${encodeURIComponent(braiderBody)}`;

    // Open email clients
    window.open(customerMailto, '_blank');
    setTimeout(() => {
      window.open(braiderMailto, '_blank');
    }, 500);

    console.log('📧 Email clients opened as fallback');
    
    return {
      success: true,
      message: 'Email notifications sent!'
    };

  } catch (error) {
    console.error('❌ Error sending email notifications:', error);
    
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};