import React from 'react'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import Warning from '../components/warning'
import MembershipStatusIcon from '../components/membership-status-icon'
import InputText from '../components/profile/input-text'

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

      <p>
        An active membership status is required for inclusion in the alumni
        directory. If you&apos;re interested in this, please get in touch with a
        class rep.
      </p>

      <InputText label="Given Name" value={enrollment?.given_name} />
      <InputText label="Surname" value={enrollment?.surname} />

      {/* TODO: Photo */}

      {/* TODO: home phone */}
      {/* TODO: cell phone */}
      {/* TODO: email of */}

      {/* TODO: t-shirt size */}
      {/* TODO: birthday */}
      {/* TODO: class of */}
      {/* TODO: be a class rep? */}

      {/* TODO: profile */}
    </div>
  )
}

export default withApollo()(Profile)
