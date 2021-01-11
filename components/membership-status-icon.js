import React from 'react'
import PropTypes from 'prop-types'

const inner = (memberType) => {
  switch (memberType) {
    case 'paid':
    case 'lifetime_paid':
    case 'annual_paid':
    case 'provisionalpaid':
      return (
        <>
          Paid{' '}
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
  <div className="border rounded w-1/3 shadow-lg p-2 bg-gray-100">
    {inner(memberType)}
  </div>
)

MembershipStatusIcon.propTypes = {
  memberType: PropTypes.string,
}

MembershipStatusIcon.defaultProps = {
  memberType: undefined,
}

export default MembershipStatusIcon
