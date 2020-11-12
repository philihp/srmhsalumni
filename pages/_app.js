import React from 'react'
import Router from 'next/router'
import { pageview } from '../lib/gtag'
import '../styles/globals.css'

Router.events.on('routeChangeComplete', pageview)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
