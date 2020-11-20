import React from 'react'
import Image from 'next/image'
import HeaderLink from './header-link'
import UserBar from './user-bar'

const Index = ({ user, loading, Subnav }) => {
  return (
    <>
      <UserBar user={user} loading={loading} />
      <div className="flex items-center justify-between py-2 border-b">
        <div className="px-4">
          <Image src="/logo.png" height="75" width="97" />
        </div>
        <ul className="inline-flex items-center">
          <HeaderLink href="/about">About</HeaderLink>
          <HeaderLink href="/membership">Membership</HeaderLink>
          <HeaderLink href="/events">Events</HeaderLink>
          <HeaderLink href="/engagement">Engagement</HeaderLink>
          <HeaderLink href="/news">News</HeaderLink>
          {/* <HeaderLink href="/gallery">Gallery</HeaderLink> */}
          {/* <HeaderLink href="/shop">Shop</HeaderLink> */}
          <HeaderLink href="/support">Support</HeaderLink>
          <HeaderLink href="/">Contact</HeaderLink>
        </ul>
      </div>
      {Subnav && (
        <div className="flex items-end justify-end py-2 border-b">
          <Subnav />
        </div>
      )}
    </>
  )
}

Index.defaultProps = {
  Subnav: undefined,
}

export default Index
