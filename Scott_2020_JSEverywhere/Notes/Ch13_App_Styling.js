/* CHAPTE 13: STYLING AN APPLICATION

teach argues that style is an important part of human culture (nature).
Clothes not only serve the functional purpose of protecting our bodies,
but also convey information about our culture, social status, interests,
and much more!

A web application is functional without anything beyondthe deafult styles
of the web, but by applying CSS we are able to more clearly communicate 
with out users.

Inthis chapter, we will explore how we can use the 'CSs-in-JS' Styled
Components library to introduce layout and style to our application. This
will allow us to make a more usable and aesthetically pleasing application
within a maintainable, component-based, code structure.

// CREATING A LAYOUT COMPONENT

Many, or in our case all, pages of an application will share a common
layout. for example, all the pages of our application will have a header,
a sidebar, and a content area (Figure 13-1). Rather than import the
shared layout elements within each page component, we can instead create a
component specifically for our layout and wrap each of our page components
within it.

To create our component, we'll begin by creating a new file at 
'/src/components/Layout.js'. Within this file we'll import our
shared components and aly out our content. Our 'React' component
function will receive a property of `children`, which will allow
us to specify where child content will appear in the layout. We'll
also make use of the empty `<React.Fragment>` JSX element to help
avoid extraneous markup.

Let's create our component in '/src/components/Layout.js'

```
import React from 'react';

import Header from './Header';
import Navigation from './Navigation';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <div className="wrapper">
                <Navigation />
                <main>{children}</main>    
            </div>
        </React.Fragment>
    );
};

export default Layout;
```

Now within our '/src/pages/index.js' file, we can wrap our
page components within the newly created `Layout` component
to apply the shared layout to each page:

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

// define routes
const Pages = () => {
    return (
      <Router>
      // Wrap out routes within Layout component  
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/mynotes" component={MyNotes} />
        <Route path="/favorites" component={Favorites}/>
      </Layout>  
      </Router>
    );
  };
  
  export default Pages;
```

The final step is to remove any instance of `<Header>` or `<Navigation>`
within our page components. For example, our '/src/pages/home.js' file
will now have hte following reduced code:

```
import React from 'react';

const Home = () => {
  return (
    <div>
      <p>This is the home page</p>
    </div>
  );
};

export default Home;
```

the updated '/src/pages/mynotes.js' looks as 
follows (removed the 'h1' tag with content 'Notedly'):

```
import React, { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes - Notedly';
  });

    return (
    <div>
      <p>These are my notes</p>
    </div>
  );

};

export default MyNotes;
```

the updated '/src/pages/favorites.js' looks as 
follows (removed the 'h1' tag with content 'Notedly'):

```
import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites - Notedly';
  });

    return (
    <div>
      <p>These are my favorites</p>
    </div>
  );

};

export default Favorites;
```

With this complete, one can view the application in the
browser. As one navigates between the routes, one'll see
our header and navigation links appear on each page. For
now, they are not styled and our page does not have a
visual layout. Let's explore adding styles in the next 
section!

// CSS

Cascading Style Sheets (CSS) are precisely named: they are
a set of rules that sllow us to write styles for the web. The
styles 'cascade,' meaning that the last or most specifically
defined style will be rendered. For example:

```
p {
  color: green
}

p {
  color: red
}
```

This CSS will render all paragraphs red, making the `color: green`
rule obsolete. 

# HERE -- p. 124!

*/