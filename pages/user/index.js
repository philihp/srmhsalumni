import React from 'react'
import { gql } from '@apollo/react-hooks'
import DirectoryUser from '../../components/directory/user'
import apollo from '../../lib/apollo/client'

const GET_ENROLLMENT_LIST = gql`
  query {
    public_enrollments {
      id
      classOf: class_of
      givenName: given_name
      surname
    }
  }
`

const Payment = ({ directory }) => {
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
            <DirectoryUser key={user} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const getDirectory = async () => {
  const result = await apollo.query({
    query: GET_ENROLLMENT_LIST,
  })
  return result?.data?.public_enrollments || []
}

export const getStaticProps = async () => ({
  props: { directory: await getDirectory() },
  revalidate: 1,
})

export default Payment
