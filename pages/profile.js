import React from 'react'
import { gql, useSubscription } from '@apollo/react-hooks'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import Warning from '../components/warning'
import MembershipStatusIcon from '../components/membership-status-icon'
import InputName from '../components/profile/input-name'
import InputText from '../components/profile/input-text'
import InputTextarea from '../components/profile/input-textarea'
import InputClassOf from '../components/profile/input-class-of'
import InputBirthday from '../components/profile/input-birthday'
import PublicIcon from '../components/icons/public'
import PrivateIcon from '../components/icons/private'

const GET_ENROLLMENT = gql`
  subscription($userId: String!) {
    enrollments(limit: 1, where: { user: { id: { _eq: $userId } } }) {
      id
      given_name
      surname
      created_at
      member_type
      profile
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
        directory.
      </p>

      <InputName
        givenName={enrollment?.given_name}
        surname={enrollment?.surname}
      >
        <PublicIcon /> Name
      </InputName>

      {/* TODO: Photo */}
      {/* TODO: home phone, autoComplete="tel home"  */}
      {/* TODO: cell phone, autoComplete="tel mobile" */}
      {/* TODO: email of autoComplete="email home" */}
      {/* TODO: be a class rep? */}

      <InputText>
        <PrivateIcon /> T-Shirt Size
      </InputText>
      <InputBirthday>
        <PrivateIcon /> Birthday
      </InputBirthday>
      <InputClassOf>
        <PublicIcon /> Class Of
      </InputClassOf>

      <InputTextarea value={enrollment?.profile}>
        <PublicIcon /> Profile (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://daringfireball.net/projects/markdown/syntax"
        >
          markdown supported
        </a>
        )
      </InputTextarea>

      <button
        className="mt-4 lg:mt-6 form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer rounded shadow"
        type="submit"
      >
        Save
      </button>
      <p>
        <PublicIcon /> fields will be publicly listed in our directory.
        <br />
        <PrivateIcon /> fields will be kept private, available only to the
        Alumni Association board.
      </p>
    </div>
  )
}

export default withApollo()(Profile)
