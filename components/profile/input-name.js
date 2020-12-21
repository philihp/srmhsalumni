import React from 'react'
import PropTypes from 'prop-types'

const InputName = ({
  children,
  givenName,
  surname,
  onGivenNameChange,
  onSurnameChange,
}) => {
  return (
    <label>
      <div>{children}</div>
      <input
        type="text"
        className="form-input mr-1 w-1/3 inline border rounded shadow-lg"
        value={givenName}
        onChange={(e) => onGivenNameChange(e.target.value)}
        autoComplete="given-name"
      />
      <input
        type="text"
        className="form-input mr-1 w-1/3 inline border rounded shadow-lg"
        value={surname}
        onChange={(e) => onSurnameChange(e.target.value)}
        autoComplete="family-name"
      />
    </label>
  )
}

InputName.propTypes = {
  children: PropTypes.any,
  givenName: PropTypes.string,
  surname: PropTypes.string,
  onGivenNameChange: PropTypes.func.isRequired,
  onSurnameChange: PropTypes.func.isRequired,
}

InputName.defaultProps = {
  children: () => <></>,
  givenName: 'John',
  surname: 'Modest',
}

export default InputName
