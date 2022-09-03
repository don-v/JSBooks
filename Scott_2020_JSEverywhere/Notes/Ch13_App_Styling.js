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
rule obsolete. This is such a simple idea, but it has resulted in
dozens of patterns and techniques to aid in avoiding its pitfalls.

CSS structural techniques such as BEM (block element modifier),
OOCSS (object-oriented CSS), and Atomic CSS use prescriptive class
naming to help scope styles.  Preprocessors such as SASS (syntactically
awesome stylesheets) and 'Less' (leaner stylesheets) provide tooling 
simplifies the CSS syntax and enables modular files. Though these 
each have their merits, CSS-in-JavaScript provides a compelling use
case for developing 'React' or other 'JavaScript'-driven
applications.

> sidebar: WHAT ABOUT CSS FRAMEWORKS? -- CSS and UI frameworks are a 
popular option for developing an application, with good reason. They
present a solid style baseline and reduce the amount of code that a
developer needs to write by providing styles and functionality for 
common application patterns. The tradeoffs are that applications using
these frameworks may become visually similar and can increase the file
bundle size.  That tradeoff may be worthwhile to you, however. Some
of teach's personal favorite UI frameworks for working with 'React'
are:
'Ant Design': https://ant.design/

'Bootstrap': https://getbootstrap.com/

'Grommet': https://v2.grommet.io/

'Rebass': https://rebassjs.org/

// CSS-in-JSS

When teach first encountered CSS-in-JS, teach's initial reaction was
horror! Teach spent the formative years of his web dev career in the 
web standards era. I continue to advocate for accessibility and 
sensible progressive enhancement for web development. "Separation of
concerns" has been a core tenant of my web practices for over a 
decade. so, if you're like me and simply reading "CSS-in-JS" makes you
feel dirty, your'e not alone. However, I was quickly won over once I 
gave it a proper (and judgment-free) try. CSS-in-JS makes it easy to 
think of our user-interfaces as a series of components, something that
teach had been trying to do with a combination of structure techniques
and CSS preprocessors for years.

In this book we'll be using Styled Components...:
https://styled-components.com/
...as our CSS-in-JS library. It is fast, flexible, under active 
development, and the most popular CSS-in-JS library. It's also used by
companies such as Airbnb, Reddit, Patreon, Lego, BBC News, Altassian, 
and many more.

the Styled Components library works by allowing us to define the
styles of an element using JavaScript's tempalte literal syntax. We
create a JS variable that will refer to an HTML element and its
associated styles. Since that sounds fairly abstract, let's take a 
look at a simple example:

```
import React from 'react';
import styled from 'styled-components';

const AlertParagraph = styled.p`
  color: green;
`;

const ErrorParagraph = styled.p`
  color: red;
`;

const Example = () => {
  return (
    <div>
      <AlertParagrph>This is green.</AlertParagrph>
      <ErrorParagraph>This is red.</ErrorParagraph>
    </div>
  );
};

export default Example;
```

As one can see, we can easily scope styles. Additionally, we
are scoping our style to that specific component. This helps
us to avoid class name collisions across different parts of 
our application.

// Creating a Button Component

Now that we have a basic understanding of styled components,
let's integrate them into our application. To being with, 
we'll write some styles for a 'button' element, which will 
allow us to reuse the component throughout our application. In
the previous example, we integrated our styles alongside
our 'React/JSX' code, but we can also write standalone styled
components. To begin, create a new file at 
'src/components/Button.js', import the `styled` library from
`styled-components`, and set up the exportable component as a 
template literal like so:

With the component in place, we can fill it in with some styles.
Add some baseline button styles as well as hover and active state
styles as follows:

```
import styled from 'styled-components';

const Button = styled.button`
    display: block;
    padding: 10px;
    border: none;
    broder-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #0077cc;
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }

    :active {
        background-color: #005fa3;
    }
`;

export default Button;
```

Now we can useo your button throughout our application.

Now we can use our button throughout our application. For
example, to us it on the application's home page, we could 
import the component and use the 'Button' tag anywhere we
would otherwise use 'button'.

We can update our '/src/pages/home.js' as follows:

```
import React from 'react';

import Button from '../components/Button';

const Home = () => {
  return (
    <div>
      <p>This is the home page</p>
      <Button>Click me!</Button>
    </div>
  );
};

export default Home;
```

With this, we've written a styled component that we
can use anywhere in our application. This is great for 
maintainability, as we can easily find our styles and 
change them across our codebase. Additionally, we can 
couple styled components with markup, allowing us to
create small, resusable, and maintainable components. 

// ADDING GLOBAL STYLES

Though many of our styles will be contained within individual 
components, every site or application also has a set of
global styles (things like CSS resets, fonts, and baseline
colors) We can create a `GlobalStyle.js` component to house
these styles.

# HERE -- p. 127!

*/