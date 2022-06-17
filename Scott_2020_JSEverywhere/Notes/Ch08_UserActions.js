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
HERE p. 71!
```

 */