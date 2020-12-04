import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Warning = ({ children, type, color }) => (
  <div className="text-center">
    <div className="p-2">
      <div className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
        <span
          className={cx(
            'inline-flex',
            `bg-${color}-500`,
            'text-white',
            'rounded-full',
            'h-6',
            'px-3',
            'justify-center',
            'items-center'
          )}
        >
          {type}
        </span>
        <span className="inline-flex px-2">{children}</span>
      </div>
    </div>
  </div>
)

Warning.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
}

Warning.defaultProps = {
  type: 'Warning',
  color: 'red',
}

export default Warning
