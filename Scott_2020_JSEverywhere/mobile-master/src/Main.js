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

// return the headers to teh context
const authLink = setContext(async (_, { headers}) => {
return {
      headers: {
      ...headers,
      authorization: (await SecureStore.getItemSync('token')) || ''
    }
  };
});

// configure Apollo Client
const client = new Apolloclient({
  link: authLink.concat(httpLink),
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