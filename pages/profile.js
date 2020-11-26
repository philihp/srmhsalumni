import React from 'react'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'

const GET_ENROLLMENT = gql`
  subscription {
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

const Profile = () => {
  useFetchUser({ required: true })
  const { data, loading } = useSubscription(GET_ENROLLMENT)
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Placeholder</h1>
      <pre>{JSON.stringify(data?.enrollments?.[0], undefined, 2)}</pre>
    </div>
  )
}

export default withApollo()(Profile)
