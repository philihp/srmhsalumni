import React from 'react'
import { useFetchUser } from '../../lib/user'
import Loading from './loading'
import SignedIn from './signed-in'
import SignedOut from './signed-out'

const Index = () => {
  const { user, loading } = useFetchUser()
  return (
    <div className="Index flex items-center justify-between py-2 border-b">
      <div className="Logo px-4">Southeast Raleigh Alumni</div>
      {loading && <Loading />}
      {!loading && user && <SignedIn />}
      {!loading && !user && <SignedOut />}
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
