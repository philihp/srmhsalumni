import React from 'react'
import PropTypes from 'prop-types'

const InputText = ({ label, value }) => {
  return (
    <label>
      <div>{label}</div>
      <input
        type="text"
        className="form-input border rounded shadow-lg"
        value={value}
      />
    </label>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
}

InputText.defaultProps = {
  label: '',
  value: '',
}

export default InputText
