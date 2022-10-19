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
into a form, a user toggles a slider

# HERE -- p. 157!












*/