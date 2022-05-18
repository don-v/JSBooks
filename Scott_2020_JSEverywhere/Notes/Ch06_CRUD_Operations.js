/*
// CRUD OPERATIONS

CRUD refers to apps that create, read, update, and delete data.

CRUD plays a role in many modern applications:

* to-do lists
* spreadsheets
* content management systems
* text editors
* socail medai websites

Generally, with respect to data, a user may
create, access/read, update, or delete it.

The 'Notedly' application that teach is demonstrating
how to build follows the 'CRUD' pattern. Users will
be able to create, read, update, and delete their 
own notes!

In this chapter, we will implement the essential
CRUD functionality of our API by connecting our 
resolvers and database!

// SEPARATING OUR GRAPHQL SCHEMA AND RESOLVERS

currently, our '/src/index.js' file is home to our 
Express/Apollo Server code as well as to our API's 
schema and resolver! As one can imagein, this could
get unwieldly as our codebase grows.  Before this
happens, let's take some time to do a minor refarctor
that separates our schema, resolvers, and server code.

To begin, let's movero our GraphQL schema to its own
file! First, we'll make a new file named in our 'src'
directory so that its path will be '/src/schema.js'

To move our schema content, which is bound to our
`typeDefs` variable, we will need to import the `gql`
schema languge that comes with the `apollo-server-express`
package and export our schema as a module using Node's
`module.exports` attribute.  While we're at it, we can
also remove the `hello` query, which we won't need in our
final application. 

```
const { gql } = require('apollo-server-express');

module.exports = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(content: String!): Note!
    }
`;
```

now with our '/src/schema.js' file populated with our
schema source, we can upate our '/src/index.js' file
by updating the destructuring of object returned from
our call to `require('apollo-server-express)` and then
setting our typeDefs variable equal to the a `require` call
to the code contained in the `module.exports` from our
'/src/chema.js' file. The updated code will look as follows: 
(note, 'hello' from resolvers was also removed!)

```
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema.js');
```
Now that we have isolated our GraphQL schema to its own file,
let's do something similar for our GraphQL resolver code! Our
resolver code will encompass the vast majority of our API's 
logic.  So we will first create a 'src' dir sub-folder to house 
the code named 'resolvers'

Within our '/src/resolvers' dir, we'll begin with three files: 
'index.js', 'query.js', and 'mutation.js'

Similar to the pattern followed in our '/src/models' folder,
which housed our 'mongoose' models, we use our 
'/src/resolvers/index.js' file to import our resolver code and
export it to a single module.

so the contents of our '/src/resolvers/index.js' file will be:

```
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
    Query,
    Mutation
};
```

Now we can set up our 'src/resovers/query.js' file as follows:

```
module.exports = {
    notes: async () => {
        return await models.Note.find()
    },
    note: async (parent, args) => {
        return await models.Note.findById(args.id);
    }
}
```

Next, we have to import the resolver code:


*/
