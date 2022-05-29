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
},
```

now that our '/src/resolvers/mutation.js' file has been
updated with our `deleteNote` resolver, we can test 
the function our in our GP!

we can try the following, being sure to pass
the correct `id` to our GraphQL database:

```
mutation {
    deleteNote(id: "<_id of note!>")
}
```

so i have a duplicate note, so let me delete the
one with the following id:6287f432a559922a58e178b1


```
mutation {
    deleteNote(id: "6287f432a559922a58e178b1")
}
```

and it looks to be working as we got the following
output:

```
{
  "data": {
    "deleteNote": true
  }
}
```

If one passes a non-existent ID, one'll receive a response of:

```
"deleteNote": false
```

according to teach; however, this didn't work for me, it returned
true regardless! ok, well when I deleted a note that existed in the
DB, it returend true the first time, and when I tried runnign the
query again, it remained true, even though it was deleted. however
when i entered an empty string, it returned false. So for the mutation:

```
mutation {
    deleteNote(id: "")
}
```

it returned the output:

```
{
  "data": {
    "deleteNote": false
  }
}
```

With our delete functionality in palce, let's write our `updateNote`
mutation. To do this, we will use Mongoose's `findOneAndUpdate` method.
This method will take an initial parameter of a query to find the
correct note in the database, followed by a second parameter where
we'll `$set` new note content. Lastly, we'll pass a third parameter
of new: `true`, which instructs the database to return the updated
note content to us!

In '/src/resolvers/mutation.js', we add the following within the 
`module.exports` object:

```
updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
        {
            _id: id
        },
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    );
},
```

We can now visit the GP API in our browser to try out
our `updateNote` mutation. In a new tab in the playground,
write a mutation with the parameters of an `id` and 
`content`:

i did a quick query to retreive the notes that so
far exist in our database:

```
query {
  notes {
    content
    id
    author
  }
}
```

which returned the following ouput:

```
{
  "data": {
    "notes": [
      {
        "content": "This is a note in our database!",
        "id": "6280057a77cc7522a47ab48e",
        "author": "Random User"
      },
      {
        "content": "This is a new note that I will update",
        "id": "628d75728a694b2c3891e7ae",
        "author": "Random User"
      }
    ]
  }
}
```

 now we can submit our query:
```
mutation {
    updateNote(
        id: "628d75728a694b2c3891e7ae",
        content: "This is the updated note!"
    ){
        id
        content
    }
}
```

which returned the following output, which was what was expected!

```
{
  "data": {
    "updateNote": {
      "id": "628d75728a694b2c3891e7ae",
      "content": "This is the updated note!"
    }
  }
}
```

If we pass an incorrect ID, the response fails, and we will receive 
an internal server error with an `Error updating note` message.

here's some of the ouput from an error:

```
{
  "errors": [
    {
      "message": "Cast to ObjectId failed for value \"628d75728a694b2c3891e7a\" at path \"_id\" for model \"Note\"",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateNote"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "message": "Cast to ObjectId failed for value \"628d75728a694b2c3891e7a\" at path \"_id\" for model \"Note\"",
          "name": "CastError",
          "stringValue": "\"628d75728a694b2c3891e7a\"",
          "kind": "ObjectId",
          "value": "628d75728a694b2c3891e7a",
          "path": "_id",
          "stacktrace": [
            "CastError: Cast to ObjectId failed for value \"628d75728a694b2c3891e7a\" at path \"_id\" for model \"Note\"",
            "    at new CastError (\\node_modules\\mongoose\\lib\\error\\cast.js:29:11)",
            "    at ObjectId.cast (\\node_modules\\mongoose\\lib\\schema\\objectid.js:246:11)",
            "    at ObjectId.SchemaType.applySetters (\\node_modules\\mongoose\\lib\\schematype.js:969:12)",
            "    at ObjectId.SchemaType._castForQuery (\\node_modules\\mongoose\\lib\\schematype.js:1383:15)",
            "    at ObjectId.SchemaType.castForQuery (\\node_modules\\mongoose\\lib\\schematype.js:1373:15)",
            "    at ObjectId.SchemaType.castForQueryWrapper (\\node_modules\\mongoose\\lib\\schematype.js:1352:15)",
            "    at cast (\\node_modules\\mongoose\\lib\\cast.js:315:32)",
            "    at model.Query.Query.cast (\\node_modules\\mongoose\\lib\\query.js:4641:12)",
            "    at castQuery (\\node_modules\\mongoose\\lib\\query.js:4454:18)",
            "    at model.Query.Query._findAndModify (\\node_modules\\mongoose\\lib\\query.js:3417:23)",
            "    at model.Query.<anonymous> (\\node_modules\\mongoose\\lib\\query.js:3002:8)",
            "    at model.Query._wrappedThunk [as _findOneAndUpdate] (\\node_modules\\mongoose\\lib\\helpers\\query\\wrapThunk.js:16:8)",
            "    at \\node_modules\\kareem\\index.js:278:20",
            "    at _next (\\node_modules\\kareem\\index.js:102:16)",
            "    at \\node_modules\\kareem\\index.js:507:38",
            "    at processTicksAndRejections (internal/process/task_queues.js:79:11)"
          ]
        }
      }
    }
  ],
  "data": null
}
```

We are now able to create, read, update, and delete notes. With
this we have full CRUD functionality in our app!

// DATE AND TIME

When we created our database schema, we requested that Mongoose
automatically store timestamps to record when entries are created 
and updated in the database. This information will be useful 
in our application, as it will allows us to show the 
user when a note was created or last edited within our user 
interface. Let's add `createdAt` and `updatedAt` fields ot our
schema so we can return these values!

One may recall that GraphQL allows for the default types of
`String`, `Boolean`, `Int`, `Float`, and `ID`. Unfortunately,
GraphQL does not come with a built-in date scalar type.  We 
_could_ use the `String` type, but this would mean that we 
wouldn't be taking advantage of the type validation that GraphQL
offers, ensuring that our dates and times are actually dates
and times.  

Instead, we will creat a custom scalar type. A Custom type allows  
us to define a new type and validate it against every query and 
mutaiton that requests data of that type!

Let's update the GraphQL schema in '/src/schema.js' by adding
a custom scalar at the top of our GQL string literal:

```
module.exports = gql`
  scaler DateTime
  ...
`;
```

Then we update the `Note` type and assign our new
custom `DateTime` scalar to our `createdAt` and
`updatedAt` keys.

so now our '/src/schema.js` file will appear as follows:

