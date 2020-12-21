import apolloClient from './apolloClient'

const client = apolloClient(undefined, {
  'content-type': 'application/json',
  'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
})

export default client
