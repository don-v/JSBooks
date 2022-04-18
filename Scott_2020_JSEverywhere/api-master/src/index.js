// index.js
// This is the main entry point of our application

const express = require('express');


// Ch 4: apollo-server-express
const { ApolloServer, gql} = require('apollo-server-express');
const port = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
`;


// Provide resolver function for our schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello World!!!'
    }
};

const app = express()

app.get('/', (req,res) => res.send('Hello World!!!! You the man!'));

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set teh path to '/api'
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
});
