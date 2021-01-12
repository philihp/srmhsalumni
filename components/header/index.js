import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeaderLink from './header-link'

const Index = () => {
  return (
    <>
      <div className="flex items-center justify-between py-2 border-b">
        <div className="px-4">
          <Link href="/">
            <a>
              <Image src="/logo.png" height="75" width="97" />
            </a>
          </Link>
        </div>
        <ul className="inline-flex items-center">
          <HeaderLink href="/about">About</HeaderLink>
          <HeaderLink href="/membership">Membership</HeaderLink>
          {/* <HeaderLink href="/events">Events</HeaderLink> */}
          <HeaderLink href="/engagement">Engagement</HeaderLink>
          {/* <HeaderLink href="/news">News</HeaderLink> */}
          {/* <HeaderLink href="/gallery">Gallery</HeaderLink> */}
          {/* <HeaderLink href="/shop">Shop</HeaderLink> */}
          <HeaderLink href="/support">Support</HeaderLink>
          <HeaderLink href="/contact-us">Contact</HeaderLink>
        </ul>
      </div>
    </>
  )
}

Index.defaultProps = {
  Subnav: undefined,
}

export default Index
