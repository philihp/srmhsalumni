import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/react-hooks'
import { loadStripe } from '@stripe/stripe-js'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import Warning from '../components/warning'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC)

const gotoPayment = ({ email, membershipLevel }) => async (_event) => {
  const body = JSON.stringify({
    quantity: 1,
    customer_email: email,
    membershipLevel,
  })
  const { sessionId } = await fetch('/api/stripe/session', {
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

const ADD_ENROLLMENT = gql`
  mutation($userId: String!, $givenName: String!, $surname: String!) {
    insert_enrollments_one(
      object: { user_id: $userId, given_name: $givenName, surname: $surname }
      on_conflict: {
        constraint: enrollments_user_id_key
        update_columns: [given_name, middle_name, surname, maiden_name]
      }
    ) {
      id
    }
  }
`

const GET_USER = gql`
  query($userId: String!) {
    users(where: { id: { _eq: $userId } }) {
      email
      enrollment {
        given_name
        surname
        created_at
      }
    }
  }
`

const LoadingUser = () => (
  <div className="bg-blue-100 shadow-md rounded p-4 flex flex-col">
    Loading form...
  </div>
)

const LoadingEnrollment = () => (
  <div className="bg-blue-100 shadow-md rounded p-4 flex flex-col">
    Checking for prior enrollment...
  </div>
)

const Membership = () => {
  const { user, loading: userLoading } = useFetchUser({ required: true })
  const { data, loading: enrollmentLoading } = useQuery(GET_USER, {
    variables: { userId: user?.sub },
  })
  const email = data?.users?.[0]?.email
  const enrollment = data?.users?.[0]?.enrollment
  const [givenName, setGivenNameInput] = useState(enrollment?.given_name || '')
  const [surname, setSurnameInput] = useState(enrollment?.surname || '')
  const [membershipLevel, setMembershipLevel] = useState('annual')
  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {
    onCompleted: gotoPayment({ email, membershipLevel }),
  })

  return (
    <div>
      <h2>Enrollment Form</h2>
      {userLoading && <LoadingUser />}
      {!userLoading && enrollmentLoading && <LoadingEnrollment />}
      {!userLoading && !enrollmentLoading && (
        <form
          action="#"
          method="POST"
          className="bg-blue-100 shadow-xl rounded p-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            const variables = {
              userId: user.sub,
              givenName,
              surname,
            }
            addEnrollment({ variables })
          }}
        >
          {enrollment?.created_at && (
            <Warning>
              Records show a previous enrollment was submitted on{' '}
              {enrollment.created_at.slice(0, 10)}, and is awaiting approval. If
              this was an error, please email srmhsalumni@gmail.com
            </Warning>
          )}
          <h5>Email Address</h5>
          <input
            id="email"
            className="form-input mt-1 block w-1/2 rounded opacity-50 shadow"
            value={user?.name}
            readOnly
          />

          <h5 className="mt-4">Given name</h5>
          <input
            id="given_name"
            className="form-input mt-1 block w-1/2 rounded shadow"
            value={givenName}
            onChange={(e) => setGivenNameInput(e.target.value)}
            placeholder="e.g. John"
          />
          <h5 className="mt-4">Surname</h5>
          <input
            id="surname"
            className="form-input mt-1 block w-1/2 rounded shadow"
            value={surname}
            onChange={(e) => setSurnameInput(e.target.value)}
            placeholder="e.g. Modest"
          />

          <h5 className="mt-4">Membership Level</h5>
          <div className="block">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio shadow"
                name="membershipLevel"
                value="annual"
                checked={membershipLevel === 'annual'}
                onChange={() => setMembershipLevel('annual')}
              />
              <span className="ml-2">Annual</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio shadow"
                name="membershipLevel"
                value="lifetime"
                checked={membershipLevel === 'lifetime'}
                onChange={() => setMembershipLevel('lifetime')}
              />
              <span className="ml-2">Lifetime</span>
            </label>
          </div>

          <h3>Membership Fee</h3>

          <p>
            I understand that the fee for membership fee for alumni, friends,
            faculty &amp; staff is $100.00 annually and the lifetime membership
            is a one-time membership fee of $1000.00.
          </p>
          <p>
            To activate your membership, the membership fee is due with the
            enrollment form on the next page.
          </p>
          <div className="flex flex-row-reverse">
            <input
              className="form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer rounded shadow"
              type="submit"
              value="Submit for Payment"
            />
          </div>
        </form>
      )}
      <h2>FAQ</h2>
      <p>
        1.	How do I join the Alumni Association? 
            a.	Online:  Only credit/debit cards are accepted online.
            b.	In person: Stop by Southeast Raleigh Magnet High School and complete a membership application.  
                We can accept checks and certified money orders in person. 
                Make the check or money order out to Southeast Raleigh Magnet High School Alumni Association and Friends. 
            c.	By mail: Complete the Membership Application and mail to Southeast Raleigh Magnet Hight School at 2600 Rock Quarry Rd, Raleigh, NC 27610.
      </p>
       <p>
         2.	What is the cost to be a member? 
            a.	The cost of a membership is $100.00 per year or a one-time fee of $1000.00 for a lifetime membership.
 
      </p>
    </div>
  )
}

export default withApollo()(Membership)
