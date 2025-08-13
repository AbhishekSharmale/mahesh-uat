import React from 'react'
import { supabase } from '../utils/supabase'
import toast from 'react-hot-toast'

const RazorpayPayment = ({ amount, testId, onSuccess, onError }) => {
  const handlePayment = async () => {
    try {
      // Create order in backend
      const { data: order, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: { amount: amount * 100, testId } // Amount in paise
      })

      if (error) throw error

      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Police Bharti Test Series',
        description: 'Test Purchase',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const { error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                testId
              }
            })

            if (verifyError) throw verifyError

            toast.success('Payment successful!')
            onSuccess(response)
          } catch (error) {
            toast.error('Payment verification failed')
            onError(error)
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com'
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled')
            onError(new Error('Payment cancelled'))
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      toast.error('Failed to initiate payment')
      onError(error)
    }
  }

  return (
    <button
      onClick={handlePayment}
      className="btn-primary w-full"
    >
      Pay ₹{amount}
    </button>
  )
}

export default RazorpayPayment