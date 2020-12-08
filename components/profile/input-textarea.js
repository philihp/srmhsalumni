import React from 'react'
import PropTypes from 'prop-types'

const InputText = ({ children, value }) => {
  return (
    <label>
      <div>{children}</div>
      <textarea
        className="form-textarea block w-full border rounded shadow-lg"
        rows="20"
        value={value}
      />
    </label>
  )
}

InputText.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string,
}

InputText.defaultProps = {
  children: () => <></>,
  value: '',
}

export default InputText
