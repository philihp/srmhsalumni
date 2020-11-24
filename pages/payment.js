import React from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC)

const handleClick = async (_event) => {
  const { sessionId } = await fetch('/api/stripe/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ quantity: 1 }),
  }).then((res) => res.json())
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({ sessionId })
  if (error) console.error(error)
}

const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <button
        type="button"
        className="form-input"
        role="link"
        onClick={handleClick}
      >
        Checkout
      </button>
    </div>
  )
}
export default Payment
