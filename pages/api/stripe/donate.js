import stripe from '../../../lib/stripe'
import configly from '../../../lib/configly'

export default async function donate(req, res) {
  if (req.method === 'POST') {
    const { customer_email: customerEmail, amount } = req.body
    const product = await configly.get('donate_product')

    const ses = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            unit_amount: amount,
            currency: 'usd',
            product,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/api/stripe/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/donate`,
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
