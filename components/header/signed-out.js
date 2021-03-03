import React from 'react'
import HeaderLink from './header-link'

const SignedOut = () => {
  return (
    <ul className="inline-flex items-center">
      <HeaderLink href="/user">Directory</HeaderLink>
      <HeaderLink href="/api/auth/login">Login</HeaderLink>
      <HeaderLink href="/api/auth/signup">Sign Up</HeaderLink>
    </ul>
  )
}

export default SignedOut
