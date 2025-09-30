// Vercel API endpoint for sending SMS notifications
// This will send SMS to both customer and Eva for booking confirmations

const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingData } = req.body;
    
    if (!bookingData) {
      return res.status(400).json({ error: 'Booking data is required' });
    }

    const {
      customer_name,
      customer_phone,
      service_name,
      appointment_date,
      appointment_time,
      total_price,
      notes
    } = bookingData;

    // Validate required fields
    if (!customer_phone) {
      return res.status(400).json({ error: 'Customer phone number is required' });
    }

    console.log('📱 Sending SMS notifications...');
    console.log('📱 Customer phone:', customer_phone);

    // SMS to Customer
    const customerSMS = `🎉 Hi ${customer_name}! Your braids appointment with Eva is confirmed for ${appointment_date} at ${appointment_time}. Service: ${service_name} ($${total_price}). Please arrive 10 minutes early. Questions? Reply to this text! 💅✨`;

    // SMS to Eva (you)
    const evaSMS = `📱 NEW BOOKING: ${customer_name} - ${service_name} on ${appointment_date} at ${appointment_time} ($${total_price}). Phone: ${customer_phone}${notes ? ` Notes: ${notes}` : ''}`;

    const results = [];

    // Send SMS to customer
    try {
      const customerMessage = await client.messages.create({
        body: customerSMS,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: customer_phone
      });
      
      console.log('✅ Customer SMS sent:', customerMessage.sid);
      results.push({ recipient: 'customer', status: 'sent', sid: customerMessage.sid });
    } catch (error) {
      console.error('❌ Customer SMS failed:', error);
      results.push({ recipient: 'customer', status: 'failed', error: error.message });
    }

    // Send SMS to Eva (if phone number is configured)
    if (process.env.EVA_PHONE_NUMBER) {
      try {
        const evaMessage = await client.messages.create({
          body: evaSMS,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.EVA_PHONE_NUMBER
        });
        
        console.log('✅ Eva SMS sent:', evaMessage.sid);
        results.push({ recipient: 'eva', status: 'sent', sid: evaMessage.sid });
      } catch (error) {
        console.error('❌ Eva SMS failed:', error);
        results.push({ recipient: 'eva', status: 'failed', error: error.message });
      }
    } else {
      console.log('⚠️ Eva phone number not configured - skipping Eva SMS');
      results.push({ recipient: 'eva', status: 'skipped', reason: 'Phone number not configured' });
    }

    console.log('📱 SMS results:', results);
    return res.status(200).json({ 
      success: true, 
      message: 'SMS notifications sent',
      results: results
    });

  } catch (error) {
    console.error('❌ SMS error:', error);
    return res.status(500).json({ 
      error: 'Failed to send SMS notifications',
      details: error.message
    });
  }
};
