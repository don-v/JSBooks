// index.js
// This is the main entry point of our application

// Ch 5: connect mongodb to app!
const fs = require('fs');
// https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readfile_path_options_callback



// new Promise((resolve,reject)=>{
//   fs.readFile('.\\..\\to_ignore.txt','utf-8',(err, data)=>{
//       if (err) {
//           reject(err); // in the case of error, control flow goes to the catch block with the error occured.
//       }
//       else{
//           resolve(data);  // in the case of success, control flow goes to the then block with the content of the file.
//       }
//   });
// })
// .then((data)=>{
//   mongoCredentials = data; // use your content of the file here (in this then).
//   console.log('typeof mongoCredentials:', typeof mongoCredentials);    
// })
// .catch((err)=>{
//   throw err; //  handle error here.
// })


// const getMongoCredentials = () => {
//   return new Promise((resolve,reject)=>{
//     fs.readFile('.\\..\\to_ignore.txt','utf-8',(err, data)=>{
//         if (err) {
//             reject(err); // in the case of error, control flow goes to the catch block with the error occured.
//         }
//         else{
//             resolve(data);  // in the case of success, control flow goes to the then block with the content of the file.
//         }
//     });
//   })
// }

// (async () => {
//   const mongoCredientials = await getMongoCredentials();
//   console.log('typeof mongoCredientials:', typeof mongoCredientials);
// })();


const { user, pw } = JSON.parse(fs.readFileSync('.\\..\\to_ignore.txt'));
console.log({ user, pw })



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
