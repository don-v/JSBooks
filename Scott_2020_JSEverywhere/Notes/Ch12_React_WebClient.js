/* 
https://github.com/javascripteverywhere

// CHAPTER 12: BUILDING A WEB CLIENT WITH REACT

The original idea behind hypertext was to take related documents and link
them together: if academic paper A references academic paper B let's make
it easy to click something and navigate between them. In 1989, a software 
engineer at CERN named Tim Berners-Lee had the idea to combine hypertext with 
networked computers, making it easy for someone to make these connections 
regardless of the locaiton of the documents. 

At its heart, the web remaines a medium for linking documents together. 
Each page is HTML, rendered in a web browser, with CSS  for styling and
JS for enhancements. Today, we use these technologies to build everything
from personal blogs and small brochure sites to complex interactive
applicaitons. the underlying advantage is that the web provides universal
access.  All anyone needs is a web browser on a web-connected device,
creating an inclusive-by-default environment.

// WHAT WE WILL BUILD WITH TEACH!

In the upcoming chapters we'll build the web client for our social
note application, Notedly. Users will be able to create and sign
in to an account, write notes in Markdown, edit their notes, view a
feed of other users' notes, and 'favorite' other users' notes. To
accomplish all of this, we will be interacting with out GraphQL
server API.

In our web application, users will be able to:

* create notes, as well as read, update, and delete notes they've created!

* view a feed of notes created by users, and read individual notes created
by others, though they will not be able to update or delete them!

* craete an account, log in, and log out

* favorite the notes of other users as well as retrieve a list of
their favorites

These features will cover a lot of ground, but teach will deliver them through
small chunks throghout this portion of the book. One one has learned to
build a React application with all of these features, one'll be able to apply
the tools and techniques toward building all sorts of rich web applications.

// HOW WE WILL BUILD THIS

Teach will use React as a client-side JS library. Additionally, data will
be queried from our GraphQL API. To aide in qquerying, mutating, and caching
data, we'll make use of the 'Apollo Client':

https://www.apollographql.com/docs/react/

Apollo client comprises a collection of open source tools for working with
GraphQL. We'll be using the React version of the library, but the team at
Apollo has also developed Angular, Vue, Scala.js, Native iOS, and
Native Android integrations.

> WISDOM: While we'll be using Apollo in this book, it is far from the only
GraphQL client option available. Facebook's 'Relay':
https://relay.dev/

and Formiddable's urql:
https://formidable.com/open-source/urql/docs/api/urql/

are two popular alternatives!

Additionally, we'll be using 'Parcel':
https://parceljs.org/

as our code bundler. A code bundler allows allows us to write
JS using features that may not be available in a web browser
(e.g., new language features, code modules, minificaiton) and
packages them for use in the browser environment. Parcel is a 
configuration-free alternative to application build tools like
Webpack:

https://webpack.js.org

It offers a lof of nice features such as code splitting and
automatically updating the browser during development (aka 
_hot module replacement_), but without the need to set up a
build chain. As teach demonstrated in the previous chapter,
`create-react-app` also offers a zero-configuration initial
setup, using Webpack behind the scenes, but Parcel allows
one to build one's application from the ground up, in a wasy
that teach feels is idea lfor learning. 

// GETTING STARTED

the code for this section of the book is located at:
`
https://github.com/javascripteverywhere/web
`

The repo contains all of the scripts and refs to 3rd-party
libraries that will be needt to develop our application. 

Teach creates and installs the app inside of a 'notedly'
directory:

```
cd notedly
git clone git@github.com:javascripteverywhere/web.git
cd web
npm install
```

> INSTALLING THIRD-PARTY DEPENDENCIES: By making a copy of the book's
starter code and running `npm install` in the directory, one avoids
having to run `npm install` again to install any of the individual
third-party dependencies.

code structure:

'/src/': this is the directory inside which we will perfor our dev
as we follow learn from teach!

'/solutions': this dir contains the solutions for each chapter. If 
one gets stuck, these are available for consultation.

'/final': now that the code is on our local machine, one'll need to
make a copy of the project's '.env' file. This file is a place to keep
the variables unique to the environment we are working in. 

For example, when working locally, we'll be pointing to a local instance
ofo ur API, but when we deploy our app we'll point to our remotely
deployed API. To make a copy of the sample .env file, type the following
into the temrinal, from withn the 'web' directory:

```
cp .env.example .env
```

One will now see the '.env' file in our project's root directory!
One doesn't need to do anything with this file, but w'ell be adding
information ot it as we progress through the development of our API
backend. The .gitignore file inlcuded with the project will ensure 
that one does not inadvertently commit one's '.env' file!

> WARNING: 'Help, I don't see the '.env' file!' -- By default, 
OS hide files that start with a period, as these are typically
used by the system, not end users. If one doesn't seethe '.env'
file, try opening the diectory in one's text editor. The file should
be visible in teh file explorer of your editor. Alternatively,
for macOS/Linus terminals, one can use the command `'ls -a` into
one's terminal window which will list the files in the current
wd.

// BUILDING OUT THE WEB APPLICATION

With our starter code cloned locally, we're ready to build our
our React web application. Let's first take a look at our 
'/src/index.html' file. This looks like the a standard, yet 
completely empty, HTML file: 

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
    <title>Notedly</title>
  </head>

  <body>
    <div id="root"></div>
    <script src="./App.js"></script>
  </body>
</html>
```

, but note the following 2 lines:

```
    <div id="root"></div>
    <script src="./App.js"></script>
```

These 2 lines are incredibly important to our React 
application. The 'div' element with a `root` 'id'
attribute will provide the container for our entire
application. Meanwhile, the 'App.js' file will be 
the entry-point to our JS application. 

Now, we can begin to dev our React application in our
'src/App.js' file. If one followed along with the React
introduction in the previous chapter, this may all feel
familiar. In '/src/App.js' we begin by importing the 
`react` and `react-dom` libraries:

```
import React from 'react';
import ReactDOM from 'react-dom';
```

Now we will create a function, named `App`, that will
return the contents of our application. For now, this
will simply be two lines of HTML contained within
a 'div' element:

```
const App = () => {
  return (
    <div>
    <h1>Hello Notedly!</h1>
    <p>Welcome to the Notedly application</p>
    </div>
  );
};
```

> WISDOM: What's with all the divs?: If one is just
starting out with 'React', one may wonder about the
tendency to surround components with 'div' tags. 
'React' components must be contained within a parent
element, which often is a 'div' tag,, but could also
be any other appropriate HTML tag such as 'section',
'header', or 'nav'. If a containing HTML tag feels
extraneous, we can instead use `<React.Fragment>` or
empty `<>` tags to contain the component in our JS 
code!

Finally, we instruct 'React' to render our application
within the element with an ID of `root` by adding the
following:

```
ReactDom.render(<App />, document.getElementById('root'));
```

The full content of our '/src/App.js' file should now be:

```
import React from 'react';
import { ReactDOM } from 'react-dom';

const App = () => {
    return (
      <div>
        <h1>Hello Notedly!</h1>
        <p>Welcome to the Notedly application</p>
      </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

With this complete, let's take a look in our web browser. We
start the local dev server with the following command:

```
npm run dev
```

in ther terminal application. Once the code is bundled, we
visit `http://loclhost:1234` to view the page. 

// ROUTING

One of the defining features of the web is being able to link
documents together. Similarly, for our app we'll want to be able
to navigate between screens or pages. In an HtML rendered
applicaiton, this would involve creating multple HTML documents. 
Whenever a user navigates to a new document, the entire document
will reload, even if there are shared aspects, such as a header
or footer, on the two pages. 

In JS applictions one can make use of client-side routing. In 
manyways, this will be similar to HTML linking. A user will
click a link, the URL will update, and they will navigate to a
new screen.  The difference is that our application will only
update the page with the content that has changed. The experience
will be smooth and "app-like," meaning that there will not be 
a visible refresh of the page. 

In React, the most commonly used routing library is a React
Router. This library enables us to add routing capabilities to
React web applications. To introduce routing to our application,
let's first create a '/src/pages' directory and add the following
files:

'/src/pages/index.js'
'/src/pages/home.js'
'/src/pages/mynotes.js'
'/src/pages/favorites.js'

Our '/src/pages/home.js', '/src/pages/mynotes.js', and 
'/src/pages/favorites.js' files will be our individual page
components. We can create each of them with some initial 
content and an `effect` hook, which will update the document
title when a user navigates to the page!

in our '/src/pages/home.js', we populate the following:

```
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Notedly</h1>
      <p>This is the home page</p>
    </div>
  );
};

export default Home;
```

now we will update our '/src/pages/mynotes.js' file:

```
import React, { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes - Notedly';
  });

    return (
    <div>
      <h1>Notedly</h1>
      <p>These are my notes</p>
    </div>
  );

};

export default MyNotes;
```

In '/src/pages/favorites.js':

```
import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites - Notedly';
  });

    return (
    <div>
      <h1>Notedly</h1>
      <p>These are my favorites</p>
    </div>
  );

};

export default Favorites;
```

> WISDOM: 'useEffect' -- In the preceding examples we're using
'React''s `useEffect` hook to set the title of the page. Effect
hooks allow us to include side effects in our components, updating
something that is not related to the component itself. If one is 
interested, React's docs provides a deep dive into effect
hooks:
https://reactjs.org/docs/hooks-effect.html

Now, in '/src/pages/index.js', we'll import 'React Router' and
the methods necessary for web browser routing with the
'react-router-dom' package:

```
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
```

Next, we bring in the page components we just created!

```
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
```

Finally, we'll designate each of the page components that we created
as routes with a specific URL. Note the use of `exact` for our "Home"
route, which will ensure the home component is rendered only for the
root URL.

```
const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/mynotes" component={MyNotes} />
      <Route path="/favorites" component={Favorites}/>
    </Router>
  );
};

export default Pages;
```

the complete file now looks as follows:

```
// import React and routing dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

// define routes
const Pages = () => {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/mynotes" component={MyNotes} />
        <Route path="/favorites" component={Favorites}/>
      </Router>
    );
  };
  
  export default Pages;
```

Finallyl, we can update the '/src/App.js'file to use our routes
by importing the routes and rendering the components

```
import React from 'react';
import ReactDOM from 'react-dom';

// import routes
import Pages from '/pages';

const App = () => {
  return (
    <div>
      <Pages />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Now if one manually updates the URL in your web browser, one should
be able to view each component. For example, type 
`http://localhost:1234/favorites to render the 'favorites' pages.

// LINKING

We've created our pages, but we're missing the key component of linking
them together. So let's add some links to the other pages from our home
page. To do so, we'll use 'React Router's `Link` component.

in '/src/pages/home.js' we update the code as follows:

```
import React from 'react';
// import the `Link` component from react-router
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Notedly</h1>
      <p>This is the home page</p>
    /* adda list of links *
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
```

With this we're able to navigate our application. Clicking one of the
links on the home page will navigate to the corresponding page 
component. Core browser navigation functions, such as teh back
and forward buttons, will continue to work as well!

// UI COMPONENTS

So far we've successfully created individual page components and 
can navigate between them. As we build our our pages, they will have
several shared user interface elements, such as a header and 
sitewide navigation. Rewriting these each time they are used 
wouldn't be very efficient (and would get quite annoying). Instead,
we can write resusable interface components and import them into our
interface wherever we need them. In fact, thinking of our UI as
composed of tiny components is one of the core tenants of 'React',
and was my breakthrough in grasping the framework.

We'll start by creating header and navigation components for our
application. First let's create a new directory within our _src_
directory called _components_. within the '/src/components/' 
directory, we'll create two new files called 'Header.js' and 
'Navigation.js'. 'React' components must be capitalized, so we'll
follow the common convention of capitalizing the filename as well.

Let's begin by writing the header component in 
'/src/components/Header.js'. To do so, we'll import our 'logo.svg'
file and add the corresponding markup for our compoennt:

```
import React from 'react';
import logo from '../img/logo.svg';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Notedly Logo" height="40" />
      <h1>Notedly</h1>
    </header>
  );
};

export default Header;
```

For our navigation component we'll import 'React Router''s
`Link` functionality and mark up an unordered list of links.
We input the following in '/src/components/Navigation.js':

```
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
          <li>
              <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/mynotes">My Notes</Link>
          </li>
          <li>
              <Link to="/favorites">Favorites</Link>
          </li>
      </ul>
    </nav>
  );
};

export default Navigation;
```

# HERE -- p. 119!

*/