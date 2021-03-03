import React from 'react'
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0'
import Header from '../header'
import UserBar from '../header/user-bar'

const Layout = ({ children }) => {
  const { user, error, loading } = useUser()
  return (
    <main className="relative font-serif antialiased text-gray-900 max-w-screen-xl mx-auto">
      <Head>
        <title>SRMHS Alumni</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <UserBar user={user} loading={loading} />
      {error && <div>{error.message}</div>}
      <div className="px-4 lg:px-0 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
        {children}
      </div>
    </main>
  )
}

export default Layout
