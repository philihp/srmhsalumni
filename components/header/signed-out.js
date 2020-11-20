import React from 'react'
import Link from 'next/link'

const SignedOut = () => {
  return (
    <div className="px-2 md:px-4">
      <Link href="/api/login">
        <a className="text-gray-500 font-semibold hover:text-purple-500">
          Login
        </a>
      </Link>
    </div>
  )
}

export default SignedOut
