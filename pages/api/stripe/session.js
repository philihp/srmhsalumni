import stripe from '../../../lib/stripe'

const PRICES = {
  annual: process.env.STRIPE_ANNUAL_PRICE_ID,
  lifetime: process.env.STRIPE_LIFETIME_PRICE_ID,
}

const MODES = {
  annual: 'subscription',
  lifetime: 'payment',
}

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
      success_url: `${req.headers.origin}/api/stripe/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/membership`,
    })
    return res.status(200).json({ sessionId: ses.id })
  }

  if (req.method === 'GET') {
    const { sessionId } = req.query
    if (sessionId === undefined)
      return res.status(400).end('GET requires a sessionID param')
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
    return res.status(200).json(checkoutSession)
  }

  res.setHeader('Allow', 'POST', 'GET')
  return res.status(405).end('Method Not Allowed')
}
