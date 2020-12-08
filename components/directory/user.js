import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const DirectoryUser = ({ user: { id, classOf, givenName, surname } }) => (
  <tr>
    <td>{classOf}</td>
    <td>
      <Link href={`/user/${id}`}>
        <a>
          {givenName} {surname}
        </a>
      </Link>
    </td>
  </tr>
)

DirectoryUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    classOf: PropTypes.string,
    givenName: PropTypes.string,
    surname: PropTypes.string,
  }).isRequired,
}

export default DirectoryUser
