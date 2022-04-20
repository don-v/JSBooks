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

Lastly, we integrate Apollo Server to servr our GraphQL API. To do so,
we add some Apollo Server-specific settings and middle ware and update 
our `app.listen` call:

```
// Apollo Server setup
const server = new ApollowServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set teh path to '/api'
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, => {
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
});

```

Now when we access http://localhost:4000/api, we will be greeted with the GraphQL
Playground, which is a web application that comes bundled with Apollo Server.
Teach says the GraphQL Playground is one of the great benefits of working with
GraphQL!

From here, we can run GraphQL queries and see the results.  You can also click 
the Schema tab to access automatically created documentation for the API.

GraphQL Playground has a 'dark' colored default syntax theme, this
can be adjusted in the GraphQL Playground's settings by clicking the
gear icon in the GUI.

We can now write our query against our GraphQL API.  To do so, type the following
into the GraphQL Playground:

```
query {
    hello
}
```

When we click the 'Play' button in the GraphQL Playground (GP) GUI, we 
get the following output:

```
{
  "data": {
    "hello": "Hello World"
  }
}
```

That's it! We now have a working GraphQL API that we've accessed via
GP!  The API took the query of 'hello' and returns the staring 'Hello

// GRAPHQL BASICS

2 priamry building blocks of GraphQL API:
1. Schemas
2. Resolvers

**************************** START: SCHEMAS ****************************
// 1. SCHEMAS

A schema is a written representation of our data and interactions. By
requiring a schema, GraphQL enforaces a strict plan for our API. This is 
because your API can only return data and perform interactions that are
defined within the schema.

The fundamental component of GraphQL scheams are object types.  In the
previous example, we created a GraphQL object type of `Query` with a 
field `hello`, which returned a scalar type of `String`.  GraphQL
contains 5 built-in scalar types:

1. `String`: A string with UTF-8 character encoding
2. `Boolean`: True or False
3. `Int`: a 32-bit integer
4. `Float`: A floating-point value
5. `ID`: a unique identifier

With these basic components, one can construct a schema for our API! We 
do this by first defining a type.  If we were developoing an API for a 
pizza menu, we might define a GraphQL schema type of `Pizza` with the
following considerations:

Each pizza has a unique ID, a size (['small', 'medium', 'large']),
nubmer of slices, and optional toppings.  So our Pizza schema might
look like so:

```
type Pizza {
    id: ID
    size: String
    slices: Int
    toppings: [String]
}
```



**************************** END: SCHEMAS ****************************

**************************** START: SCHEMAS ****************************
// 2. RESOLVERS


**************************** END: SCHEAMS ****************************
*/

