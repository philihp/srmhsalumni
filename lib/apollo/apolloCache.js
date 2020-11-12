import { InMemoryCache } from '@apollo/client'

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        category: (existingData, { args, toReference }) => {
          return (
            existingData || toReference({ __typename: 'Donor', id: args?.id })
          )
        },
      },
    },
    Donor: {
      fields: {
        cards: {
          keyArgs: [],
          merge(_existing, incoming /* , { args } */) {
            return incoming // this example is just returning the incoming
          },
        },
      },
    },
  },
})

export default apolloCache
