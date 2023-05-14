import React from 'react';
import Screens from './screens';
// import the Apollo libraries
import { Apolloclient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import environment from configuration
import getEnvVars from '../config';
const { API_URI } = getEnvVars();

// configure our API URI & cache
const uri = API_URI;
const cache = InMemoryCache();

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