import { ApolloClient } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import apolloCache from './apolloCache'
import '../auth0'

let accessToken
const requestAccessToken = async () => {
  if (accessToken !== undefined) return
  const res = await fetch(`${process.env.APP_HOST}/api/session`)
  if (res.ok) {
    const json = await res.json()
    accessToken = json.accessToken
  } else {
    accessToken = 'public'
  }
}

const HASURA_HTTP = `${process.env.HASURA_GRAPHQL_URL}v1/graphql`
const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: HASURA_HTTP,
    credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch,
  })
  return httpLink
}

const HASURA_WSS = HASURA_HTTP.replace(/^.*:\/\//, 'wss://')
const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(HASURA_WSS, {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken() // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      },
    })
  )
}

const createApolloClient = (initialState, headers) => {
  const ssrMode = typeof window === 'undefined'
  const link = ssrMode ? createHttpLink(headers) : createWSLink()
  return new ApolloClient({
    ssrMode,
    link,
    cache: apolloCache.restore(initialState),
  })
}

export default createApolloClient
