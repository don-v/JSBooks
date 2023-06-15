import React from 'react';
import Screens from './screens';
// import the Apollo libraries
import { 
  Apolloclient, 
  ApolloProvider, 
  createHttpLink,
  InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
// import `SecureStore` for retreiving the token value
import * as SecureStore from 'expo-secure-store';
// import environment from configuration
import getEnvVars from '../config';
const { API_URI } = getEnvVars();

// configure our API URI & cache
const uri = API_URI;
const cache = InMemoryCache();
const httpLink = createHttpLink({ uri });

// HERE -- p.289!

// configure Apollo Client
const client = new Apolloclient({
  uri,
  cache
});

const Main = () => {
  // wrap our app in the ApolloProvider higher-order component
  return (
    <ApolloProvider client={client}>
      <Screens />
    </ApolloProvider>
  );
};

export default Main;