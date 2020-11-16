import React from 'react'
import Image from 'next/image'
import HeaderLink from './header-link'
import { useFetchUser } from '../../lib/user'
import Loading from './loading'
import SignedIn from './signed-in'
import SignedOut from './signed-out'

const Index = () => {
  const { user, loading } = useFetchUser()
  return (
    <div className="Index flex items-center justify-between py-2 border-b">
      <div className="Logo px-4">
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

        {loading && <Loading />}
        {!loading && user && <SignedIn />}
        {!loading && !user && <SignedOut />}
      </ul>
      <style jsx>
        {`
          .Logo {
            font-size: 30pt;
          }
          .Index {
          }
        `}
      </style>
    </div>
  )
}

export default Index
