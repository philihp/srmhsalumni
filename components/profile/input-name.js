import React from 'react'
import PropTypes from 'prop-types'

const InputText = ({ children, givenName, surname }) => {
  return (
    <label>
      <div>{children}</div>
      <input
        type="text"
        className="form-input mr-1 w-1/3 inline border rounded shadow-lg"
        value={givenName}
        autoComplete="given-name"
      />
      <input
        type="text"
        className="form-input mr-1 w-1/3 inline border rounded shadow-lg"
        value={surname}
        autoComplete="family-name"
      />
    </label>
  )
}

InputText.propTypes = {
  children: PropTypes.any,
  givenName: PropTypes.string,
  surname: PropTypes.string,
}

InputText.defaultProps = {
  children: () => <></>,
  givenName: 'John',
  surname: 'Modest',
}

export default InputText
