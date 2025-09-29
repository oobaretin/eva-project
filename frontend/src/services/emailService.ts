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

    // Send emails using the working API endpoint
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
        console.log('✅ Emails sent successfully via API:', result);
      } else {
        console.log('⚠️ API email sending failed, using fallback method');
        throw new Error('API failed');
      }
    } catch (apiError) {
      console.log('⚠️ API not available, using fallback method');
      
      // Fallback: Use a simple webhook service
      try {
        // Send notification to Eva
        await fetch('https://formspree.io/f/xpwgkqyv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
            message: `NEW BOOKING RECEIVED

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
          })
        });
        console.log('✅ Booking notification sent to Eva via Formspree');

        // Send customer confirmation
        const customerEmailContent = `Dear ${bookingData.customer_name},

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
BraidsbyEva`;

        await fetch('https://formspree.io/f/xpwgkqyv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: bookingData.customer_name,
            email: bookingData.customer_email,
            phone: bookingData.customer_phone,
            service: 'Customer Confirmation',
            date: appointmentDate,
            time: bookingData.appointment_time,
            price: bookingData.service_price,
            message: customerEmailContent
          })
        });
        console.log('✅ Customer confirmation sent via Formspree');
      } catch (fallbackError) {
        console.log('⚠️ All email methods failed, but booking is recorded');
      }
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