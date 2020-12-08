import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useSubscription, useMutation } from '@apollo/react-hooks'
import { withApollo } from '../lib/withApollo'
import { useFetchUser } from '../lib/user'
import Warning from '../components/warning'
import MembershipStatusIcon from '../components/membership-status-icon'
import InputName from '../components/profile/input-name'
import InputText from '../components/profile/input-text'
import InputTextarea from '../components/profile/input-textarea'
import InputClassOf from '../components/profile/input-class-of'
// import InputBirthday from '../components/profile/input-birthday'
import PublicIcon from '../components/icons/public'
import PrivateIcon from '../components/icons/private'

const GET_ENROLLMENT = gql`
  subscription($userId: String!) {
    enrollments(limit: 1, where: { user: { id: { _eq: $userId } } }) {
      id
      member_type
      given_name
      tshirt_size
      class_of
      surname
      profile
      user {
        email
      }
    }
  }
`

const UPDATE_ENROLLMENT = gql`
  mutation(
    $userId: String!
    $givenName: String
    $surname: String
    $tshirtSize: String
    $classOf: Int
    $profile: String
  ) {
    insert_enrollments_one(
      object: {
        user_id: $userId
        given_name: $givenName
        surname: $surname
        tshirt_size: $tshirtSize
        class_of: $classOf
        profile: $profile
      }
      on_conflict: {
        constraint: enrollments_user_id_key
        update_columns: [given_name, surname, tshirt_size, class_of, profile]
      }
    ) {
      id
    }
  }
`

const Profile = () => {
  const router = useRouter()
  const { user } = useFetchUser({ required: true })
  const { data, loading, error: selectError } = useSubscription(
    GET_ENROLLMENT,
    {
      variables: {
        userId: user?.sub,
      },
    }
  )
  const [
    updateEnrollment,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_ENROLLMENT, {
    onCompleted: () => router.push('/directory'),
  })
  const enrollment = data?.enrollments?.[0]

  const [givenName, setGivenName] = useState(enrollment?.given_name || '')
  const [surname, setSurname] = useState(enrollment?.surname || '')
  const [tshirtSize, setTshirtSize] = useState(enrollment?.tshirt_size || '')
  const [classOf, setClassOf] = useState(enrollment?.class_of || '')
  const [profile, setProfile] = useState(enrollment?.profile || '')

  // this is gross, but the fields won't load without it... must be a better way
  useEffect(() => {
    if (loading === false && data) {
      setGivenName(enrollment?.given_name)
      setSurname(enrollment?.surname)
      setTshirtSize(enrollment?.tshirt_size)
      setClassOf(enrollment?.class_of)
      setProfile(enrollment?.profile)
    }
  }, [loading, data, enrollment])

  if (loading) return <div>Loading...</div>

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const variables = {
          userId: user.sub,
          givenName,
          surname,
          tshirtSize,
          classOf,
          profile,
        }
        updateEnrollment({ variables })
      }}
    >
      <h1>Profile</h1>
      {selectError && <Warning>{JSON.stringify(selectError?.message)}</Warning>}

      <div>Membership Status</div>
      <MembershipStatusIcon memberType={enrollment?.member_type} />
      <div className="italic text-gray-600 pb-4">
        An active membership status is required for inclusion in the alumni
        directory.
      </div>

      <InputText value={enrollment?.user?.email}>
        <PrivateIcon />
        Email
      </InputText>

      <InputName
        givenName={givenName}
        surname={surname}
        onGivenNameChange={setGivenName}
        onSurnameChange={setSurname}
      >
        <PublicIcon /> Name
      </InputName>

      {/* TODO: Photo */}
      {/* TODO: home phone, autoComplete="tel home"  */}
      {/* TODO: cell phone, autoComplete="tel mobile" */}
      {/* TODO: email of autoComplete="email home" */}
      {/* TODO: be a class rep? */}

      <InputText value={tshirtSize} onChange={setTshirtSize}>
        <PrivateIcon /> T-Shirt Size
      </InputText>
      {/* <InputBirthday value={birthday} onChange={setBirthday}>
        <PrivateIcon /> Birthday
      </InputBirthday> */}
      <InputClassOf value={classOf} onChange={setClassOf}>
        <PublicIcon /> Class Of
      </InputClassOf>

      <InputTextarea value={profile} onChange={setProfile}>
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

      {updateError && <Warning>{JSON.stringify(updateError?.message)}</Warning>}
      <button
        className="mt-4 lg:mt-6 form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer rounded shadow"
        type="submit"
      >
        {updateLoading ? '...' : 'Save'}
      </button>
      <p>
        <PublicIcon /> fields will be publicly listed in our directory.
        <br />
        <PrivateIcon /> fields will be kept private, available only to the
        Alumni Association board. We don&apos;t sell your info, it ain&apos;t
        like that.
      </p>
    </form>
  )
}

export default withApollo()(Profile)
