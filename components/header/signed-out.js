import React from 'react'
import HeaderLink from './header-link'

const SignedOut = () => {
  return (
    <ul className="inline-flex items-center">
      <HeaderLink href="/api/login">Login</HeaderLink>
    </ul>
  )
}

export default SignedOut
