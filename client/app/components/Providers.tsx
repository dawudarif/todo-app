'use client';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tasks: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetch: (uri, options) => {
      console.log(uri, options);
      return fetch(uri, options);
    },
  }),
});

// client
//   .query({
//     query: gql`
//       query MyQuery {
//         tasks {
//           id
//           text
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </ApolloProvider>
  );
}
