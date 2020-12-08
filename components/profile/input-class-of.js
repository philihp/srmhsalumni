import React from 'react'
import PropTypes from 'prop-types'

export const graduatingYears = () =>
  Array.from({ length: new Date().getFullYear() - 2000 }, (_, i) => 2001 + i)

const InputText = ({ children, value }) => {
  return (
    <label>
      <div>{children}</div>
      <select className="form-select block border rounded shadow-lg">
        <option />
        {graduatingYears().map((y) => (
          <option selected={value === y}>{y}</option>
        ))}
      </select>
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
