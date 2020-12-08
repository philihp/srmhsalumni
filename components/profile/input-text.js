import React from 'react'
import PropTypes from 'prop-types'

const InputText = ({ children, value, autoComplete }) => {
  return (
    <label>
      <div>{children}</div>
      <input
        type="text"
        className="form-input border rounded shadow-lg"
        value={value}
        autoComplete={autoComplete}
      />
    </label>
  )
}

InputText.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
}

InputText.defaultProps = {
  children: () => <></>,
  value: '',
  autoComplete: '',
}

export default InputText
