import Stripe from 'stripe'

const PRICES = {
  annual: process.env.STRIPE_ANNUAL_PRICE_ID,
  lifetime: process.env.STRIPE_LIFETIME_PRICE_ID,
}

const MODES = {
  annual: 'subscription',
  lifetime: 'payment',
}

const apiVersion = '2020-08-27'
const stripe = new Stripe(process.env.STRIPE_PRIVATE, { apiVersion })

export default async function session(req, res) {
  if (req.method === 'POST') {
    const {
      quantity,
      membershipLevel,
      customer_email: customerEmail,
    } = req.body
    const ses = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      payment_method_types: ['card'],
      line_items: [{ price: PRICES[membershipLevel], quantity }],
      mode: MODES[membershipLevel],
      success_url: `${req.headers.origin}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/api/stripe/cancel?session_id={CHECKOUT_SESSION_ID}`,
    })
    res.status(200).json({ sessionId: ses.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
