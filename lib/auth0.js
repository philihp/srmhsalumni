import { initAuth0 } from '@auth0/nextjs-auth0'
import absoluteUrl from 'next-absolute-url'
import config from './auth0-config'

export default (request) => {
  const { origin } = absoluteUrl(request)
  return initAuth0({
    audience: config.AUTH0_AUDIENCE,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    scope: config.AUTH0_SCOPE,
    domain: config.AUTH0_DOMAIN,
    redirectUri: config.REDIRECT_URI || `${origin}/api/callback`,
    postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI || origin,
    session: {
      cookieSecret: config.SESSION_COOKIE_SECRET,
      cookieLifetime: 60 * 60 * 24 * 30 /* 30 days */,
      storeAccessToken: true,
      storeRefreshToken: true,
      storeIdToken: true,
    },
  })
}
