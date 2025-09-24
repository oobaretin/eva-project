import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    if (req.method === 'POST') {
      const { service, date, time, customer } = await req.json()

      // Insert booking into database
      const { data, error } = await supabaseClient
        .from('bookings')
        .insert([
          {
            service_name: service.name,
            service_price: service.price,
            service_duration: service.duration,
            appointment_date: date,
            appointment_time: time,
            customer_first_name: customer.firstName,
            customer_last_name: customer.lastName,
            customer_email: customer.email,
            customer_phone: customer.phone,
            customer_hair_length: customer.hairLength,
            customer_hair_texture: customer.hairTexture,
            customer_previous_braids: customer.previousBraids,
            customer_allergies: customer.allergies,
            customer_notes: customer.notes,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        throw error
      }

      // Send email notifications
      await sendEmailNotifications(service, date, time, customer)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Booking created successfully',
          booking: data[0]
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    if (req.method === 'GET') {
      // Get all bookings
      const { data, error } = await supabaseClient
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          bookings: data 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function sendEmailNotifications(service: any, date: string, time: string, customer: any) {
  // Email to Eva (braider)
  const evaEmail = {
    to: 'braidsbyevaofficial@gmail.com',
    subject: `New Booking: ${service.name} - ${customer.firstName} ${customer.lastName}`,
    html: `
      <h2>New Booking Received!</h2>
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <p><strong>Duration:</strong> ${service.duration}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Customer:</strong> ${customer.firstName} ${customer.lastName}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Hair Length:</strong> ${customer.hairLength || 'Not specified'}</p>
      <p><strong>Hair Texture:</strong> ${customer.hairTexture || 'Not specified'}</p>
      <p><strong>Previous Braids:</strong> ${customer.previousBraids ? 'Yes' : 'No'}</p>
      <p><strong>Allergies:</strong> ${customer.allergies || 'None'}</p>
      <p><strong>Special Requests:</strong> ${customer.notes || 'None'}</p>
    `
  }

  // Email to customer
  const customerEmail = {
    to: customer.email,
    subject: `Booking Confirmation - ${service.name}`,
    html: `
      <h2>Booking Confirmation</h2>
      <p>Dear ${customer.firstName},</p>
      <p>Thank you for booking with BraidsbyEva! Here are your appointment details:</p>
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <p><strong>Duration:</strong> ${service.duration}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Braider:</strong> Awa Obaretin</p>
      <p><strong>Phone:</strong> 8322079386</p>
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br>BraidsbyEva Team</p>
    `
  }

  // Send emails using Supabase Edge Function
  try {
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evaEmail)
    })

    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerEmail)
    })
  } catch (error) {
    console.error('Email sending failed:', error)
  }
}
