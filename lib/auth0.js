import { initAuth0 } from '@auth0/nextjs-auth0'
import config from './auth0-config'

const origin = process.env.DOMAIN

export default initAuth0({
  audience: config.AUTH0_AUDIENCE,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  scope: config.AUTH0_SCOPE,
  domain: config.AUTH0_DOMAIN,
  redirectUri: config.REDIRECT_URI || `${origin}/api/callback`,
  postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI || origin,
  session: {
    cookieSecret: config.SESSION_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8 /* 8 hours */,
    storeAccessToken: true,
    storeRefreshToken: true,
    storeIdToken: true,
  },
})
