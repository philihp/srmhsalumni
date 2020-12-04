import stripe from '../../../lib/stripe'

export default async function success(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  const { sessionId } = req.query
  if (sessionId === undefined)
    return res.status(400).end('GET requires a sessionID param')

  // const checkoutSession =
  await stripe.checkout.sessions.retrieve(sessionId)
  // checkoutSession.payment_status === 'paid'
  return res.status(200).end(JSON.stringify(process.env, undefined, 2))
  // TODO: this should post to GraphQL with:
  // at HASURA_GRAPHQL_PATH
  // with HASURA_GRAPHQL_ADMIN_SECRET

  // and then redirect to /profile
}
