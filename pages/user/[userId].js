import React from 'react'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../../lib/withApollo'
import Warning from '../../components/warning'

const GET_PROFILE = gql`
  subscription($userId: uuid!) {
    public_enrollments(where: { id: { _eq: $userId } }) {
      givenName: given_name
      surname
      profile
    }
  }
`

const Payment = () => {
  const router = useRouter()
  const { userId } = router.query
  const { data, loading, error } = useSubscription(GET_PROFILE, {
    variables: { userId },
  })

  const { profile, surname, givenName } = data?.public_enrollments?.[0] || {}

  return (
    <div>
      <h1>
        {givenName} {surname}
      </h1>
      {!loading && error && <Warning>{JSON.stringify(error?.message)}</Warning>}
      {profile}
    </div>
  )
}

export default withApollo()(Payment)
