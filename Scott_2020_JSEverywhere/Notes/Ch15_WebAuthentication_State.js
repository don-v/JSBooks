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

so added new user:

{
    username: 'world_lover',
    email: 'world_lover@example.com',
    password: 'password1234'    
}

returned the following to the console:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTk1ZDQ3ODRjOTY2Mjk4NGRiZDg1OSIsImlhdCI6MTY2NjgwMDk2N30.tEf_8CeYg1j5U6nkNUfhlhdYEmy8dwDsN7qWkjFGcrI
```

With out mutation in place and returning the expected data, next we 
want to store the response that we receive.

// JSON WEB TOKENS AND LOCAL STORAGE

When our `signUp` mutation is successful, it returns a JSON Web Token (JWT).
One may recall from the API section that a `JWT`:
https://jwt.io/

allows us to securely store a user's ID on the user's device. To achieve
this in our user's web browser, we'll store the token in the browser's
`localStorage`. `localStorage` is a simple key-value store that persists 
across browser sessions until the storage is upated or cleared. Let's 
update our mutation to store the token in `localStorage`:

In '/src/pages/signup.js', update the `useMutation` hook to store the 
token in `localStorage` (see Figur 15-3):

```
const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
        // store the JWT in localstorage
        localStorage.setItem('token', data.signUp);
    }
});
```

> JWTs and Security -- When a token is stored in localStorage,
any JS that can be run on the page has access to the token, making
it susceptible to cross-site scripting (XSS) attacks. For this reason,
when using `localStorage` to store token credientials, one needs to
take extra care to limit (or avoid) CDN hosted scripts. If a 3rd-party
script is compromised, it would have access to the JWT.

with out JWT stored locally, we're prepared to use it in our
GraphQL mutations and queries. 

// REDIRECTS

Currently when a user completes the sign-up form, the form re-renders
as an empty form. this doesn't lave the user with much of a visual cue
that their account registration was successful. Instead, let's redirect
the user to the home page of our application.  Another option would
be to creat a "Success" page that thanks the user for registering and
onboards them to the application.

As you may recall from earlier in the chapter, we're passing the 
properties into the component. We can redirect a route using 'React'
Router's `history`, which will be available to us through 
`props.history.push`. To implement this, we'll update our mutation's 
`onCompleted` event to include a redirect like so:

```
const [signUp, { loading, error }] = userMutation(SIGNUP_UP, {
    onCompleted: data => {
        // store the token
        localStorage.setItem('token', data.signUp);
        // redirect the user to hte homepage
        props.history.push('/');
    }
});
```

with this change, users will now be redirected to our application's home page 
after registering for an account.

// ATTACHING HEADERS TO REQUESTS

Though we are storing our token in `localStorage`, our API does not yet
have access to it. This means that even if a user has created an account,
the API has no way of identifying the user. If one recalls from our API
deployment, each API call receives a token in the header of the request.
We'll modify our client to sent the JWT as a header with each request.

In '/src/App.js', we'll update our dependencies to include `createHttpLink`
from Apollo Client as well as `setContext` from Apollo's Link Context
package. We'll then update update Apollo's configuration to send the token
in the header of each request:

our updated '/src/App.js' will now look as this:

```
// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client libraries
import { 
  ApolloClient, 
  ApolloProvider, 
  createHttpLink,
  InMemoryCache 
} from '@apollo/client'; 

import { setContext } from 'apollo-link-context';

// import global styles
import GlobalStyle from '/components/GlobalStyle';
// import routes
import Pages from '/pages';

// configure our API URI & cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// configure/create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true  
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle/>
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

With this change, we'll now be able to pass the information of
the logged-in user to out API.

// LOCAL STATE MANAGEMENT

We've looked at managing state within a component, but what about
across our applicaiton? There are times where it's useful to have
some information shared among many components. We could pass `props`
from a base component across our application, but as soon as we get 
past a couple of levels of subcomponents, this can get messy. 
Libraries such as Redux...:
https://redux.js.org/
...
and MobX...:
https://mobx.js.org/README.html
...
have sought to solve the challenges of state management and have
proven useful for many developers and teams. In our case, we're
arleady making use of the Apollo Client library, which includes
the ability to use GraphQL queries for local state management. 
Rather than introducing another dependency, let's implement a
local state property that will store whether the user is logged
in.

The Apollo React library puts the `ApolloClient` instance within
'React's context, but at times, we may need to access it directly.
We can do so with the `useApolloClient` hook, which will allow us
to perofrm actions such as directly updating or resetting the 
cache store or writing local data.

Currently, we have two ways to determine if a user is logged
in to our application. First, we know they are a current user
if they've successfully submitted the sign-up form. Second,
we know that if a visistor accesses the site with a token
stores in `localStorage`, then they are already logged in. Let's
begin by adding to our state when a user completes the sign-up
form. To achieve this, we'll write directly to our Apollo
Client's local store, using `client.writeData` and the
`useApolloClient` hook.

In '/src/pages/signup.js', we first need to upate the 
`apollo/cleint` library import to include `useApolloClient`:

```
import { useMutation, useApolloClient } from `@apollo/client`;
```

In '/src/pages.signup.js' we'll call the `useApolloClient`
function and update the mutation to add to the local store,
using `writeable`, when it is complete.

```
// Apollo Client
const client =  useApolloClient();
// Mutation Hook
const [singUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
        // store the token
        localStorage.setItem('token', data.signup);
        // update the local cache
        client.writeData({data: { isLoggedIn: true } });
        // redirect the user to the `homepage`
        props.history.push('/');
    }
});
```

# HERE -- p. 164!

```
// check for a local token
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

// write the cache data on initial load
cache.writeData({ data });
```

Here comes the cool part: we can now access `isLoggedIn` as a GraphQL 
query anywhere within out application by using the @client directive. 
To demonstrate this, let's update the header of our application to 
display a "Sign Up" and "Sign In" link if `isLoggedIn` is `false`
and a "Log Out" link `isLoggedIn` is `true`

In '/src/components/Header.js', import the necessary dependencies and 
write the query like so:

```
// new dependencies
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// local query
const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;
```
Now, within our React component we can include a simple
query to retrieve the state along with a tertiary operator
that displays options either to log out our sign in:

```
cont UserState = styled.div`
    margin-left: auto;
`;
```

# HERE -- p. 165!


*/