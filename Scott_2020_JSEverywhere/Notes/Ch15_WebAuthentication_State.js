/* 
// CHAPTER 15: WEB AUTHENTICATION AND STATE

Client-side web authentication: Our users fill outa form and will be 
handed a key to the website, in the form of a password alongside a
token stored in their browser. When they return to the site they 
will either be automatically authenticated with the token, or be able
to sign back in using their password.

In this chapter, teach will build out a web authentication system with
our GraphQL API. To do this, we'll be building forms, storing JWTs in 
the browser, sending tokens with each request, and keeping track of our
application's state.

// CREATING A SIGN-UP FORM

To get started with our application's client authentication, we can
create a user sign-up 'React' component. Before doing so, let's map out
how the component will work.

First, a user will navigate to '/signup' route within our application.
On this page they will be presented with a form where they can enter
their email address, desired username, and password. Submitting the 
form will perform out API `signUp` mutation. If the mutation is
successful, a new user account will be created and the API will return
a JWT. If there is an error, we can inform the user. We'll be displaying
a genetic error message, but we could update our API to return specific
error messages, such as a pre-existing username or a duplicate email
address. 

Le's get started by creating our new route. First, we'll create a new 
'React' component at '/src/pages/signup.js':

```
import React, { userEffect } from 'react';

// include the props passed to the component for later use
const SignUp = props => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign up - Notedly';
    });

    return (
        <div>
            <p>Sign Up</p>
        </div>
    );
};

export default SignUp;
```

Now we'll update our route list in '/src/pages/index.js' to 
include the `signup` route:

# HERE -- p. 154!

*/