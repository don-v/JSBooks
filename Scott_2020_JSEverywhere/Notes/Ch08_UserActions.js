/* 
// USER ACTIONS

So for, our API is essentially, a big, useless club. We have a 
way to create data and a way for user to sign in, but nothing to 
all allows a user to own that data. In this chapter, we will
address this by adding user interactions!

We'll write the code that will enable a user to won the notes 
they create, limit who can delete or modify a note, and enable
users to 'favorite' a note that they like. Additionally, we'll
enable API users to make nested queries, allowing our UIs to
write simple queries that relate users to notes!

// BEFORE WE GET STARTED

In this chapter, we'll be making some pretty significant changes
to our 'notes' files, Since we have a small amount of data in our
database, one may find it easier to remove the existing noes from
our local database. This isn't necessary, but can reduce confusion
as one works through the chapter.

To do this, we return to the 'MongoDB' shell, ensure that
we're referencing the 'notedly' database (the name of the 
database in our .env file), and use MongoDB's `remove` 
method. From our termainl, we type the following:

```
mongo
use notedly
db.ntoes.remov({})
```

// Attach a User to New Notes

In the previous chapter we updated our 'src/index.js' file
so that whe na user makes a request, we check for a JWT. If
the token exists, we decode it and add the current user to our
GraphQL context. This allows us to send teh user's information
to each resover function that we call. We'll update our existing
GraphQL mutations to verify the user's information.

To do this we'll utilize the `AuthenticationError` and 
`ForbiddenError` classes provided from 'Apollo Server'! These
classes will allow us to throw appropriate errors, and thus help
us debug our application and send appropriate responses to
the client!

Before we get tarted, we'll need to import the 'mongoose' package
into our '/src/resolvers/mutation.js' file:

```
const mongoose = require('mongoose');
```

Now in our `newNote` mutation, we'll add `user` as a function 
parameter, then check to see if a user is passed into the
function.  If a user ID is not found, we'll throw an 
`AuthenticationError`, as a person must be signed in to our 
service to create a new note.

Once we have verified that the request has been made by an 
authenticated user, we can create the note in the database. 

In doing so, we will now assign the author the user ID that
is passed to the resolver. This will allow us to reference
the creating user from the note itself. 

so in our '/src/resolvers/mutation.js' file, update our 
`newNote` resolver function:

```
// add the user context
newNote: async (parent, args, { models, user}) => {
    // if here is no user on the context, throw an authentication error
    if (!user) {
        throw new AuthenticationError('You must be signed in to create a note');
    }

    return await models.Note.create({
        content: args.content,
        // reference the author's `mongo` id
        author: mongoose.types.ObjectId(user.id)
    });
},
```

The last step is to apply the cross referencing to the data in our
database. To do this, we will need to upate the `author` field of our 
MongoDB `note` schema. So in our '/src/models/note.js' file, we update
the author field as follows:

```
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
```

With this reference in place, all new notes will accuately record
and cross-reference the author from the context of the request. 
Let's try this out by writing a `newNote` mutation in GP!

```
mutation {
    newNote(content: "Hello! This is a user-created note!") {
        id
        content
    }
}
```

When creating the mutation, we also must be sure to pas a JWT in 
the `Authorization` header 

```
{
    "Authorization": "<YOUR_JWT>"
}
```

which is:

```
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTEzOWM3ZjNmYjllMjUwYzEwMjliZSIsImlhdCI6MTY1NDg4NDkyMH0.0xFCjEG3ALQ55-gTxubb1uy3OF18pSZalrDnTfVaCBY"
}
```

it worked! the output for our query was:

```
{
  "data": {
    "newNote": {
      "id": "62ad64e8ab1a9232047c7a38",
      "content": "Hello! This is a user-created note!"
    }
  }
}
```

and output to the console was out userId!

```
[nodemon] 1.18.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/index.js`      
GraphQL Server running at http://localhost:4000/api
undefined
{ id: '62a139c7f3fb9e250c1029be', iat: 1654884920 }
{ id: '62a139c7f3fb9e250c1029be', iat: 1654884920 }
{ id: '62a139c7f3fb9e250c1029be', iat: 1654884920 }
```

Note, if one didn't have a JWT handy, one could simply execute
a signIn query to generate a new JWT! Then, run the `newNote`
mutation, passing the retrieved JWT to our 'headers!'

For now, our API doesn't return the author information, but 
we can verify that the author was added correctly by looking
up the note in the MongoDB shell. In a terminal window, we can
type the following:

```
mongo
db.notes.find({_id: ObjectId("<DOCUMENT-ID-HERE>")})
```
The returned value should include an author key, with a value 
of an Object ID.

// USER PERMISSIONS FOR UPDATES AND DELETES

Now we can add user checks to our `deleteNote` and `updateNote`
mutations as well. These will require that we check both that a 
user is passed to the context and whether that user is the owner 
of the note. To accomplish this, we'll check if the userID 
stored in the `author` field of our database mathces the user
ID that is passed into the resolver context!

So we upate our '/src/resolvers/mutation.js' as follows,
starting with the `deleteNote` mutaiton:

```
deleteNoe: async (parent, { id }, { models, user }) => {
  // if note a user, throw an AuthenticationError -- 
  if (!user) {
    throw new AuthenticationError('You must be signed in to delete a note');
  }

  // find the note
  const note = await models.Note.findById(id);

  // if the note owner and current user don't match, throw
  // a ForbiddenError -- 
  if (note && String(note.author) !== user.id) {
    throw new ForbiddenError("You don't have permission to delete the note");
  }

  try {
    // if everyting checks out, remove the note -- 
    await note.remove();
    return true;
  } catch (error) {
    // if there's an error along the way, return false
    return false;
  }
}
```

Now, also in '/src/resolvers/mutation.js', update the `updateNote`
mutation as follows:

```
updateNote: async (parent, { content, id }, { models, user }) => {
  // if not a user, throw an AuthenticationError -- 
  if (!user) {
    throw new AuthenticationError('You must be signed in to upate a note');
  }

  // find the note
  const note = await models.Note.findById(id);

  // if the note owner and current user don't match, throw a forbidden error --
  if (note && String(note.author) !== user.id) {
    throw new ForbiddenError("You don't have permissionss to update the note");
  }

  // Update the note in the db and return the updated note
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
}
```

// USER QUERIES

With out existing mutations updated to include user checks, 
let's also add some user-specific queries. To do this, we'll add 
3 new queries:

1. 'user': Given a specific username, returns the user's information

2. 'users': Returns a list of all users

3. 'me': Returns the user information for the current user

Before we write teh query resolver code, add these queries to the
'GraphQL' '/src/schema.js' file like so:

```
type Query {
  ...
  user(username: String!): User
  users: [User!]!
  me: User!
}
```

Now, in the '/src/resolvers/query.js' file, we update the
code to the following:

```
module.exports = {
    notes: async (parent, args, { models }) => {
        return await models.Note.find();
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id);
    },
    user: async (parent, { username }, { models }) => {
        // find a user given their username --
        return await models.User.findOne({ username });
    },
    users: async (parent, { username }, { models }) => {
        // find all users --
        return await models.User.findOne({ });
    },
    me: async (parent, args, { models, user }) => {
        // find a user given the curent user context --
        return await models.User.findById( user.id );
    },
}
```

Let's see how these look in our GP! First we can write a user 
query to look up the information of a specific user. Be sure
to use a username that you've alredy created:

```
query {
  user(username: "adam") {
    username
    email
    id
  }
}
```

This will return a data object, containing the username, email,
and ID values for the specified user!

actually, it might be better to use the 'users' query first!

```
query {
  users {
    username
    email
    id
  }
}
```

we got an error!

```
{
  "errors": [
    {
      "message": "Expected Iterable, but did not find one for field Query.users.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "users"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "message": "Expected Iterable, but did not find one for field Query.users.",
          "stacktrace": [
            "GraphQLError: Expected Iterable, but did not find one for field Query.users.",
            "    at completeListValue (...\\api-master\\node_modules\\graphql\\execution\\execute.js:606:11)",
            "    at completeValue (...\\api-master\\node_modules\\graphql\\execution\\execute.js:573:12)",
            "    at completeValue (...\\api-master\\node_modules\\graphql\\execution\\execute.js:557:21)",
            "    at ...\\api-master\\node_modules\\graphql\\execution\\execute.js:492:16",
            "    at processTicksAndRejections (internal/process/task_queues.js:97:5)",
            "    at async Promise.all (index 0)"
          ]
        }
      }
    }
  ],
  "data": null
}
```

fixed the error! and now got the correct result:

```
{
  "data": {
    "users": [
      {
        "username": "BeeBoop",
        "email": "robot@example.com",
        "id": "629fd85713f2c82ee4b4e9ae"
      },
      {
        "username": "BeeBoop4",
        "email": "robot3@example.com",
        "id": "62a139c7f3fb9e250c1029be"
      }
    ]
  }
}
```

now we can try the `user` query next time!:

```
query {
  user(username: "BeeBoop4") {
    username
    email
    id
  }
}
```

and this time we get the correct data:

{
  "data": {
    "user": {
      "username": "BeeBoop4",
      "email": "robot3@example.com",
      "id": "62a139c7f3fb9e250c1029be"
    }
  }
}

next time we just have to test the context!

so we pass the following header

```
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTEzOWM3ZjNmYjllMjUwYzEwMjliZSIsImlhdCI6MTY1NDg4NDkyMH0.0xFCjEG3ALQ55-gTxubb1uy3OF18pSZalrDnTfVaCBY"
}
```

and make the `me` query:

```
query{
  me {
    username
    email
    id
  }
}
```

which gives us the following output:

```
{
  "data": {
    "me": {
      "username": "BeeBoop4",
      "email": "robot3@example.com",
      "id": "62a139c7f3fb9e250c1029be"
    }
  }
}
```

and our id is also printed to the console:

```
{ id: '62a139c7f3fb9e250c1029be', iat: 1654884920 }
```

With these resolvers in place, we can now query our API for user
information.

// TOGGLING NOTE FAVORITES

We have one last piece of functionality to add to our user 
interactions. One may recall that our application specifications 
stated that "users will be able to favorite the notes of other
users as well as retrieve a list of their favorites".

Similar to Twitter "hearts" and Facebook "likes", we'd like our 
users to be able to mark (and unmark) a note as a favorite. To 
implement this behavior, we'll follow our standard pattern of
updating the GraphQL schema, then the database model, and 
lastly the resolver function:

1. GraphQL schema
2. Database model
3. Resolver function!

First, we will update our GraphQL schema in '/src/shema.js' by 
adding two new proprties to our `Note` type:

1.`favoriteCount`: tracks total number of 'favorites' received
by note
2.`favoriteBy`: contains an array of users who have favorited a
note

so we update our `Note` type in our '/src/schema.js' file as 
follows:

```
type Note {
  // add the following properties to the Note type
  favoriteCount: Int!
  favoriteBy: [User!]
}
```

We'll also add the list of favorites to our `User` type:
also in our '/src/schema.js` file:

```
type User {
  // add the favorites property to the `User` type
  favorites: [Note!]!
}
```

Next, we will add a mutation in '/src/schema.js' called
`toggleFavorite`, which will resolve by either adding or
removing a favorite for the specified note. This mutation
will take a note ID as a parameter and return the 
specified note:

```
type Mutation {
  // add toggleFavorite to the `Mutation` type
  toggleFavorite(id: ID!): Note!
}
```

Next, we need to update our note model to include
the `favoriteCount` and `favoriteBy` properteis in our
database. `favoriteCount` will be a `Number` type with a 
default value of 0; `favoriteBy` will be an `array` of
objects, containing references to user objects IDs in
our database. Our full '/src/models/node.js' file will
then look as follows:

```
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    // add the `favoriteCount` property --
    favoriteCount: {
      type: Number,
      default: 0
    },
    // add the favoriteBy property --
    favoriteBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    // Assigns `createdAt and `updatedAt fields with a `Date` type --
    timestamps: true
  }
);
```

With our GraphQL schema and database models updated, we can now
write the `toggleFavorite` mutation:

p. 77!


 */