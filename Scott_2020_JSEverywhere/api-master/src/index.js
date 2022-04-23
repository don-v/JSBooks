// index.js
// This is the main entry point of our application

const express = require('express');


// Ch 4: apollo-server-express
const { ApolloServer, gql} = require('apollo-server-express');
const port = process.env.PORT || 4000;

let notes  = [
    { id: '1', content: 'This is an ote', author: 'Adam Scot' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String!
        notes: [Note!]!
    }

    type Note {
        id: ID!
        content: String!
        author: String!
    }
`;


// Provide resolver function for our schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes
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
