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
write the `toggleFavorite` mutation; This mutation will receive
a note ID as a parameter and check to see if the user is already
listed in the `favoritedBy` array. If the user is listed, we 
will remove the favorite by decreasing the `favoriteCount` and
removing the user from the list. If the user has not yet favorited
teh note, we will increment the `favoriteCount` by ` and add the 
current user to the `favoriteBy` array. To do all of this, add the
following code to the '/src/resolvers/mutation.js' file:

```
toggleFavorite: async (parent, { id }, { models, user }) => {
        // if no user context is passed, throw auth error
        if (!user) {
          throw new AuthenticationError();
        }

        // check to see if the user has already favorited the note --
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);
      

      // if the user exists in the list
      // pull them from the list and reduce the `favoriteCount` by 1 --
      if (hasUser >= 0) {
        return await models.Note.findByIdAndUpdate(
          id,
          {
            $pull: {
              favoritedBy: mongoose.Types.ObjectId(user.id)
            },
            $inc: {
              favoriteCount: -1
            }
          },
          {
            // set new to true to return the updated doc
            new: true
          }
        );
      } else {
        // if the user doesn't exist in the list
        // add them to the list and increment the `favoriteCount` by 1 --
        return await models.Note.findByIdAndUpdate(
          id,
          {
            $push: {
              favoritedBy: mongoose.Types.ObjectId(user.id)
            },
            $inc: {
              favoriteCount: 1
            }
          },
          {
            // set new to true to return the updated doc
            new: true
          }
        );
      }
    },
```

updated the `toggleFavorite` resolver -- will have to
test it out next time!


With this code in place, let's test our ability to toggle
a note favorite in the GraphQL Playground. Let's do this
with a freshly created note. We'll begin by writing a `newNote`
mutation, being usre to include an `Authorization` header
with a valid JWT:

```
mutation {
  newNote(content: "New note to test toggleFavorite resolver!") {
    content
    favoriteCount
    id
  }
}
```


HTTP HEADERS:

```
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTEzOWM3ZjNmYjllMjUwYzEwMjliZSIsImlhdCI6MTY1NDg4NDkyMH0.0xFCjEG3ALQ55-gTxubb1uy3OF18pSZalrDnTfVaCBY"
}
```

and when we execute our `newNote` mutation, we are returned
with the following:

```
{
  "data": {
    "newNote": {
      "content": "New note to test toggleFavorite resolver!",
      "favoriteCount": 0,
      "id": "62ba50d21fea342ac0fd73c1"
    }
  }
}
```


One will note that the `favoriteCount` property of our
note is automatically set to `0`, because that's the default 
value we had set in our data model. Now, let's write a 
`toggleFavorite` mutation to mark it as a favorite, passing
the ID of the note as a parameter. Again, be sure to indclude
the `Authorization` HTTP header, with a valid JWT:

```
mutation {
  toggleFavorite(id: "62ba50d21fea342ac0fd73c1") {
    favoriteCount
  }
}
```

```
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTEzOWM3ZjNmYjllMjUwYzEwMjliZSIsImlhdCI6MTY1NDg4NDkyMH0.0xFCjEG3ALQ55-gTxubb1uy3OF18pSZalrDnTfVaCBY"
}
```



we got an error!

```
{
  "errors": [
    {
      "message": "Cannot read property 'indexOf' of undefined",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "toggleFavorite"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "TypeError: Cannot read property 'indexOf' of undefined",
            "    at toggleFavorite (...\\api-master\\src\\resolvers\\mutation.js:140:47)",
            "    at processTicksAndRejections (internal/process/task_queues.js:97:5)"
          ]
        }
      }
    }
  ],
  "data": null
}
```

tried to update schema changed `favoriteBy` to `favoritedBy`

```

  "errors": [
    {
      "message": "Cannot read property 'indexOf' of undefined",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "toggleFavorite"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "TypeError: Cannot read property 'indexOf' of undefined",
            "    at toggleFavorite (...\\api-master\\src\\resolvers\\mutation.js:140:47)",
            "    at processTicksAndRejections (internal/process/task_queues.js:97:5)"
          ]
        }
      }
    }
  ],
  "data": null
}
```


error when just trying to retrieve regular note:

```
{
  "error": {
    "errors": [
      {
        "message": "Field \"author\" of type \"User!\" must have a selection of subfields. Did you mean \"author { ... }\"?",
        "locations": [
          {
            "line": 5,
            "column": 5
          }
        ],
        "extensions": {
          "code": "GRAPHQL_VALIDATION_FAILED",
          "exception": {
            "stacktrace": [
              "GraphQLError: Field \"author\" of type \"User!\" must have a selection of subfields. Did you mean \"author { ... }\"?",
              "    at Object.Field (...\api-master\\node_modules\\graphql\\validation\\rules\\ScalarLeafs.js:45:31)",
              "    at Object.enter (...\api-master\\node_modules\\graphql\\language\\visitor.js:324:29)",
              "    at Object.enter (...\api-master\\node_modules\\graphql\\language\\visitor.js:375:25)",
              "    at visit (...\api-master\\node_modules\\graphql\\language\\visitor.js:242:26)",
              "    at Object.validate (...\api-master\\node_modules\\graphql\\validation\\validate.js:73:24)",
              "    at validate (...\api-master\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:172:32)",
              "    at Object.<anonymous> (...\api-master\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:110:42)",
              "    at Generator.next (<anonymous>)",
              "    at fulfilled (...\api-master\\node_modules\\apollo-server-core\\dist\\requestPipeline.js:4:58)",
              "    at processTicksAndRejections (internal/process/task_queues.js:97:5)"
            ]
          }
        }
      }
    ]
  }
}
```

ok finally got it to work!
we got the following output:
```
{
  "data": {
    "toggleFavorite": {
      "favoriteCount": 1
    }
  }
}
```

used solution to update the following files:

'/src/models/note.js'
'/src/models/resolvers/mutation.js':

p. 80!

Users can now mark and unmark notes as favorites. More 
importantly, this functionality demosntrates how one
can add new features to a GraphQL application's API.

// NESTED QUERIES

One of the great things about GraphQL is that we can 
_nest_ queries, allowing us to write a single query
that returns precisely the data we need, rather than
multiple queries. Our GraphQL schema's `User` type
includes a list of notes by the author in an array 
format, whic our `Notes` type includes a reference to
author. As a result, we can pull a lsit of notes from 
a user query or get the author information from a 
note query.


this means we can write a query that looks like this:

```
query {
  note(id: "62ba50d21fea342ac0fd73c1") {
    id
    content
    # the information about the author note
    author {
      username
      id
    }
  }
}
```

If we currently try to run a nested query like the preceding
one, we'll receive an error. This is because we haven't yet 
written the resolver code that performs the database lookup
for this information.

To enable this functionality, we'll add 2 new files in our 
'/src/resolvers' directory:

In '/src/resolvers/note.js, we add the following: 

```
module.exports = {
  // Resolve teh author infor for a ntoe when requested
  author: async (note, args, { models }) => {
    return await models.User.findById(note.author);
  },
  // Resolved the `favoritedBy` infor for a note when requested
  favoritedBy: async (note, args, { models }) => {
    return await models.User.find({ _id: { $in: note.favoretedBy }});
  }
};
```

In '/src/resolvers/user.js, add the following:

```
module.exports = {
  // Resolve the list of notes for a user when requested
  notes: async (user, args, { models }) => {
    return await models.Note.find({ author: user._id }).sort( { _id: -1 });
  },
  favorites: async (user, args, { models }) => {
    return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 })
  }
};
```


 */