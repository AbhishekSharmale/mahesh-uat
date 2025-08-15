import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, testId } = await req.json()
    
    // Input validation
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount')
    }
    
    if (!testId) {
      throw new Error('Test ID is required')
    }
    
    // Initialize Razorpay
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    
    // Environment variable validation
    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay configuration missing')
    }
    
    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)
    
    // Create order
    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount, // Amount in paise
        currency: 'INR',
        receipt: `test_${testId}_${Date.now()}`,
        notes: {
          testId: testId
        }
      })
    })

    const order = await orderResponse.json()

    if (!orderResponse.ok) {
      throw new Error(order.error?.description || 'Failed to create order')
    }

    return new Response(
      JSON.stringify(order),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})