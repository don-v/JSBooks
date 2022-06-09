/* 
// CHAPTER 7: USER ACCOUNTS AND AUTHENTICATION

We supply username and password -- submit the form to the 'receptionist'.
'recpetionist' then encrypts the password with a secret key and stores the 
encrypted version of the password in a locked file vault.

The 'receptionist' then stamps a coin, on which is pressed one's unique
membership ID. Upon returning to the front room, the 'receptionist'
hand you the coinc, which you tuck away in yoru pocket. Now each time
you return to the club, one only needs to show the coin to gain entrance!

This process is nearly identical to the process that is followed each time
one signs up for a web application.

In this chapter, we learn how to build GraphQL mutations that will allow a 
user to create an account and sign in to our application. We'll also learn
how to encrypt the user's password and return a token to the user, which
they can use to verify their identify when they interact with our application!

// APPLICATION AUTHENTICATION FLOW

Let's start by mapping the flow users follow when they sign up for an account
and log in to an existing account.  

A. ACCOUNT CREATION FLOW

    1. A user enters their intended email, username, and password into a
    field in a user interface (UI), such as teh GraphQL Playground, a web 
    application, or a mobile application

    2. The UI sends a GraphQL mutation to our server with the user's 
    information.

    3. The server encrypts the password and stores the user's information in
    the database.

    4. The server returns a token to the UI, which contains the user's ID.

    5. The UI stores this token, for a specified period of time, and sends it
    with every request to the server to verify the user.

B. ACCOUNT SIGN-IN FLOW

    1. A user enters their email or username and password into a field in a UI

    2. The UI sends a GraphQL mutation to our server with this informaiton.

    3. the server decrypts the password stores in the database and compares it with 
    the one the user entered.

    4. If the passwords match, the server returns a token to the UI, which contains
    the user's ID.

    5. The UI stores this token, for a specified period of time, and sends it 
    with every request to the server.

In this chapter, we will focus on implementing the API portions of these 
interactions!

NOTE: PASSWORD RESET FLOW:

One will notice that our application does not allow users to change
their password. We coul allow users to reset their passowrd with a 
single mutation resolver, but it is much more secure to verify the
reset reques via email first. For brevity's sake, we won't be 
implementing password reset functionality in this book, but if one is
interested in examples and resources for creating a passowrd reset flow, 
visit the `JavaScript Everywhere Spectrum` community:
https://spectrum.chat/jseverywhere

// ENCRYPTION AND TOKENS

In our exploration of the user authentication flow, teach mentioned
encryption and tokens. Teach will discuss the detail of each of
these in more detail:

// ENCRYPTING PASSWORDS

To effectively encrypt user passwords, one should use a combination
of hashing and salting. _Hashing_ is the act of obscuring a string 
of text by turning it into a seemingly random string. Hashing functions
are 'one-way', meaning that once the text is hashed, the resulting
hashed-string cannot be used to derive the original source text. 
When a password is hashed, the plain text of the password is never 
stored in a database.

Salting is the act of generating a random string of data that will
be used in addition to the hashed password. This ensures that even
if two user passwords are the same, the hashed and salted versions 
be unique. 

`bcrypt` is a popular hashing function based on the blowfish cipher:

https://en.wikipedia.org/wiki/Blowfish_(cipher)

it is commonly used within a range of web frameworks. In Node.js 
development we can use the the 'bcrypt' module to both salt and
hash our passowrds:

https://www.npmjs.com/package/bcrypt

In our application code we would require the `bcrypt` module to
write a function to handle salting and hashing.

// Salting and Hashing eamples:

The following examples are for illustrative purposes. We will
integrate password salting and hashing with `bcrypt` later
in this chapter.

```
// require the module
const bcrypt = require('bcrypt');
// note that we had to insatll 'bcryptjs'

// the cost of processing the salting dta, 10, is the default:
const saltRounds = 10;

// function for hashing and salting:
const passwordEncrypt = async password => {
    return await bcrypt.hash(password, saltRounds)
};
```

In this example, teach could pass a password of `PizzaP@rty99`, which
generates a salt of $2a#10$HF2rs.iYSvX1l5FPrX6970 and the hashed and
salted password of $2a$10$HF2rs.iYSvX1l5FPrx6970/02kwHuKdQTdy.7oaMwVga54bWG
which is the salt plus the encrypted passowrd string.

Now when checking a user's password against the hashed and salted
password, we will use the bcrypt's compare method:

```
// password is a value provided by the user (`plainTextPassword`)
// hash is retreived from our DB:
const checkPassword = async (plainTextPassword, hashedPassword) => {
    // res is either true or false
    return await bcrycpt.compare(hashedPassword, plainTextPassword)
};
```

With the user passowrds encrypted, we are able to safely store them 
in a database.

// JSON WEB TOKENS

As a user it would be extremely frustrating if we needed to enter our
username and passowrd each time we wanted to access a single protected
page of a site or application. Instead, we can securely store a user's 
ID on their device within a JSON Web Token (https://jwt.io).

With each request the user makes from the client, they can send that 
token, which the server will use to identify the user.

A JSON Web Token (JWT) consists of 3 parts:

1. Header: General information about the token and type of 
signing algo that is being used

2. Payload: The information that we've intentionally stored within
the token (such as the Username or ID)

3. Signature: A means to verify the token

If we were to look at the token, it would appear to be made up
of random characters with each part separted by a period:

```
xx-header-xx.yy-payload-yy.zz-signature-zz
```

In our application code we can use the `jsonwebtoken` module 
to generate and validate our tokens. To do this we pass in the 
information we wish to store, along with a secret password, which 
would typically be stored within our .env file.:

```
const jwt = require('jsonwebtoken');

// generate a JWT that stores a user id:
const generateJWT = await user +> {
    return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
}

// validate the JWT
const validateJWT = await token => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}
```

// JWTs Versus Sessions

If you've worked with user authentication in web applications
before, you've likely come accross user _sessions_. Session 
information is stored locally, typically in a cookie, and verified 
against an in-memory data store (such s Redis), though traditional
databases can be used as well. 

There is much debate about which is better, JWTs or sessions, but
teach has found that JWTs offer the most flexibility, particularly
when integrating with non-web environments such as native mobile,
applications. Though sessions works well with GraphQL, JWTs are 
also the recommended approach in the GraphQL Foundation and
Apollo Server documentation.

By using JWTs, one can securely return and store a user's ID with the 
client application!

// INTEGRATING AUTHENTICATION INTO OUR API

Now that one has a solid understanding of the components of user
authentication, we'll implement the ability for users to sign up and 
sign in to our application. To do this we'll be updating both our 
`GraphQL` and `Mongoose` schemas, writing `signUp` and 
`signIn` mutaiton resolvers that generate a user token, and validating
the token on each request to the server!

To begin, we will update our GraphQL schema by adding a `User` type
and updating the `Note` type's `author` field to refrence the `User`
type. To do so, update the '/src/schema.js' file:

```
type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
}

type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    notes: [Note!]!
}
```

When a user signs up for our application, they will submit a username,
email address, and password. When a user signs in to our application, 
they will send a mutation containing their username or email address 
along with a password. If a sign-up or sign-in mutation is successful,
the API will return a token as a string. To accomplish this in our 
schema, we will need to add two new mutations to our '/src/schema.js'
file, each of which will return a `String`, which will be our JWT:

```
type Mutation {
    ...
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
}
```

Now that our GraphQL schema has been updated, we also need to update
our database models. To dos this, we'll creat ea Mongoose Schema file 
'/src/models/user.js'. This file will be set up similarly to our 'note'
model file, with fields for username, email, password, and avatar. We
will also require the username and email fields to be unqiue in our 
database by setting index: { unique: true }:

To create the user database model, we enter the following into our 
'/src/models/user.js' file:

```
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        // Assigns createdAt and updatedAt fields with a Data type
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
```

With our user model file in place, we now must update the
'/src/models/index.js' to export the model:

```
const Note = require('./note');
const User = require('./user');

const models = {
  Note,
  User
};

module.exports = models;
```

// AUTHENTICATE RESOLVERS

With our GrpahQL schemas and Mongoose models/schema written,
we can implement the resolvers tht will allow a user to sign up
and sign in to our application.

First, we need to add a value of teh `JWT_SECRET` variable in our 
.env file. This value shoudl be a string without spaces. It will
be used to sign our JWT, which allows us to verify them when they
are decoded.

```
JWT_SECRET=YourPassphrase
```

Once we have created this variable, we can import teh required
packages within our `/src/resolvers/mutation.js` file.  We will
utilize the 3rd party `bcrypt`, `jsonwebtoken`, `mongoose`, and
`dotenv` packages and also import the 'Apollo Server' module's 
`AuthenticationError` and `ForbiddenError` utility classes. 

Additionally, we'll import the `gravatar` utility function, which
teach has included with the project. This will generate a 
'Gravatar' image, from a user's email address. For more info:
https://en.gravatar.com
https://en.wikipedia.org/wiki/Gravatar

So in our `/src/resolvers/mutation.js` file, we update our code
with the following:

```
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
    AuthenticationError, 
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');
```

now with our '/src/resolvers/mutation.js' file updated,
we can write our `signUp` mutation. This mutation will
accept a username, email address, and password as 
parameters.

We will normalize the email address and username by 
trimming any whitespace and converting it to al lowercase.
Next, we will encrypt the user's password using the `bcrypt`
('bcryptjs`) module. We will also generate a Gravatar
image URL for user avatars by using our helper library.

Once we have performed these actions, we will store the
user in the database and return a tokeen to the user. 
We can set this al lup within a `try-catch` block, so
that our resover returns an intentionally vague error to 
the client if there are any issues iwth the sign-up
process.

T accomplish all f this, we write the `signUp` mutation
as follows within our '/src/resolvers/mutation.js' file:


```
signUp: async(parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase();

        // hash the passowrd
        const hashed = await bcrypt.hash(password, 10);

        // create the gravatar url
        const avatar = gravatar(email)

        // create a user:
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

            // create and return the json web token
            return jwt.sign({ id: user._id}, process.env.JWT_SECRET)

        } catch (error) {
            console.log(error);
            // if there's an error creating the account, throw an error
            throw new Error('Error creating account');
        }
    },

```

Now, if we switch over to the GraphQL Playground in our browser, we can try
out our 'signUp' mutation. To do so we'll write a GraphQL mutation with 
username, email, and passord values:

```
mutation {
    signUp(
        username: "BeeBoop"
        email: "robot@example.com"
        password: "NotARobot10010!"
    )
}
```

When we run this mutation, our server should return a token like
this:

```
"data": {
    "signUp": "eyJhbGciOiJIUzI`NiIsInR5cCI6"
}
```

got the following error:

```
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Mutation.signUp.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "signUp"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: Cannot return null for non-nullable field Mutation.signUp.",
            "    at completeValue (...\api-master\\node_modules\\graphql\\execution\\execute.js:560:13)",
            "    at ...\api-master\\node_modules\\graphql\\execution\\execute.js:492:16",
            "    at processTicksAndRejections (internal/process/task_queues.js:97:5)"
          ]
        }
      }
    }
  ],
  "data": null
}
```

we tried the mutation again, but this time go the following error:

```
{
  "errors": [
    {
      "message": "Error creating account",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "signUp"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: Error creating account",
            "    at signUp (...\\api-master\\src\\resolvers\\mutation.js:67:19)",
            "    at processTicksAndRejections (internal/process/task_queues.js:97:5)"
          ]
        }
      }
    }
  ],
  "data": null
}
```

so the output in the console was:

```
GraphQL Server running at http://localhost:4000/api
MongoError: E11000 duplicate key error collection: notedly.users index: username_1 dup key: { username: "BeeBoop" }
    at Function.create (...\api-master\node_modules\mongoose\node_modules\mongodb\lib\core\error.js:44:12)
    at toError (...\api-master\node_modules\mongoose\node_modules\mongodb\lib\utils.js:150:22)
    at ...\api-master\node_modules\mongoose\node_modules\mongodb\lib\operations\common_functions.js:266:39
    at handler (...\api-master\node_modules\mongoose\node_modules\mongodb\lib\core\sdam\topology.js:971:24)
    at ...\api-master\node_modules\mongoose\node_modules\mongodb\lib\core\sdam\server.js:496:5
    at ...\api-master\node_modules\mongoose\node_modules\mongodb\lib\core\connection\pool.js:414:18
    at processTicksAndRejections (internal/process/task_queues.js:79:11) {
  driver: true,
  index: 0,
  code: 11000,
  keyPattern: { username: 1 },
  keyValue: { username: 'BeeBoop' },
  errmsg: 'E11000 duplicate key error collection: notedly.users index: username_1 dup key: { username: "BeeBoop" }',
  [Symbol(mongoErrorContextSymbol)]: {}
}
```


```
mutation {
    signUp(
        username: "BeeBoop4"
        email: "robot3@example.com"
        password: "Not3ARobot10010!"
    )
}

```


it worked!

```
{
  "data": {
    "signUp": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTEzOWM3ZjNmYjllMjUwYzEwMjliZSIsImlhdCI6MTY1NDczMzI1NX0.AVDkkSHZccDgrBpj1WBN__AWaQppkGUJZ3Ka0D_Wk3k"
  }
}
```

#HERE: p. 63!


*/