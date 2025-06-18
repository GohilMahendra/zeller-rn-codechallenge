import {
  ApolloClient,
  HttpLink,
  ApolloProvider,
  InMemoryCache,
  DefaultOptions,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://10.0.2.2:9002/graphql',
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
