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

In this schema, some field values are required  (such as ID, size, and slices), 
while others may be optional (such as toppings).  We can express that a field 
must contain a value by using an exclamation mark.  it appears that `[]` around
the scalar value implies that it is an optional field! Let's update our schema to
represent the rquired values:

```
type Pizza {
    id: ID!
    size: String!
    slices: Int!
    toppings: [String]
}
```

In this book we just creating basic schema, which will enable one to execute
the vast majority of operations found in a common API.  If one would like to explore
all of the GraphQL schema options, teach recs exploring the GraphQL Schema docs:
https://oreil.ly/DPT8C


**************************** END: SCHEMAS ****************************

**************************** START: RESOLVERS ****************************
// 2. RESOLVERS

The second piece of our GraphQL API will be resolvers.  Resolvers perform
exaclty the action their name implies: they resovle the data that the API
user has requested!

We will write these resolvers by first defining them in our schema and then
implementing the logic within our JS code! Our API will contain two types 
of resolvers: queries and mutations!

// Queries

A query requests specific data from an API, in its desired format. In our
hypothetical pizza API we may write a query that will return a full ist of 
pizzas on the menu and another that will return detailed information about
a single pizza.  The query will then return an object, containing the data
that the API user has requested.  A query never modifies the data, only 
accesses it!


// Mutations

We use mutations when we ant to modify the data in our API.  In our pizza
example, we may write a mutation that changes the toppings for a given pizza
and antoher that allows us to adjust the number of slices.  Similar to a query,
a mutation is also expected to return a result in the form of an object, 
typically the end result of the performed action!

**************************** END: RESOLVERS ****************************

// ADAPTING OUR API

Now we will adapt our initial API code for our notes application. To begin, 
we'll write some code to read and create notes

The first thing we'll need is data for our API to work with! Le's create an
array of "note" objects, which we'll use as the basic data served by our
API.  As our project evolves, we'll replace this in-memory data representation
with a database.  For now, we will store our data in a variable named 
`notes`.  Each note in the array will be an object with 3 properties:

{ 'id', 'content', 'author' }

```
let notes  = [
    { id: '1', content: 'This is an ote', author: 'Adam Scot' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];
```

Now, that we have some data, we'll adapt our GraphQL API to work with it.
Let's begin by focusing on our schema. Our schema is GraphQL's representation
of our data and how it will be interacted with.  We know that we will have 
notes, which will be queried and mutated.  These notes will, for now, contain
and ID, content, and author attributes.  Let's create a corresponding note
type within our typeDefs GraphQL schema. This will represent the properteis of a 
note within our API:

recall that the scalars are id, int, float, string, and, bool, and that
an exclamation point `!` after the scalar means it is a required 
field, and brackets around the scalar mean it is an optional field!

```
type Note {
    id: ID!
    content: String!
    author: String!
}
```

from:
https://graphql.org/learn/schema/

String! means that the field is non-nullable, meaning that the GraphQL 
service promises to always give you a value when you query this field. 
In the type language, we'll represent those with an exclamation mark.

[Episode!]! represents an array of Episode objects. Since it is also 
non-nullable, you can always expect an array (with zero or more items) 
when you query the appearsIn field. And since Episode! is also 
non-nullable, you can always expect every item of the array to be an 
Episode object.


Now, let's add a query that will allow us to retrieve the list of all
notes. Let's update the `Query` type to indluce a `notes` query, which
will return the array of note objects:

```
type Query {
    hello: String!
    notes: [Note!]!
}
```

Now, we can update our resolver code to perform the work of 
returning teh array of data.  Let's update our `Query` code 
to include the following `notes` resolver, which returns the 
raw data object:

```
Query: {
    hello: () => 'Hello world!',
    notes: () => notes
}
```

If we now go to the GP, we can test the notes query.  To do so,
type the following query:

query {
    notes {
        id
        content
        author
    }
}


*/

