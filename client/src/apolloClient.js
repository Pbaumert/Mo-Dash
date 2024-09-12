import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { loadStripe } from '@stripe/stripe-js';

const httpLink = createHttpLink({
  uri: '/graphql', // backend GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;



// Replace 'pk_test_51Jxxx' with your actual publishable key
const stripePromise = loadStripe('pk_test_51PyFZ02MJEsHt3b6wcTS8ZNMFVtsMsE6hXok2o0EatGycovjUsPumZU8VBjoFalaqB0rwH5tCpgS6TcciXLZOPC300iuthuRBG');

export default stripePromise;
