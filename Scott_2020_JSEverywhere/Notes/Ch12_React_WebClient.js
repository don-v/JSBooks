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

# HERE -- p.112!

*/