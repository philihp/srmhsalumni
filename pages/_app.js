import React from 'react'
import Router from 'next/router'
import Layout from '../components/layout'
import { pageview } from '../lib/gtag'
import '../styles/index.css'

Router.events.on('routeChangeComplete', pageview)

function MyApp({ Component, pageProps }) {
  // to add more layouts, see:
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
