import React from 'react'
import Link from 'next/link'

const HeaderLink = ({ href, children }) => (
  <li className="px-2 md:px-4">
    <Link href={href}>
      <a>{children}</a>
    </Link>
  </li>
)

export default HeaderLink
