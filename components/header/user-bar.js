import React from 'react'
import Loading from './loading'
import SignedIn from './signed-in'
import SignedOut from './signed-out'

const UserBar = ({ user, loading }) => (
  <div className="flex items-end justify-between py-2 border-b">
    <div />
    {loading && <Loading />}
    {!loading && user && <SignedIn />}
    {!loading && !user && <SignedOut />}
  </div>
)

export default UserBar
