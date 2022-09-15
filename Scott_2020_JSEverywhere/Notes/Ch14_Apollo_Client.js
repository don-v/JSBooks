/* 
// CHAPTER 14: WORKING IWTH APOLLO CLIENT

The modem-based connections for internet access from previous
decades, though quite slow and unreliable, still capture the 
essence of modern-day service communications:

1. services request a connection
2. make the connection
3. send a request
4. recieve the response

Our client application will work in a similar manner. We will
first make a connection to our server API application, and if
successful, make requests to that server.

In this chapter, we will use Apollo Client to connect to our
API. Once connected, we'll write a GraphQL query, which will be
used to display data on a page. We'll also introduce pagination, 
both within the API query and in our interface components!

> WISDOM: Running the API locally -- The devlopment of our web
client application will require access to a local instance of our
API. If you've been following along with the book, one may already
have the Notedly API and its database up and running on machine!

If not, teach has added instructions to Appendix A on how to get
a copy of the API up and running along with some sample data.
If one already has the API running, but would like some additional
data to work with, run execute `npm run seed` from the root of
the API project directory!

# Finished 09/11/2022 -- copied seed to src folder from final; 
adjust package.json; update DB_HOST uri, set content without 
accessing url for lorem ipsum 

# HERE -- updated bcrypt - bcryptjs; test npm run seed next!

checked the seed, it worked!

// SETTING UP APOLLO CLIENT

Much like Apollo Server, Apollo Client offers a number of helpful 
features to simplify working with GraphQL within JS UI applications.
Apollo Client provides libraries for connecting a web client to an
an API, local caching, GraphQL syntax, local state management, and 
more. We'll also be using Apollo Client with a 'React' application,
but Apollo also offers libraries for Vue, Angular, Meteor, Ember,
and Web Components

First, we'll want to ensure that our '.env' file contains a reference
to our local API URI. This will allow us to use our local API instance
in development, while pointing to our product API when we release our
applicaiton to a public web server. in our '.env' file, we should have 
`API_URI` variable with our local API server's address. 

```
API_URI=http://localhost:4000/api
```

Our code bundler, Parcel, is configured to automatically work with
'.env' files. Any time we want to reference and '.env' variable
in our code, we can use `process.env.VARIABLE_NAME`. This will allow
us to use unique values in lcoal development, production, and any other
environment that we may need (such as staging or continuous 
integration).

With the address stored in an environment variable, we are ready to
connect our web client to our API server. Working in our '/src/App.js'
file, first we need to import the Apollo packages that we'll be using:

```
// import Apollo Client libraries
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
```

With these imported, we can configure a new Apllo Client instance, passing
it the API URI, initiating the cache, and enabling the use of the local 
Apollo developer tools:

```
// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});
```

Finally, we can connect our 'React' appliction to our
Apollo Client by wrapping it in an `ApolloProvider`. 
We'll replace our empty 'div' tags with `<ApolloProvider>`
and include our client as a connection:

```
const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </Apolloprovider>
    );
};
```

afte we update our '/src/App.js' file, it should read as 
follows:

```
// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client libraries
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'; 

// import global styles
import GlobalStyle from '/components/GlobalStyle';
// import routes
import Pages from '/pages';

// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true  
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle/>
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

With our client connected to our API server, we can now integrate
GraphQL queries and mutations into our application.

// QUERYING AN API

When we query an API, we are requesting data. In a UI client, we
want to be able to query that data and display it to the user. Apollo
enables us to compose queries to fetch data. We can then update React
components to display the data to the end user. 

We can explore the use of queries by writing a `noteFeed` query, which
will return a feed of the latest notes to the user and display it on
the application's home page.

When teach is first writing a query, he finds the following process
useful:

1. 

# HERE -- p. 138!

*/