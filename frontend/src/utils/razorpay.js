// Razorpay integration for payments

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initiatePayment = async ({
  amount,
  currency = 'INR',
  orderId,
  userDetails,
  onSuccess,
  onFailure
}) => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript()
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load')
    }
    
    // Use live or test key based on environment
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_live_R66OhBTgwnZzVP'

    const options = {
      key: razorpayKey, // Your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: currency,
      name: 'Police Bharti Test Series',
      description: 'Add money to wallet',
      // order_id: orderId, // Comment out for test mode
      handler: function (response) {
        // Payment successful
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        })
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone || ''
      },
      theme: {
        color: '#2563eb' // Primary blue color
      },
      modal: {
        ondismiss: function() {
          onFailure('Payment cancelled by user')
        }
      }
    }

    const razorpay = new window.Razorpay(options)
    razorpay.on('payment.failed', function (response) {
      onFailure(response.error.description)
    })
    
    razorpay.open()
  } catch (error) {
    onFailure(error.message)
  }
}

// For production, you would implement backend order creation
// For now, we'll use client-side order generation
export const createRazorpayOrder = async (amount) => {
  // In production, this should be done on backend for security
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// For production, implement proper payment verification on backend
export const verifyPayment = async (paymentData) => {
  // In production, verify signature on backend
  console.log('Payment completed:', paymentData)
  return true
}