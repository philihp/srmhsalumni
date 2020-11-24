import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PRIVATE, {
  apiVersion: '2020-08-27',
})

export default async function session(req, res) {
  if (req.method === 'POST') {
    const { quantity } = req.body
    const ses = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1HqyKrGbrmPFi1xjAPk2zu47',
          quantity,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    })
    res.status(200).json({ sessionId: ses.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
