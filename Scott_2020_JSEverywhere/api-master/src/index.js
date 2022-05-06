// index.js
// This is the main entry point of our application

// Ch 5: connect mongodb to app!
const fs = require('fs');
// https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readfile_path_options_callback

fs.readFile('.\\..\\to_ignore.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  const { user, pw } = JSON.parse(data);
  console.log(`user: ${user}, pw: ${pw}`);
});




const express = require('express');


// Ch 4: apollo-server-express
const { ApolloServer, gql} = require('apollo-server-express');

// Run our server on a port specified in our '.env' file or port 4000
const port = process.env.PORT || 4000;

let notes  = [
    { id: '1', content: 'This is an ote', author: 'Adam Scot' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Query {
        hello: String
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(content: String!): Note!
    }
`;

// Provide resolver function for our schema fields
const resolvers = {
    Query: {
      hello: () => 'Hello World!',
      notes: () => notes,
      note: (parent, args) => {
        return notes.find(note => note.id === args.id);
      }
    },
    Mutation: {
        newNote: (parent,args) => {
          let noteValue = {
            id: String(notes.length + 1),
            content: args.content,
            author: 'Random User',
          };
          notes.push(noteValue);
          return noteValue
        }
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
