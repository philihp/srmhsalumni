import React from 'react'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../../lib/withApollo'

export const graduatingYears = () =>
  Array.from({ length: new Date().getFullYear() - 2000 }, (_, i) => 2001 + i)

const GET_ENROLLMENT = gql`
  subscription {
    public_enrollments {
      id
      member_type
      class_of
      given_name
      surname
    }
  }
`

const Payment = () => {
  // const { data } =
  useSubscription(GET_ENROLLMENT, {})

  return (
    <div>
      <h1>Directory</h1>
      <ul>
        {graduatingYears().map((y) => (
          <li key={y}>{y}</li>
        ))}
      </ul>
    </div>
  )
}

export default withApollo()(Payment)
