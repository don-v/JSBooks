/* 
USER INTERFACES AND REACT

In this chapter, we explore we take a brief look at the
history of JS UI development. 

With that background, we then explore React, the
JS library we'll be using the rest of the way!

JS developed in mid-1990s (in 10 days, allegedly); JS provided
an embedded scripting language; allowed devs to add small
interactions to web page that were not possible with HTML
alone!

early, there were issues with cross-browser compatibility
which led to the proliferation of the dev of many browser-
specific libraries!

Mid-2000s, 'jQuery` and 'MooTools' took off; jQuery allowed
devs to write JS with a simple API that worked well across
browsers. Facilitated the ability to remove, add, replace, 
and animate things on web pages!

Around the same time, AJAX (asynchronous JS and XML) came 
on scene; AJAX allowed one to fetch data from a server and
inject it into the page. The combinations of these 2 
technologies provided an ecosystem to create powerful
interactive web applications!

As apps grew, so did need for organization and boilerplate
code! By early 2010s, frameworks like 'Backbone', 'Angular',
and 'Ember' dominated the JS application landscape.

These frameworks imposed application structure, and 
provided code that facilitated the implementation of
common application patterns; These frameworks were
often modeled after the Model, Controller, and View
(MVC) software design pattern. Each framework was 
prescriptive about all of the layers of the web application,
providing a structured ways to handle templating, data,
and user interactions. While this approach had many
benefits, it also meant that the effort of intergrating
new or non-standard technologies could be quite high!

Meanwhile, desktop applications conitnued to be written
in system-specific programming languages. This mean that 
developers and teams were often forced to make either/or
style choices (either a Mac app or a Windows app), (either
as web app or a desktop app); 

Mobile applications were in a similar position; The rise
of responsive web design meant that designers and devs
could create truly incredible sites and applications for
the mobile web browser, but choosing to build a web-only
application locked them out of the mobile platform app 
stores.

Applies' iOS applicaitons were written in Objective-C
(and more recently Swift), while Android relied upon
Java. This meant that the web, consisting of 
HTML, CSS, and JS was the only truly cross-platform
UI environment!

// DECLARATIVE INTERFACES WITH JS

In early 2010s, devs at FB began to face challenges in the
organization, and management of their JS code. In response,
the software engineer Jordan Walke wrote React, inspired
by FB's PHP library, XHP. React differed from other popular
JS frameworks in that it focused solely on the rendering of
the UI. To do this, React took a 'declarative' programming 
approach, meaning that it provides an abstraction that allows
devs to focus on describing what the state of the UI should
be!

With the rise of React, and similar libraries like Vue.js, 
there has been a shift in the way devs write UIs; these
frameowrks provide a means to manage the state of a UI at 
the component level! This approach makes applications
feel smooth and seamless to users, while providing an 
excellent development experience. With tooling such as 
Electron for building desktop apps and 'React Native' for
cross-platform mobile applications, devs and teams are now
able to leverage these paradigms in all of their 
applications!

// JUST ENOUGH REACT

Throughout the remaining chapter, we will rely on the 
'React' library to build out UIs. One does not need to 
have any prior experience with 'React' to follow along.
Still, it may be helpful to get a sens of the syntax before
jumping in. To do this, we'll use `creat-react-app` to
scaffold out a new project. `create-react-app` is a tool
developed by the 'React' team that allows one to quickly
set up a new 'React' project and helpfully abstracts the 
underlying build tooling, such as 'Webpack' and 'Babel'.

In our terminal, application, cd into the 'projects' 
directory and run the following commands, which will create
a new 'React' application in  folder named 'just-enough-react':

```
$ npx create-react-app just-enough-react
cd just-enough-react
```
uninstalled Node v16, and instead installed v14

Running these commands will output a directory in 
`just-enough-react`, which contains all of the project
structure, code dependencies, and development scripts to
build a full-featured application. Start the application
by running:

```
$ npm start
```

we got the following console output:

Compiled successfully!

You can now view just-enough-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://xxx.xxx.x.xx:3000      

Note that the development build is not optimized. 
To create a production build, use npm run build.  

webpack compiled successfully

I was able to access the app from my mobile device
as well!

We can now begin to edit our application by making changes to the
'/src/App.js' file. This file contains our primary React component.
After requiring some dependencies, it consists of a function that 
returns some HTML-like markup:

function App() {
  return (
    // markup is here
  )
}

The markup used within the component is something called JSX. JSX
is an XML based syntax, similar to HTML, which allows one to precisely
describe our UI and couple it with user actions within our JS files!. If
one knows HTML, picking up JSX is a matter of learning a few minor 
differences! 

The big differences in this example is that HTML's `class` property
is replaced by `className` to avoid collisions with JS' native 
class syntax. 

> JSX? Yuck!: If like teach one comes from a web standards background
and a strinct de-coupling of concerns, this may feel very icky. With
more use, one will realize that the coupling of UI logic with rendering
output presents many compelling advantages that may become more 
favorable to oneself over time!

We will begin by customizing our app by removing most of the boilerplate
code and reduce it to a simple "Hello World!":

```
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <p>Hello world!</p>
    </div>
  );
}

export default App;
```

One may notice the enclosing `<div>` tag that wraps all of the
JSX content. Each React UI component must be contained within a 
parent HTML element or use a React fragment, which represents
a non-HTML element container, such as:

```
function App() {
  return (
    <React.Fragment>
      <p>Hello world!</p>
    </React.Fragment>
  );
}
```

One of the most powerful things about React is that one can use
JS directly within our JSX by enclosing it within curly brackets,
`{}`. Let's up date our `App` function to make use of some 
variables:

```
function App() {
  const name = 'Adam';
  const now = String(new Date());
  return (
    <div className="App">
      <p>Hello {name}!</p>
      <p>The current time is {now}</p>
      <p>Two plus two is {2+2}</p>
    </div>
  );
}
```

In the preceding example, one can see that we are 
making use of JS directly in our interface. How cool
is that?!

Another useful feature of React is the ability to turn
each UI feature into its own component. A good rule of 
thumb is if an aspect of the UI behaves in an independent
manner, it should be separated out into its own component.
Let's create a new component. To begin, we create a new
file at '/src/Sparkle.js' and declare a new function:

```
import React from 'react';

function Sparkle() {
  return (
    <div>
    
    </div>
  )
}

export default Sparkle;
```

Now let's add some functionality. Whenever a user clicks a 
button it will add a sparkel emoji to our page. In order to do 
this, we'll import React's `useState` component and define some
initial state for our component, which will be an empty string
(in other words, no sparkle):

```
import React, { useState } from 'react';

function Sparkle() {
  // declare our initial component state
  // this a variable of 'sparkle' which is an empty string
  // we've also defined an 'addSparkle' function, which
  // we'll call in our click handler
  const [sparkle, addSparkle] = useState('')
  return (
    <div>
      <p>{sparkle}</p>
    </div>
  )
}

export default Sparkle;
```

// sidebar: What is State?

State is covered in more detail in Chapter 15, but for now it may
be helpful to know that the _state_ of a component represents
the current status of any information that may change within
the component. For example, if a UI component has a checkbox,
it has a state of `true` when checked and `false` when not checked.

// BACK TO SPARKLE COMPONENT!

Now we can complete our component by adding a button with
`onClick` functionality. Note the camel casing, which is required
within JSX:

```
import React, { useState } from 'react';

function Sparkle() {
  // declare our initial component state
  // this a variable of 'sparkle' which is an empty string
  // we've also defined an 'addSparkle' function, which
  // we'll call in our click handler
  const [sparkle, addSparkle] = useState('')
  return (
    <div>
      <button onClick={() => addSparkle(sparkle + '\u2728')}>
        Add some sparkle
      </button>
      <p>{sparkle}</p>
    </div>
  )
}

export default Sparkle;
```

To use our component we can import it into our
'src/App.js' file and declare it as a JSX element
as follows:

```
import React from 'react';
import './App.css';

// import our Sparkle component
import Sparkle from './Sparkle'

function App() {
  const name = 'Adam';
  let now = String(new Date());
  return (
    <div className="App">
      <p>Hello {name}!</p>
      <p>The current time is {now}</p>
      <p>Two plus two is {2+2}</p>
      <Sparkle />
    </div>
  );
}

export default App;
```

Now when we visit our application in the browser, 
we see the 'Add some sparkle' button on the page;
and when we click the button, 'sparkle' emojis
appear on the page!

This example demonstrates one of the true super-
powers of react! We're able to re-render individual
componenets, or elements of components, in isolation
from the rest of our application!

We have now created a new application using 
`create-react-app`, updated our `App` component's
JSX, created a new component `Sparkle`, and 
dynamically updated a component. With a basic 
understanding of these fundamentals, we are now prepared
to develop declarative UIs in JS using React!

// CONCLUSION

We are surrounded by user interface across a wide variety
of devices. JS and web technologies present an unparalleled
opportunity to develop these interfaces across the multitude
of platforms, using a single set of technologies. Meanwhile,
React and other declarative view libraries allow us to build
powerful, dynamic applications. 

The combination of these technologies enables developers to
build amazing things without requiring specialized knowledge
for each platform. In the coming chapters, we'll put
this into practice by utilizing a GraphQL API to build 
interfaces for web, desktop, and nativem mobile applications!

*/