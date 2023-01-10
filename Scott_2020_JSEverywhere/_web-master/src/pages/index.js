// import React and routing dependencies
import React from 'react';
// update our react-router import to include `Redirect`
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import shared layout component
import Layout from '../components/Layout';

// import the sign-in page component
import SignIn from './signin';


// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

// import the signup route
import SignUp from './signup';

// import the NewNote route component
import NewNote from './new';

// import the edit page component
import EditNote from './edit';

import { useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// define routes
const Pages = () => {
  return (
    <Router>
      <Layout>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/mynotes" component={MyNotes} />
          <PrivateRoute path="/favorites" component={Favorites} />
          {/* add a private route to our list  of routes, within the */}
          <PrivateRoute path="/new" component={NewNote} />
          {/* add a new private route that accepts an `:id` parameter */}
          <PrivateRoute path="/edit/:id" component={EditNote} />
          <Route path="/note/:id" component={NotePage} />
          {/* within the Pages component add the route */}
          <Route path="/signup" component={SignUp} />
          {/* add a signin route to our routes list */}
          <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the user is logged in, route them to the requested component
  // else redirect them to the sign-in page
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;