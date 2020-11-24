import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/react-hooks'
import { withApollo } from '../lib/withApollo'
// import { useFetchUser } from '../lib/user'

const ADD_ENROLLMENT = gql`
  mutation(
    $givenName: String!
    $middleName: String!
    $surname: String!
    $maidenName: String!
  ) {
    insert_enrollments(
      objects: {
        given_name: $givenName
        middle_name: $middleName
        surname: $surname
        maiden_name: $maidenName
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`

const Membership = () => {
  const [givenName, setGivenNameInput] = useState('')
  const [middleName, setMiddleNameInput] = useState('')
  const [surname, setSurnameInput] = useState('')
  const [maidenName, setMaidenNameInput] = useState('')
  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {
    onCompleted: (data) => {
      console.log({ data })
    },
  })
  return (
    <div>
      <h2>Enrollment Form</h2>
      <form
        action="#"
        method="POST"
        className="bg-blue-100 shadow-md rounded p-4 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault()
          addEnrollment({
            variables: {
              givenName,
              middleName,
              surname,
              maidenName,
            },
          })
        }}
      >
        <div className="flex">
          <div className="w-full">
            <label htmlFor="given_name" className="text-gray-700">
              Name
            </label>
            <input
              id="given_name"
              className="form-input block mb-2"
              value={givenName}
              onChange={(e) => setGivenNameInput(e.target.value)}
              placeholder="Given Name"
            />
            <input
              id="middle_name"
              className="form-input block mb-2"
              value={middleName}
              onChange={(e) => setMiddleNameInput(e.target.value)}
              placeholder="Middle Name"
            />
            <input
              id="surname"
              className="form-input block mb-2"
              value={surname}
              onChange={(e) => setSurnameInput(e.target.value)}
              placeholder="Surname"
            />
            <input
              id="maiden_name"
              className="form-input block mb-2"
              value={maidenName}
              onChange={(e) => setMaidenNameInput(e.target.value)}
              placeholder="Maiden Name"
            />
          </div>
        </div>

        <h3>Membership Fee</h3>

        <p>
          I understand that the fee for membership fee for alumni, friends,
          faculty &amp; staff is $100.00 annually and the lifetime membership is
          a one-time membership fee of $1000.00.
        </p>
        <p>
          To activate your membership, the membership fee is due with the
          enrollment form.
        </p>
        <div className="flex flex-row-reverse">
          <input
            className="form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer"
            type="submit"
          />
        </div>
      </form>

      <h2>FAQ</h2>
      <p>
        Place holder page for now… we ae working on a list of questions and
        answers
      </p>
    </div>
  )
}

export default withApollo()(Membership)
