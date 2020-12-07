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
        update_columns: [given_name, surname]
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
      <h2>Frequently Asked Questions</h2>
      <p>
        
         <b>1. How do I join the Alumni Association?</b> 
           </p>
           <p>
           <b>Online</b>: Only credit/debit cards are accepted online.
           </p>
           <p>
           <b>In person</b>: Stop by Southeast Raleigh Magnet High School and complete a membership
           application. We can accept checks and certified money orders in person. 
           Make the check or money order out to Southeast Raleigh Magnet High School Alumni Association and Friends. 
           Completed application and payment must be placed in a sealed envelope and placed the SRMHS Alumni mailbox.
           </p>
           <p>
            <b>By mail</b>: Complete the Membership Application and mail to it along with payment to 
             Southeast Raleigh Magnet Hight School at 2600 Rock Quarry Rd, Raleigh, NC 27610.
          </p>
          <p>
         <b>2.	What is the cost to be a member?</b> 
           </p>
           <p>
                  The cost of a membership is $100.00 per year or a one-time fee of $1000.00 for a lifetime membership.
         </p>
         <p>
           <b>3.	When do I complete my membership profile?</b> 
         </p>
         <p>
                  After your payment is accepted, you will then be directed to complete your profile page. 
         </p>
         <p>
          <b>4.	Do I have to be an alumnus of Southeast Raleigh Magnet High School?</b>
         </p>
         <p>
                  No! Our membership plans and benefits are geared towards SRMHS grads, but membership is not only limited to graduates of the high school. 
                  If you attended SRMHS school for at least 1 year, you could become a member. 
                  If you currently work at SRMHS as faculty or staff, and 
                  If you are a member of the community that holds the same values and purpose of the association; you can also become a member. 
         </p>
         <p>
          <b>5.	What comes with the membership?</b> 
         </p>
         <p>
                  As a member of the SRMHS Alumni Association there are many perks and benefits. As a member you receive:
                  (1) Special seating at select sporting games held at the school,
                  (2) Select promotional items provided by the association, 
                  (3) Opportunities to apply for special scholarships for students/children of alumni who attend SRMHS,
                  (4) Invitations to special events held by the association at a discounted price, and other benefits. 
         </p>
         <p>
                  As a lifetime member, you will receive all the afore mentioned benefits as well as free admission to one Alumni event during your 
                  first year of membership and then a 50% off the cost of future events. 
         </p>
         <p>
                   As an active member you will also have the right to vote at all meetings, and shall be eligible for appointment to committees 
                   and to hold office in accordance with the by-laws of the association.
         </p>
         <p> 
           <b>6.	Is there an annual fee for membership?</b>
         </p>
         <p>       
                  Yes, the annual fee is $100
         </p>
         <p>  
            <b>7.	Married couple discounts?</b> 
         </p>
         <p>  
                  No, we do not have a discount for married couples 
         </p>
         <p>
             <b>8.	What is the different between a lifetime member vs. regular membership?</b> 
         </p>
         <p>  
                  A regular membership has an annual cost of $100.  The lifetime membership has a one-time fee of $1000. 
                  A lifetime membership also provides a discounted cost to Alumni events. 
         </p>
         <p>
             <b>9.	Where does the money I pay for membership go to?</b>
         </p>
         <p>  
                  The Alumni Association will allocate the resources provided by members via membership costs and donations to pay for events held by the association, 
                  scholarships provided to students, as well as to the school itself. As a member, you will have the opportunity to view and vote on budgets provided 
                  by the financial committee. 
         </p>
         <p>
             <b>10.	How can I cancel my membership?</b>
         </p>
         <p>  
                  If you ever want to cancel your membership for any reason, please email srmhsalumni@gmail.com for assistance.  
                  Please note there will not be any refunds provided for cancelled memberships. 
 
      </p>
    </div>
  )
}

export default withApollo()(Membership)
