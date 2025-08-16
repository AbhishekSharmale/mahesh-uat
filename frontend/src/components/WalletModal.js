import React, { useState } from 'react'
import { X, CreditCard } from 'lucide-react'
import { initiatePayment } from '../utils/razorpay'
import { supabase } from '../utils/supabase'
import toast from 'react-hot-toast'

const WalletModal = ({ isOpen, onClose, user, onBalanceUpdate }) => {
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const predefinedAmounts = [50, 100, 200, 500, 1000, 2000]

  const handlePayment = async () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount
    
    if (amount < 10) {
      toast.error('Minimum amount is ₹10')
      return
    }

    setLoading(true)
    
    try {
      // Always use Razorpay for payments
      await processRazorpayPayment(amount)
      
    } catch (error) {
      toast.error('Payment failed. Please try again.')
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const processRazorpayPayment = async (amount) => {
    try {
      await initiatePayment({
        amount: amount,
        currency: 'INR',
        orderId: `order_${Date.now()}`, // In production, get from backend
        userDetails: {
          name: user.name || user.email,
          email: user.email
        },
        onSuccess: async (response) => {
          // Payment successful - update wallet
          if (supabase) {
            const { error } = await supabase
              .from('profiles')
              .update({ 
                wallet_balance: supabase.raw(`wallet_balance + ${amount}`),
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id)
            
            if (error) throw error
          } else {
            // Demo mode - still update local state
            console.log('Demo mode: Payment successful')
          }
          
          onBalanceUpdate(amount)
          toast.success(`₹${amount} added to wallet successfully!`)
          onClose()
        },
        onFailure: (error) => {
          toast.error(`Payment failed: ${error}`)
        }
      })
    } catch (error) {
      toast.error('Payment initialization failed')
      throw error
    }
  }

  const simulatePayment = async (amount) => {
    // For demo mode without Supabase
    await new Promise(resolve => setTimeout(resolve, 2000))
    onBalanceUpdate(amount)
    toast.success(`₹${amount} added to wallet successfully!`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Money to Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Amount</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {predefinedAmounts.map(amount => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount('')
                }}
                className={`p-3 rounded-lg border-2 font-medium transition-all ${
                  selectedAmount === amount && !customAmount
                    ? 'border-primary bg-blue-50 text-primary dark:bg-blue-900 dark:text-blue-300'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(0)
              }}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              min="10"
              max="50000"
            />
            <div className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">₹</div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Amount to add:</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{customAmount || selectedAmount}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || (!selectedAmount && !customAmount)}
          className="w-full bg-primary hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-colors"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              <span>Pay ₹{customAmount || selectedAmount}</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  )
}

export default WalletModal