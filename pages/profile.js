import React from 'react'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import Warning from '../components/warning'
import MembershipStatusIcon from '../components/membership-status-icon'

const GET_ENROLLMENT = gql`
  subscription($userId: String!) {
    enrollments(limit: 1, where: { user: { id: { _eq: $userId } } }) {
      id
      given_name
      surname
      created_at
      member_type
    }
  }
`

const Profile = () => {
  const { user } = useFetchUser({ required: true })
  const { data, loading, error } = useSubscription(GET_ENROLLMENT, {
    variables: {
      userId: user?.sub,
    },
  })
  const enrollment = data?.enrollments?.[0]

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Profile</h1>
      {error && <Warning>{JSON.stringify(error?.message)}</Warning>}

      <div>Membership Status</div>
      <MembershipStatusIcon memberType={enrollment?.member_type} />

      <label>
        <div>Given Name</div>
        <input
          type="text"
          className="form-input border rounded shadow-lg"
          value={enrollment?.given_name}
        />
      </label>
      <label>
        <div>Surname</div>
        <input
          type="text"
          className="form-input border rounded shadow-lg"
          value={enrollment?.surnname}
        />
      </label>
    </div>
  )
}

export default withApollo()(Profile)
