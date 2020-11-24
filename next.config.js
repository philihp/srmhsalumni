const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  webpack: (config, { webpack }) => ({
    ...config,
    plugins: [...config.plugins, new webpack.IgnorePlugin(/__tests__\/.*/)],
  }),
  target: 'serverless',
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: 'openid profile',
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    HASURA_GRAPHQL_URL: process.env.HASURA_GRAPHQL_URL,
    SESSION_COOKIE_LIFETIME: 7200, // 2 hours
    APP_HOST: process.env.DOMAIN,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
  },
  redirects: async () => [
    // {
    //   source: '/about',
    //   destination: '/about/board',
    //   permanent: false,
    // },
    // {
    //   source: '/membership',
    //   destination: '/membership/enrollment',
    //   permanent: false,
    // },
    // {
    //   source: '/events',
    //   destination: '/events/upcoming',
    //   permanent: false,
    // },
    // {
    //   source: '/engagement',
    //   destination: '/engagement/class-representatives',
    //   permanent: false,
    // },
  ],
}
