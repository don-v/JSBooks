// index.js
// This is the main entry point of our application
// Ch 4: apollo-server-express
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
// bring mongoose models into our application so Apollo Server
// can access them, note that we are pointing to the directory,
// which appears to automatically look at our 'index.js' file:
const models = require('./models');
// Construct a schema, using GraphQL schema language
const typeDefs = require('./schema');
// Provide resolver function for our schema fields
const resolvers = require('./resolvers');

// Ch07: User Accounts and Auth
const jwt = require('jsonwebtoken');

// get the user infor from a JWT:
const getUser = token => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};



// Run our server on a port specified in our '.env' file or port 4000
const port = process.env.PORT || 4000;

// Store the DB_HOST value as a variable
// Ch 5: connect mongodb to app!
const fs = require('fs');
const { user, pw } = JSON.parse(fs.readFileSync('.\\..\\to_ignore.txt'));
const mongo_url = `mongodb+srv://${user}:${pw}@notes-graphql.6z3u3.mongodb.net/notedly?retryWrites=true&w=majority`;
const DB_HOST = mongo_url;

const app = express()

app.get('/', (req, res) => res.send('Hello World!!!! You the man!'));

// Connect to the database
db.connect(DB_HOST);

db.close();


// Apollo server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // for now, let's log the user to the console:
    console.log(user);
    // add the db models and the user to the context
    return { models, user };
  }
});

// Apply the Apollo GraphQL middleware and set teh path to '/api'
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
});
