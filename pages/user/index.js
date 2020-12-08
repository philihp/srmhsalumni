import React from 'react'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../../lib/withApollo'
import DirectoryUser from '../../components/directory/user'

const GET_ENROLLMENT = gql`
  subscription {
    public_enrollments {
      id
      classOf: class_of
      givenName: given_name
      surname
    }
  }
`

const Payment = () => {
  const { data } = useSubscription(GET_ENROLLMENT, {})
  const directory = data?.public_enrollments || []

  return (
    <div>
      <h1>Directory</h1>
      <table>
        <thead>
          <th>Class</th>
          <th>Name</th>
        </thead>
        <tbody>
          {directory.map((user) => (
            <DirectoryUser user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default withApollo()(Payment)
