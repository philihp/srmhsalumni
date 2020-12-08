import React from 'react'
import PropTypes from 'prop-types'

const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
const months = () =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
    const date = new Date(2020, i, 1)
    const monthName = date.toLocaleString('default', { month: 'long' })
    return [i + 1, monthName]
  })

const InputBirthday = ({ children, year, month, day, onChange }) => {
  return (
    <label>
      <div>{children}</div>
      <select
        className="form-select w-1/3 inline border rounded shadow-lg"
        name="month"
        value={month}
        placeholder="MM"
        autoComplete="bday-month"
        onChange={(e) => onChange(`${year}-${e.target.value}-${day}`)}
        defaultValue={month}
      >
        <option />
        {months().map(([mm, mon]) => (
          <option key={mon} aria-label={mon} value={mm}>
            {mon}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        max={daysInMonth(year, month) || 31}
        className="form-input inline mx-1 border rounded shadow-lg"
        name="day"
        value={day}
        onChange={(e) => onChange(`${year}-${month}-${e.target.value}`)}
        placeholder="DD"
        autoComplete="bday-day"
      />
      <input
        type="number"
        min={1980}
        max={new Date().getFullYear() - 10}
        className="form-input inline border rounded shadow-lg"
        name="year"
        onChange={(e) => onChange(`${e.target.value}-${month}-${day}`)}
        value={year}
        placeholder="YYYY"
        autoComplete="bday-year"
      />
    </label>
  )
}

InputBirthday.propTypes = {
  children: PropTypes.any,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  onChange: PropTypes.func,
}

InputBirthday.defaultProps = {
  children: () => <></>,
  year: undefined,
  month: undefined,
  day: undefined,
  onChange: () => {},
}

export default InputBirthday
