import React from 'react'
import Router from 'next/router'
import { UserProvider } from '@auth0/nextjs-auth0'
import Layout from '../components/layout'
import { pageview } from '../lib/gtag'
import '../styles/index.css'

Router.events.on('routeChangeComplete', pageview)

function MyApp({ Component, pageProps }) {
  // to add more layouts, see method 3 in:
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const SiteLayout = Component.layout || Layout
  return (
    <UserProvider>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </UserProvider>
  )
}

export default MyApp
