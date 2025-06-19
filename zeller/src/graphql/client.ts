import {
  ApolloClient,
  HttpLink,
  ApolloProvider,
  InMemoryCache,
  DefaultOptions,
} from '@apollo/client';
import { Platform } from 'react-native';

const LINK_URI =
  Platform.OS == 'android'
    ? 'http://10.0.2.2:9002/graphql'
    : 'http://localhost:9002/graphql';

const httpLink = new HttpLink({
  uri: LINK_URI,
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
