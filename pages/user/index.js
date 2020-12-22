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
            <DirectoryUser user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

// export const getStaticPaths = async () => ({
//   paths: [],
//   fallback: true,
// })

export const getStaticProps = async () => {
  const { data } = await apollo.query({
    query: GET_ENROLLMENT_LIST,
  })

  return {
    props: { directory: data?.public_enrollments || [] },
    revalidate: 1,
  }
}

export default Payment
