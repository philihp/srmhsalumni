import React, { useState } from 'react'
import cx from 'classnames'
import { loadStripe } from '@stripe/stripe-js'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC)

const gotoPayment = async ({ amount, email }) => {
  const body = JSON.stringify({
    amount,
    customer_email: email,
  })
  const { sessionId } = await fetch('/api/stripe/donate', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  }).then((res) => res.json())
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({ sessionId })
  if (error) console.error(error)
}

const LoadingUser = () => (
  <div className="bg-blue-100 shadow-md rounded p-4 flex flex-col">
    Loading form...
  </div>
)

const Donate = () => {
  const { user, loading: userLoading } = useFetchUser({ required: false })
  const [email, setEmail] = useState('')
  const [emailBordered, setEmailBordered] = useState(false)
  const [amount, setAmount] = useState('50.00')

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
            if (user?.name || email) {
              setEmailBordered(false)
              gotoPayment({
                email: user?.name ?? email,
                amount: Number.parseFloat(amount) * 100,
              })
            } else {
              setEmailBordered(true)
            }
          }}
        >
          <label>
            <div className="mt-4">Email</div>
            {user?.name && (
              <input
                id="email"
                className="form-input rounded opacity-50 shadow-md"
                value={user?.name}
                readOnly
              />
            )}
            {!user?.name && (
              <input
                className={cx(
                  'form-input',
                  {
                    border: !emailBordered,
                    'border-2': emailBordered,
                    'border-red-500': emailBordered,
                  },
                  'rounded shadow-md'
                )}
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </label>
          <label>
            <div className="mt-4">Amount</div>
            <input
              className="form-input border rounded shadow-md"
              id="amount"
              type="number"
              step="0.01"
              min="5"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
