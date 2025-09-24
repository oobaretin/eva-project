import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epelluypanqnmopqxulk.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZWxsdXlwYW5xbm1vcHF4dWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NDI5ODIsImV4cCI6MjA3NDMxODk4Mn0.Uv1nK6n1EwUqwy5meU263hi_eSdoSa2crBtTnJ7pjLI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Booking functions
export const createBooking = async (bookingData: any) => {
  console.log('Creating booking with data:', bookingData)
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(`Database error: ${error.message}`)
  }

  console.log('Booking created successfully:', data)
  return data[0]
}

export const getAllBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

// Test function to verify Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    console.log('Supabase URL:', supabaseUrl)
    console.log('Supabase Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...')
    
    const { data, error } = await supabase
      .from('bookings')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Connection test failed:', error)
      return false
    }

    console.log('Supabase connection successful!')
    return true
  } catch (error) {
    console.error('Connection test error:', error)
    return false
  }
}
