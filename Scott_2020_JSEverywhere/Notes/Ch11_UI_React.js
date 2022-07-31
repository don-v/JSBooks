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

One of hte most powerful things about React is that one can use
JS directly within our JSX by enclosing it within curly brackets,
`{}`. Let's up date our `App` function to make use of some 
variables:




*/