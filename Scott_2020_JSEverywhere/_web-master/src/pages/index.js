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
          <Route path="/mynotes" component={MyNotes} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/note/:id" component={NotePage} />
          {/* within the Pages component add the route */}
          <Route path="/signup" component={SignUp} />
          {/* add a signin route to our routes list */}
          <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

export default Pages;