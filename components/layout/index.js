import React from 'react'
import Head from 'next/head'
import Header from '../header'

const Layout = ({ children }) => (
  <main className="relative font-serif antialiased text-gray-900 max-w-screen-xl mx-auto">
    <Head>
      <title>SRMHS Alumni</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />
    <div className="px-4 lg:px-0 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
      {children}
    </div>
  </main>
)

export default Layout
