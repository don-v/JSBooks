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

Next, we have to import the resolver code into our 
'/src/index.js' file:

```
cosnt resolvers = require('./resolvers');
```

The final step in refactoring our application is to connect them to
our database models.  As one may have noticed, our resolver modules
reference these models, but have no way of accessing them.  To fix 
this problem, we'll use a concept that 'Apollo Server' calls 
_context_, which allows us to pass specific information along from our
server code to an individual resolver with each request.  For now,
this may feel excessive, but it will be useful for incorporating
user authentication into our application.  To do this, we'll update
our 'Apollo Server' setup code inside of our '/src/index.js' file
by adding a context function that will return our database models:

```
// Apollo server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        // Add the db models to the context
        return { models };
    }
});
```

Now we'll updated each of our resolvers to make use of this context
by passing { models } to the third parameter in each function:


so in our '/src/resolvers/query.js' file we add the following:
```
module.exports = {
    notes: async (parent, args, { models }) => {
        return await models.Note.find()
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id);
    }
}
```

Now we need to move the following code to our 
'/src/resolvers/mutations.js' file:

```
module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Random User'
        });
    }
}
```

now our code should be refactored. ok, so tested our database,
added a new note, and got tehm back returned! looks like
our database is stil working!

now just have to confirm the contents of our '/src/index.js' file:

// WRITING OUR GRAPHQL CRUD SCHEMA

Now we have to implement our CRUD operations. So far, we
are able to create and read notes, which leaves us with 
implementing our Update and Deleate functionality. To accomplish
this, we will want to update our schema.

Since update and delete operations will make changes to our data,
they will be mutations.  Our update note will require an `ID`
argument to locate the note as well as the the content we want
to use to update the note that we locate.

For the delete operation, our API will return a Boolean value of
`true` to inform us that the note deletion was succesful.

Now that we have conceptually defined what our our update and
delete functions will need and do, let's update our schema file
at '/src/schema.js' accordingly:

```
type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
}
```

with our Mutation schema updated in our '/src/schema.js' file, 
our schema is now ready to perform CRUD operations:

// CRUD RESOLVERS

With our schema in place, we can now update our resolvers
to either remove or update a note. Let's begin with our 
`deleteNote` mutation.  To delete a note, we will use
Mongoose's `fineOneAndRemove` method and pass it the `id`
of the itme that we want to delete.  If our item is found 
and deletted, we'll return `true` to the client, but if our
item failt to delete, we'll return `false`:

in our '/src/resolvers/mutation.js' file, we shall add the
following within the module.exporst object:

```
deleteNote: async (parent, { id }, { models }) => {
    try {
        await models.Note.findOneAndRemove({ _id: id });
        return true;
    } catch (err) {
        return false;
    }
}
```

HERE p. 49!

*/
