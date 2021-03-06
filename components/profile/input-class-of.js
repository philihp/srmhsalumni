import React from 'react'
import PropTypes from 'prop-types'

const START_YEAR = 1999
export const graduatingYears = () =>
  Array.from(
    { length: new Date().getFullYear() - START_YEAR + 1 },
    (_, i) => START_YEAR + i
  )

const InputClassOf = ({ children, value, onChange }) => {
  return (
    <label>
      <div>{children}</div>
      <select
        className="form-select block border rounded shadow-lg"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option />
        {graduatingYears().map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
    </label>
  )
}

InputClassOf.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

InputClassOf.defaultProps = {
  children: () => <></>,
  value: 2002,
  onChange: () => {},
}

export default InputClassOf