```
const { gql } = require('apollo-server-express');

module.exports = gql`
    scaler DateTime
    type Note {
        id: ID!
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
    }
`;
```

The last step is to validate this new type. While we can write our
own validation, for our use case we'll use the `graphql-iso-date` 
package.  To do so, we'll add validation to any resolver function
that requests a value wit ha type of DateTime.

In the '/src/resolvers/index.js' file, import the package and add
a `DateTime` value ot the exported resolvers like so:

```
const Query = require('./query');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};
```
Now if we visit the GraphQL playgournd in our browser and refresh the
page, we can validate that our custom types work as intended. If we 
consult our schema, we can see that the 
`createdAt` and `updatedAt` field have a type of DateTime. 

To test this, let's write a  `newNote` mutation in the 
GraphQL PlayGround that includes our date fields:

```
mutation {
  newNote (content: "This is a new note with a custom type!") {
    content
    author
    id
    createdAt
    updatedAt
  }
}
```

when we ran this query, it returned the following:

```

  "data": {
    "newNote": {
      "content": "This is a new note with a custom type!",
      "author": "Random User",
      "id": "62915f9a65b436024c8daaa2",
      "createdAt": "2022-05-27T23:32:42.264Z",
      "updatedAt": "2022-05-27T23:32:42.264Z"
    }
  }
}
```

We see that his returned `createdAt` and `updatedAt` values
as ISO-formatted date-time values. If we then run an 
`updateNote` mutation against this same note, we'll see
a differnt 'updatedAt' value:

```
mutation {
    updateNote(
        id: "62915f9a65b436024c8daaa2",
        content: "This is the updated note to test updatedAt!"
    ){
        content
        author
        id
        createdAt
        updatedAt
    }
}
```

which returns the following output:

```
{
  "data": {
    "updateNote": {
      "content": "This is the updated note to test updatedAt!",
      "author": "Random User",
      "id": "62915f9a65b436024c8daaa2",
      "createdAt": "2022-05-27T23:32:42.264Z",
      "updatedAt": "2022-05-27T23:38:35.523Z"
    }
  }
}
```

For more information on defining and validating custom scalar
types, teach recommends Apollo Server's "Custom scalars and enums"
documentation:
https://gql.readthedocs.io/en/latest/usage/custom_scalars_and_enums.html

// CONCLUSION

In this chapter, we added CRUD (create, read, update, delete) 
functionality to our API. CRUD is a common design patterns and 
is used by many applications

Wewill add functionality to our API to create and authenticate
user accounts.






*/
