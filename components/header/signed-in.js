import React from 'react'
import Link from 'next/link'

const SignedIn = () => {
  return (
    <li className="px-2 md:px-4">
      <Link href="/api/logout">
        <a className="text-gray-500 font-semibold hover:text-purple-500">
          Logout
        </a>
      </Link>
    </li>
  )
}

export default SignedIn
