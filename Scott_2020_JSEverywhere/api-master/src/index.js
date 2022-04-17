// index.js
// This is the main entry point of our application

const express = require('express');
const app = express()

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
        hello: () => 'Hello World'
    }
};



app.get('/', (req,res) => res.send('Hello World!!!! You the man!'));

app.listen(port, () => {
    console.log(`Server listening at localhost:${port}`)
});