import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/react-hooks'
import { loadStripe } from '@stripe/stripe-js'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC)

const gotoPayment = async (_event) => {
  const { sessionId } = await fetch('/api/stripe/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ quantity: 1 }),
  }).then((res) => res.json())
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({ sessionId })
  if (error) console.error(error)
}

const ADD_ENROLLMENT = gql`
  mutation(
    $userId: String!
    $givenName: String!
    $middleName: String!
    $surname: String!
    $maidenName: String!
  ) {
    insert_enrollments_one(
      object: {
        user_id: $userId
        given_name: $givenName
        middle_name: $middleName
        surname: $surname
        maiden_name: $maidenName
      }
      on_conflict: {
        constraint: enrollments_user_id_key
        update_columns: [given_name, middle_name, surname, maiden_name]
      }
    ) {
      id
    }
  }
`

const GET_ENROLLMENT = gql`
  query MyQuery {
    enrollments(limit: 1) {
      id
      maiden_name
      given_name
      middle_name
      surname
      created_at
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
    Checking enrollment...
  </div>
)

const Membership = () => {
  const { user, loading: userLoading } = useFetchUser({ required: true })
  const { data, loading: enrollmentLoading } = useQuery(GET_ENROLLMENT)
  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {
    onCompleted: gotoPayment,
  })
  const enrollment = data?.enrollments?.[0]
  const [givenName, setGivenNameInput] = useState(enrollment?.given_name || '')
  const [middleName, setMiddleNameInput] = useState(
    enrollment?.middle_name || ''
  )
  const [surname, setSurnameInput] = useState(enrollment?.surname || '')
  const [maidenName, setMaidenNameInput] = useState(
    enrollment?.maiden_name || ''
  )
  return (
    <div>
      <h2>Enrollment Form</h2>
      {userLoading && <LoadingUser />}
      {!userLoading && enrollmentLoading && <LoadingEnrollment />}
      {!userLoading && !enrollmentLoading && (
        <form
          action="#"
          method="POST"
          className="bg-blue-100 shadow-md rounded p-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            const variables = {
              userId: user.sub,
              givenName,
              middleName,
              surname,
              maidenName,
            }
            addEnrollment({ variables })
          }}
        >
          <div className="flex">
            <div className="w-full">
              <label htmlFor="given_name" className="text-gray-700">
                Name
              </label>
              <input
                id="given_name"
                className="form-input block mb-2"
                value={givenName}
                onChange={(e) => setGivenNameInput(e.target.value)}
                placeholder="Given Name"
              />
              <input
                id="middle_name"
                className="form-input block mb-2"
                value={middleName}
                onChange={(e) => setMiddleNameInput(e.target.value)}
                placeholder="Middle Name"
              />
              <input
                id="surname"
                className="form-input block mb-2"
                value={surname}
                onChange={(e) => setSurnameInput(e.target.value)}
                placeholder="Surname"
              />
              <input
                id="maiden_name"
                className="form-input block mb-2"
                value={maidenName}
                onChange={(e) => setMaidenNameInput(e.target.value)}
                placeholder="Maiden Name"
              />
            </div>
          </div>

          {enrollment?.created_at && (
            <p>Enrollment submitted on {enrollment.created_at.slice(0, 10)}</p>
          )}

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
              className="form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer"
              type="submit"
              value="Submit for Payment"
            />
          </div>
        </form>
      )}
      <h2>FAQ</h2>
      <p>
        Place holder page for now… we ae working on a list of questions and
        answers
      </p>
    </div>
  )
}

export default withApollo()(Membership)
