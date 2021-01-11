import { gql } from '@apollo/react-hooks'
import stripe from '../../../lib/stripe'
import client from '../../../lib/apollo/client'

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
  await client.mutate({
    mutation: UPDATE_ENROLLMENT,
    variables: { email, memberType: figureMemberType(status, subtotal) },
  })
}

const GET_USER = gql`
  query($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`

const ADD_PAYMENT = gql`
  mutation(
    $userId: String!
    $stripeId: String!
    $stripeCustomer: String!
    $stripeCustomerEmail: String!
    $amountTotal: Int!
  ) {
    insert_payment_one(
      object: {
        user_id: $userId
        amount_total: $amountTotal
        stripe_customer: $stripeCustomer
        stripe_customer_email: $stripeCustomerEmail
        stripe_id: $stripeId
      }
    ) {
      id
    }
  }
`

const addPayment = async (checkoutSession) => {
  const {
    id: stripeId,
    customer: stripeCustomer,
    customer_email: stripeCustomerEmail,
    amount_total: amountTotal,
  } = checkoutSession
  const result = await client.query({
    query: GET_USER,
    variables: { email: stripeCustomerEmail },
  })
  const userId = result.data.users[0].id
  const variables = {
    userId,
    stripeId,
    stripeCustomer,
    stripeCustomerEmail,
    amountTotal,
  }
  await client.mutate({
    mutation: ADD_PAYMENT,
    variables,
  })
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
  await addPayment(checkoutSession)
  return res.redirect(307, '/profile')
}
