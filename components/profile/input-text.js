import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const InputText = ({ children, value, onChange, autoComplete }) => {
  return (
    <label>
      <div>{children}</div>
      <input
        type="text"
        className={cx(
          'form-input',
          {
            'bg-gray-100': onChange === undefined,
          },
          'border',
          'rounded',
          'shadow-lg'
        )}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange && ((e) => onChange(e.target.value))}
        readOnly={onChange === undefined}
      />
    </label>
  )
}

InputText.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
}

InputText.defaultProps = {
  children: () => <></>,
  onChange: undefined,
  value: '',
  autoComplete: '',
}

export default InputText
