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

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: currency,
      name: 'Police Bharti Test Series',
      description: 'Add money to wallet',
      order_id: orderId,
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

// Create order on backend (you'll need to implement this endpoint)
export const createRazorpayOrder = async (amount) => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount })
    })
    
    if (!response.ok) {
      throw new Error('Failed to create order')
    }
    
    const data = await response.json()
    return data.orderId
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

// Verify payment on backend (you'll need to implement this endpoint)
export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    })
    
    if (!response.ok) {
      throw new Error('Payment verification failed')
    }
    
    const data = await response.json()
    return data.verified
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}