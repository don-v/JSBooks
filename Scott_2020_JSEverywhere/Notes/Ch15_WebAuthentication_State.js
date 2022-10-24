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

```
// import the signup route
import SignUp from './signup';

// within the Pages component add the route
<Route path="/signup" component={SignUp} />
```

after all of the modification, our '/src/pages/index.js'
page will have the following source:

```
// import React and routing dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import shared layout component
import Layout from '../components/Layout';

// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

// import the signup route
import SignUp from './signup';

// define routes
const Pages = () => {
  return (
    <Router>
      <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/mynotes" component={MyNotes} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/note/:id" component={NotePage} />
          //within the Pages component add the route
          <Route path="/signup" component={SignUp} />
      </Layout>
    </Router>
  );
};

export default Pages;
```

By adding the 'signup' route, we will be able to navigate
to 'http://localhost:1234/signup' to see the (mostly empty)
sign-up page. 

Indeed, it worked!

Now, let's add the markup for our ('signup') form:

'/src/pages/signup.js' will look as follows:

```
import React, { useEffect } from 'react';

// include the props passed to the component for later use
const SignUp = props => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign up - Notedly';
    });

    return (
        <div>
            <form>
                <label htmlFor="username">Username:</label>
                <input 
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                />
                <label htmlFor="email">Email:</label>
                <input 
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
                <label htmlFor="password">Password:</label>
                <input 
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
```

> `htmlFor`: If one is just learning 'React', one of the common
gotchas are JSX attributes that differ from their HTML counterparts.
In this case we are using the JSX `htmlFor` in place of HTML's 
`for` attribute to avoid any JS collisions. You can see a full,
though short, list of these attributes in the React DOM Elements
documentation:
https://reactjs.org/docs/dom-elements.html

Now we can add some style by importing our `Button` component and 
styling the form as a styled component:

```
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%,
        margin-bottom: 1em;
    }
`;

const SignUp = props => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign Up - Notedly';
    });

    return (
        <div>
            <form>
                <label htmlFor="username">Username:</label>
                <input 
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                />
                <label htmlFor="email">Email:</label>
                <input 
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
                <label htmlFor="password">Password:</label>
                <input 
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
```

updated '/src/pages/signup.js'. the source now looks
as follows:

```
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%,
        margin-bottom: 1em;
    }
`;


// include the props passed to the component for later use
const SignUp = props => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign up - Notedly';
    });

    return (
        <Wrapper>
            <Form>
                <label htmlFor="username">Username:</label>
                <input 
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                />
                <label htmlFor="email">Email:</label>
                <input 
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
                <label htmlFor="password">Password:</label>
                <input 
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
```

ok, so we were able to style our form! it worked!

// REACT FORMS AND STATE

In an application, things change. Data is entered 
into a form, a user toggles a slider open, a message is sent. In 
'React', we can track these changes at the component level by 
assigning _state_. In our form, we'll need to track the state of 
each form element, so that it can be submitted. 

> `ReactHooks`: In this book we're using functional components and
'React''s new Hooks API. If you've used other learning resources 
that make use of 'React''s `class` components, this may look a 
little different. You can read more about Hooks in the 'React'
documentation:
https://reactjs.org/docs/hooks-intro.html

To get started with state, we'll first update the 'React' import
at the top of our '/src/pages/signup.js' file to include
`useState`:

```
import React, { useEffect, useState } from 'react';
```

Next, within our `SignUp` component, we'll set the default form
value state:

```
const SignUp = props => {
    // set the default state of the form
    const [values, setValues] = useState();

    // rest of component goes here
};
```

Now we'll update our components to change the state when a form
field is entered and perform an operation when a user submits the
form. First, we'll create an `onChange` function, which will update
our component's state whenever the form is updated. We'll also
update the markup of each form element to all this function when a
user makes a change, using the `onChange` property. Then we'll 
update our `form` element to include an `onSubmit` handler. For
now, we'll simply log our form data to the console.

In '/src/pages/signup.js':

```
const SignUp = () => {
    // set the default state of the form
    const [values, setValues] = useState();

    // update the state when a user types in the form
    const onChange = event => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            });
        };
        useEffect(() => {
            // update the document title
            document.title = 'Sign Up - Notedly';
        });

        return (
            <Wrapper>
                <h2>Sign Up</h2>
                <Form
                    onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                    }}
                    >
                    <label htmlFor="username">Username:</label>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={onChange}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Wrapper>
        );
    };
```

// `signUp` Mutation

To sign up a user, we'll be using our API's `signUp` mutation.
This mutation will accept an email, username, and password as
variables and return a JWT if the signup is succesful. Let's
write our mutation and integrate it into our signup form.

First, we'll need to import our Apollo libraries. We'll be making
use (using?) of the `useMutation`and `useApolloClient` hooks, 
as well as the `gql` syntax, from Apollo Client. In 
'/src/pages/signup.js(Signup?)', we add the following to the
library import statements:

```
import { useMutation, useApolloClient } from '@apollo/client';
```

now we write the GraphQL mutation as follows:

const SIGNUP_USER  = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

With the mutation written, we can update our 'React' component markup to
perform the mutation when a user submits the form, passing the form elements
as variables. For now, we'll log our response (which, if successful, should be
a JWT) to the console:

```
const SignUp = props => {
    // useState, onChange, and useEffect all remain the same

    // add the mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // console.log the JSON Web Token when the mutation is complete
            console.log(data.signUp)
        }
    });

    // render our form
    return (
        <Wrapper>
            <h2>Sign Up</h2>
            // pass the form data to the mutation when a user submits the form 
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    signUp({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
            // rest of the form remains unchagned ...
            </Form>
        </Wrapper>
    );   
};
```

Now if you complete and submit the form, you should see a JWT
logged to your console (Figure 15-1). Additionally, if you perform
a `users` query in the GraphQL Playground (http://localhost:4000/api),
one'll see the new account (Figure 15-2)

# HERE -- p. 160, need to update '/src/pages/signup.js'




*/