import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC)

const gotoPayment = async ({ email }) => {
  const body = JSON.stringify({
    amount: 1234,
    customer_email: email,
  })
  const { sessionId } = await fetch('/api/stripe/donate', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  }).then((res) => res.json())
  console.log({ sessionId })
  const stripe = await stripePromise
  console.log({ sessionId })
  const { error } = await stripe.redirectToCheckout({ sessionId })
  if (error) console.error(error)
}

const LoadingUser = () => (
  <div className="bg-blue-100 shadow-md rounded p-4 flex flex-col">
    Loading form...
  </div>
)

const Donate = () => {
  const { user, loading: userLoading } = useFetchUser({ required: true })
  return (
    <div>
      <h2>Donate</h2>
      {userLoading && <LoadingUser />}
      {!userLoading && (
        <form
          action="#"
          method="POST"
          className="bg-blue-100 shadow-xl rounded p-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            gotoPayment({ email: user.name })
          }}
        >
          <label>
            <div className="mt-4">Name</div>
            <input
              className="form-input border rounded shadow-md"
              id="name"
              type="text"
              name="name"
            />
          </label>
          <label>
            <div className="mt-4">Email</div>
            <input
              className="form-input border rounded shadow-md"
              id="email"
              type="text"
              name="email"
            />
          </label>
          <label>
            <div className="mt-4">Amount</div>
            <input
              className="form-input border rounded shadow-md"
              id="amount"
              type="number"
              name="amount"
            />
          </label>
          <div className="mt-8">
            <button
              className="form-button form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer rounded shadow-md"
              type="submit"
            >
              Donate
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default withApollo()(Donate)
