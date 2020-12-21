import React from 'react'
import { gql } from '@apollo/react-hooks'
import ReactMarkdown from 'react-markdown'
import apollo from '../../lib/apollo/client'

const GET_PROFILE = gql`
  query($userId: uuid!) {
    public_enrollments(where: { id: { _eq: $userId } }) {
      givenName: given_name
      surname
      profile
    }
  }
`

const Profile = ({ enrollment }) => {
  const { profile, surname, givenName } = enrollment || {}

  return (
    <div>
      <h1>
        {givenName} {surname}
      </h1>
      <ReactMarkdown>{profile}</ReactMarkdown>
    </div>
  )
}

export const getStaticPaths = async () => ({
  paths: [{ params: { userId: '99ce7766-2a6a-42e2-8fe3-a0df97f6e232' } }],
  fallback: true,
})

export const getStaticProps = async ({ params: { userId } }) => {
  console.log('generating', userId)
  const { data } = await apollo.query({
    query: GET_PROFILE,
    variables: { userId },
  })

  return {
    props: { enrollment: data?.public_enrollments?.[0] || {} },
    revalidate: 1,
  }
}

export default Profile
