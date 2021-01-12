const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants')

const dotenv = require('dotenv')

dotenv.config()

module.exports = (phase) => {
  const isServer =
    phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_SERVER

  const HASURA_GRAPHQL_ADMIN_SECRET = isServer
    ? null
    : process.env.HASURA_GRAPHQL_ADMIN_SECRET

  return {
    webpack: (config, { webpack }) => ({
      ...config,
      plugins: [...config.plugins, new webpack.IgnorePlugin(/__tests__\/.*/)],
    }),
    target: 'serverless',
    env: {
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_SCOPE: 'openid profile',
      REDIRECT_URI: process.env.REDIRECT_URI,
      POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
      SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
      HASURA_GRAPHQL_PATH: process.env.HASURA_GRAPHQL_PATH,
      HASURA_GRAPHQL_ADMIN_SECRET,
      SESSION_COOKIE_LIFETIME: 60 * 60 * 8 /* 8 hours */,
      APP_HOST: process.env.DOMAIN,
      STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
    },
    redirects: async () => [
      {
        source: '/payment',
        destination: '/membership',
        permanent: false,
      },
    ],
  }
}
