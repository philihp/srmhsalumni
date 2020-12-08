import React from 'react'
import PropTypes from 'prop-types'

const InputTextarea = ({ children, value, onChange }) => {
  return (
    <label>
      <div>{children}</div>
      <textarea
        className="form-textarea block w-full border rounded shadow-lg"
        rows="20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

InputTextarea.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

InputTextarea.defaultProps = {
  children: () => <></>,
  value: '',
  onChange: () => {},
}

export default InputTextarea
