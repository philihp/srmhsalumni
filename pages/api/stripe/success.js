import { gql } from '@apollo/react-hooks'
import stripe from '../../../lib/stripe'
import apollo from '../../../lib/apollo/apolloClient'

const client = apollo(undefined, {
  'content-type': 'application/json',
  'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
})

const UPDATE_ENROLLMENT = gql`
  mutation($memberType: String!, $email: String!) {
    update_enrollments(
      _set: { member_type: $memberType }
      where: { user: { email: { _eq: $email } } }
    ) {
      affected_rows
    }
  }
`

const figureMemberType = (status, subtotal) => {
  if (status === 'paid' && subtotal === 10000) return 'annual_paid'
  if (status === 'paid' && subtotal === 100000) return 'lifetime_paid'
  return status
}

const setMemberType = async (email, status, subtotal) => {
  const result = await client.mutate({
    mutation: UPDATE_ENROLLMENT,
    variables: { email, memberType: figureMemberType(status, subtotal) },
  })
  return result
}

export default async function success(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  const { sessionId } = req.query
  if (sessionId === undefined)
    return res.status(400).end('GET requires a sessionID param')

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
  const {
    amount_subtotal: amountSubtotal,
    payment_status: paymentStatus, // ==? 'paid'
    customer_email: customerEmail,
  } = checkoutSession
  await setMemberType(customerEmail, paymentStatus, amountSubtotal)
  return res.redirect(307, '/profile')
}
