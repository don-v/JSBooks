/* 

// OUR FIRST GRAPHQL API

People have interests and passions, and sometimes these relationships
All together, we each have a connected graph of the people in our
lives!

These types of connected data are exactly the challenge that GraphQL
initially set out to solve in API development.  By writing a GraphQL
API we are able to efficiently connect data, which reduces complexity
and number of requests while allowing us to serve a client precisely 
the data they need.

Does that all sound like a bit of overkill for a notes application?
Perhaps it does, but as you'll see, the tools and techniques provided 
by the GraphQL JS ecosystem both enable and simplify all types of
API development.

In this chapter we'll build a GraphQL API, using the 
`apoll-server-express` package. To do so, we'll explore fundmental
GraphQL topics, write a GraphQL schema, develop code to resolve our 
schema functions, and access our API using the GraphQL Playground
user interface.

// TURNING OUR SERVER INTO AN API (SORT OF)

Begin by turning our API development by turning our Express server
into a GraphQL server using the `apollo-server-express` package.
Apollo Server (https://oreil.ly/1fNt3) is an open source GraphQL
server library that works with a large number of Node.js server 
frameworks, including Express, Connect, Hapi, and Koa. 

It enables us to server data as a GraphQL API from a Node.js
application and also proivdes helpful tooling such as the
GraphQL Playground, a visual helper for working with our API
in development.

To write our API we'll be modifying the web application code
we wrote in the previous chapter.  Let's start by including the 
`apoll-server-express` package.  

We open our '/src/index.js' file and add the following line to
bring in the 'apollo-express-express' functionality:

const { ApolloServer, gql } = require('apollo-server-express');

Now that we've imported `apollo-server-express`, we set up basic 
a basic GraphQL application. GraphQL applications consist of 2
primary components: a schema of type definitions and resolvers, 
which resolve the queries and mutations performed against the
data.

We start by implementing a 'Hello World' API response and will 
further explore these GraphQL topics throuhgout the development
of our API.

To begin, let's construct a basic schema, which we will store in
a variable called `typeDefs`. This schema will describe a 
single `Query` named `hello` that will return a string:

```
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
`;
```

Now that we'ver set up our schema, we can add a resolver
that will return a value to the user.  This will be a 
simple function that retusn teh string "Hello world!":

```
// Provide resolver function for our schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
};
```


*/

