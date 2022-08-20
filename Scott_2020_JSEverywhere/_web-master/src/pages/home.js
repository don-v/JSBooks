import React from 'react';
// import the `Link` component from react-router
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Notedly</h1>
      <p>This is the home page</p>
      { /* adda list of links */ }
      <ul>
          <li>
              <Link to="/mynotes">My Notes</Link>
          </li>
          <li>
              <Link to="/favorites">Favorites</Link>
          </li>
      </ul>
    </div>
  );
};

export default Home;