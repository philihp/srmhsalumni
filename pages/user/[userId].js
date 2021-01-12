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
  paths: [],
  fallback: true,
})

const getEnrollment = async (userId) => {
  const result = await apollo.query({
    query: GET_PROFILE,
    variables: { userId },
  })
  return result?.data?.public_enrollments?.[0] || {}
}

export const getStaticProps = async ({ params: { userId } }) => ({
  props: { enrollment: await getEnrollment(userId) },
  revalidate: 1,
})

export default Profile
