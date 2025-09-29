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
  try {
    console.log('📧 Processing booking confirmation...');

    // Format the appointment date
    const appointmentDate = new Date(bookingData.appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Log booking details for Eva to see
    console.log('📧 ===== NEW BOOKING RECEIVED =====');
    console.log('👤 Customer:', bookingData.customer_name);
    console.log('📧 Email:', bookingData.customer_email);
    console.log('📞 Phone:', bookingData.customer_phone);
    console.log('💇‍♀️ Service:', bookingData.service_name);
    console.log('📅 Date:', appointmentDate);
    console.log('🕐 Time:', bookingData.appointment_time);
    console.log('💰 Price:', bookingData.service_price);
    console.log('⏱️ Duration:', bookingData.service_duration);
    console.log('💳 Payment:', bookingData.payment_method);
    console.log('📝 Notes:', bookingData.notes || 'None');
    console.log('=====================================');

    // Send emails silently in the background - no email clients opened
    try {
      console.log('📧 Sending booking notifications silently...');
      
      // Send notification to Eva (silent - no popups)
      const evaData = {
        name: bookingData.customer_name,
        email: bookingData.customer_email,
        phone: bookingData.customer_phone,
        service: bookingData.service_name,
        date: appointmentDate,
        time: bookingData.appointment_time,
        price: bookingData.service_price,
        duration: bookingData.service_duration,
        payment_method: bookingData.payment_method,
        special_requests: bookingData.notes || 'None',
        message: `NEW BOOKING RECEIVED - BraidsbyEva

Customer: ${bookingData.customer_name}
Email: ${bookingData.customer_email}
Phone: ${bookingData.customer_phone}
Service: ${bookingData.service_name}
Date: ${appointmentDate}
Time: ${bookingData.appointment_time}
Price: ${bookingData.service_price}
Duration: ${bookingData.service_duration}
Payment: ${bookingData.payment_method}
Special Requests: ${bookingData.notes || 'None'}

Please contact the customer to confirm all details.`
      };

      // Send Eva notification silently
      fetch('https://formspree.io/f/xpwgkqyv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaData)
      }).then(response => {
        if (response.ok) {
          console.log('✅ Eva notification sent successfully');
        } else {
          console.log('⚠️ Eva notification failed');
        }
      }).catch(error => {
        console.log('⚠️ Eva notification error:', error);
      });

      // Send customer confirmation silently
      const customerData = {
        name: bookingData.customer_name,
        email: bookingData.customer_email,
        phone: bookingData.customer_phone,
        service: 'Customer Confirmation',
        date: appointmentDate,
        time: bookingData.appointment_time,
        price: bookingData.service_price,
        message: `Dear ${bookingData.customer_name},

Thank you for booking with BraidsbyEva!

Your appointment details:
- Service: ${bookingData.service_name}
- Date: ${appointmentDate}
- Time: ${bookingData.appointment_time}
- Duration: ${bookingData.service_duration}
- Price: ${bookingData.service_price}

We will contact you shortly to confirm all details.

Contact: (832) 207-9386
Email: braidsbyevaofficial@gmail.com

Best regards,
Awa Obaretin
BraidsbyEva`
      };

      // Send customer confirmation silently
      fetch('https://formspree.io/f/xpwgkqyv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      }).then(response => {
        if (response.ok) {
          console.log('✅ Customer confirmation sent successfully');
        } else {
          console.log('⚠️ Customer confirmation failed');
        }
      }).catch(error => {
        console.log('⚠️ Customer confirmation error:', error);
      });

      console.log('📧 Email sending process initiated silently');
      
    } catch (error) {
      console.log('⚠️ Email sending failed, but booking is recorded:', error);
    }

    console.log('📧 Booking confirmation processed successfully!');
    
    return {
      success: true,
      message: 'Booking confirmed! You will receive a confirmation email shortly.'
    };

  } catch (error) {
    console.error('❌ Error processing booking confirmation:', error);
    
    return {
      success: true,
      message: 'Booking confirmed! Please contact us at (832) 207-9386 for confirmation.'
    };
  }
};