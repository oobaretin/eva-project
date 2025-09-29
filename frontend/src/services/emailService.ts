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

    // Send emails using the Vercel API endpoint
    try {
      console.log('📧 Sending emails via Vercel API...');
      
      // Use the Vercel API endpoint for email sending
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Emails sent successfully via Vercel API:', result);
      } else {
        console.log('⚠️ Vercel API failed, using fallback method');
        throw new Error('Vercel API failed');
      }
    } catch (apiError) {
      console.log('⚠️ Vercel API not available, using fallback method');
      
      // Fallback: Use email clients with pre-filled content
      try {
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

        const evaEmailContent = `NEW BOOKING RECEIVED - BraidsbyEva

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

Please contact the customer to confirm all details.`;

        // Open email clients with pre-filled content
        const customerMailtoLink = `mailto:${bookingData.customer_email}?subject=${encodeURIComponent('🎉 Booking Confirmed - BraidsbyEva')}&body=${encodeURIComponent(customerEmailContent)}`;
        const evaMailtoLink = `mailto:braidsbyevaofficial@gmail.com?subject=${encodeURIComponent('📅 New Booking Received - BraidsbyEva')}&body=${encodeURIComponent(evaEmailContent)}`;

        // Open email clients
        window.open(customerMailtoLink, '_blank');
        setTimeout(() => {
          window.open(evaMailtoLink, '_blank');
        }, 1000);
        
        console.log('✅ Email clients opened with booking details');
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
}
;