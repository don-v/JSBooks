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

HERE!
```


*/