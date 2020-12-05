import React from 'react'
import PropTypes from 'prop-types'

const inner = (memberType) => {
  switch (memberType) {
    case 'annual_paid':
      return (
        <>
          Annual{' '}
          <span role="img" aria-label="Paid">
            ✅
          </span>
        </>
      )
    case 'lifetime_paid':
      return (
        <>
          Lifetime{' '}
          <span role="img" aria-label="Paid">
            ✅
          </span>
        </>
      )
    default:
      return <>Unpaid</>
  }
}

const MembershipStatusIcon = ({ memberType }) => (
  <div className="border rounded w-1/3 shadow-lg px-2">{inner(memberType)}</div>
)

MembershipStatusIcon.propTypes = {
  memberType: PropTypes.string.isRequired,
}

export default MembershipStatusIcon
