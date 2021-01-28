import React from 'react'
import Link from 'next/link'

const Support = () => (
  <div>
    <p>
      If you would like to donate to the SRMHS Alumni Association, please click
      the link below. Be sure to enter in your email address in case we need to
      contact you for any reason.
    </p>
    <p>
      <Link href="/donate">
        <button
          type="button"
          className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Donate to the Alumni Association
        </button>
      </Link>
    </p>
    <p>
      Our booster club is running a fundraiser to help the football team raise
      funds. Please click the link below help out! Any and everything you can do
      helps! #gobulldogs #BULLDOGPRIDE
    </p>
    <p>
      <Link href="https://www.gofundme.com/f/p43r2-a-cause-i-care-about-needs-help?member=6361078&amp;utm_source=twilio&amp;utm_medium=sms&amp;utm_campaign=contacts-v2-invite-to-donate&amp;fbclid=IwAR3SFwg-9upT8out_SfltGuxkyQaEtgKTWjD532v8UfS358kUf9ttF3nYjI">
        <button
          type="button"
          className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Support SRHMS football
        </button>
      </Link>
    </p>
  </div>
)

export default Support
