// Test email service to see if it works
const { sendBookingEmails } = require('./working-email-service');

// Test booking data
const testBookingData = {
  service_name: 'Senegalese Twists',
  service_price: '$168',
  service_duration: '4-5 hours',
  appointment_date: '2025-10-09',
  appointment_time: '4:00 PM',
  customer_name: 'osagie obaretin',
  customer_email: 'oobaretin6@gmail.com',
  customer_phone: '2818183762',
  hair_length: 'Not specified',
  hair_texture: 'Not specified',
  previous_braids: false,
  allergies: 'None',
  notes: 'Test booking',
  payment_method: 'Cash/Zelle',
  status: 'pending'
};

// Test the email service
sendBookingEmails(testBookingData)
  .then(result => {
    console.log('Email service result:', result);
  })
  .catch(error => {
    console.error('Email service error:', error);
  });
