const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendCustomerConfirmation, sendEvaNotification } = require('./email-service');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://epelluypanqnmopqxulk.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZWxsdXlwYW5xbm1vcHF4dWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NDI5ODIsImV4cCI6MjA3NDMxODk4Mn0.Uv1nK6n1EwUqwy5meU263hi_eSdoSa2crBtTnJ7pjLI'
);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BraidsbyEva API is running',
    braider: {
      name: 'Awa Obaretin',
      phone: '8322079386'
    },
    timestamp: new Date().toISOString()
  });
});

// Booking endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    // The frontend is already sending the data in the correct format for Supabase
    const bookingData = req.body;

    // Insert booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create booking',
        error: error.message
      });
    }

    // Send email notifications
    try {
      await sendCustomerConfirmation(data[0]);
      await sendEvaNotification(data[0]);
      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    res.json({
      success: true,
      message: 'Booking created successfully',
      booking: data[0]
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message
    });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings',
        error: error.message
      });
    }

    res.json({
      success: true,
      bookings: data
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BraidsbyEva API running on port ${PORT}`);
  console.log(`📧 Braider: Awa Obaretin (8322079386)`);
  console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3001'}`);
});
