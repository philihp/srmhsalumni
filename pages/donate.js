import React from 'react'

const Donate = () => (
  <div>
    <h2>Donate</h2>
    <form method="GET" action="#">
      <label>
        <div className="mt-4">Name</div>
        <input
          className="form-input border rounded shadow-md"
          id="name"
          type="text"
          name="name"
        />
      </label>
      <label>
        <div className="mt-4">Email</div>
        <input
          className="form-input border rounded shadow-md"
          id="email"
          type="text"
          name="email"
        />
      </label>
      <label>
        <div className="mt-4">Amount</div>
        <input
          className="form-input border rounded shadow-md"
          id="amount"
          type="number"
          name="amount"
        />
      </label>
      <div className="mt-8">
        <button
          className="form-button form-input bg-indigo-600 hover:bg-indigo-700 text-white justify-center w-1/3 cursor-pointer rounded shadow-md"
          type="submit"
        >
          Donate
        </button>
      </div>
    </form>
  </div>
)

export default Donate
