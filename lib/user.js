import { useState, useEffect } from 'react'

export const fetchUser = async () => {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user
  }

  const res = await fetch('/api/me')

  if (!res.ok) {
    delete window.__user
    return undefined
  }

  const json = await res.json()
  if (typeof window !== 'undefined') {
    window.__user = json
  }
  return json
}

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  )
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    return window.__user || undefined
  })

  useEffect(
    () => {
      if (!loading && user) return () => {}
      setLoading(true)
      let isMounted = true
      fetchUser().then((uuser) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !uuser) {
            window.location.href = '/api/login'
            return
          }
          setUser(uuser)
          setLoading(false)
        }
      })
      return () => {
        isMounted = false
      }
    },
    // this 2nd param as [] seems weird, but it is intentional. you may be thinking of trying
    // other things, but you should not... because the different things you may want to try are:
    //
    // undefined (omit): hella fetches because func is called every render()
    // [ user, ...]: infinite fetches because fetch always changes user
    // []: only 1 fetch, because func is intentionally only called once
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { user, loading }
}
