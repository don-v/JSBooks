/*

04/14/2022: START -- Ch03 -- above figure 3-1

We want to build a basic server-side web application to 
serve as the basis for the backend of our API.

We will use 'Express.js' frameowrk (https://expressjs.com), a 
'minimalist web framework for Node.js'

It will be the foundation of our API server; however, Express
can also be used to build fully featured server-side web
applications!

UIs, such as websites and mobiel applicaitons, communicate
with web servers when they need to access data.  This data
could be anything from the HTML required to render a pge in 
a web browser to the resutls of a user's search.  The data
request is sent from the client via HTTP to the web application
that is running on the server.  The web application then processes
the request and returns the data to the client, again
over HTTP!

In this chapter, we build a small server-side web application, 
which will be the basis for our API.  To od this, we'll use
Express.js frameowrk to build a sipmle we application that sends 
a basic request.

HELLO WORLD

Start by opening our 'index.js' file from our 'src' directory!

we enter the following code:

```
const express = require('express');
const app = express()

app.get('/', (req,res) => res.send('Hello World!'));

app.listen(4000, () => console.log('Listening on port 4000!'));
```

In this code, we bring in the functionality of the `express`
package with the `require` function, then create an 
'express' instance named 'app'.

We then use the app object's `get` method to instruct our application
to send a resonse of "Hello World" when a user accesses the
root URL ('/').  Lastely, we instruct our application to run on 
port 4000.  This will allow us to view the application locally at 
the URL 'http://localhost:4000'.

Now to run the application, from the command line, we use the
command:

`node src/index.js`

When we submit this command, we see the following output in the
console:

```
Listening on port 4000!
```

and in the browser, if we open 'localhost:4000', we get
'Hello World' printed to the browser!


// NODEMON

Now, let's say that the output of this example doesn't properly express 
our excitement.  We want to change our code so that it adds an exclamation
mark to our response.  let's update our source to the following:

```
// index.js
// This is the main entry point of our application

const express = require('express');
const app = express()

app.get('/', (req,res) => res.send('Hello World!!!! You the man!'));

app.listen(4000, () => console.log('Listening on port 4000!'));
```

We have to stop our server with `CTRL+C` in the to stop the server. Now
restart it by again typing `node index.js`.  Now, when you navigate
to back to your browser and refresh the page, you should see the 
updated response.

As you can stopping and restargin our server for every change can 
quickly become tedious.  Thankfully, we can use the Node package
`nodemon` to automatically restart the server on changes.  If you take 
a look at the project's 'package.json' file. you will see the 
'dev' property within the 'scripts' object, which instructs `nodemon`
to watch our 'index.js' file:

```
  "scripts": {
    "start": "nodemon src/index.js",
    "dev": "nodemon src/index.js",
    "final": "nodemon final/index.js",
    "seed": "node final/util/seed/index.js",
    ...
},
```

now we to start the terminal, we just have to use the command:

`npm run dev`

from our terminal.  

// EXTENDING PORT OPTIONS

Currently our application is served on port 4000.  This works
great for local development, but we will need the flexiblity to set
this port to a different port number when deploying the application.
Let's take the steps to update this now.  We'll start by adding
a port variables:

`const port = process.env.PORT || 4000;`

This change will allow us to dynamically set the port in the Node 
environment, but fall back to port 4000 when no port is specified!

Now let's adjsut our app.listen code to work with this change use a 
template literal to log the correct port:

```
app.listen(port, () => {
    console.log(`Server running at http://localhost:${4000}`)
});
```

```
const express = require('express');
const app = express()

const port = process.env.PORT || 4000;

app.get('/', (req,res) => res.send('Hello World!!!! You the man!'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}!`));
```

With this, we now have the basics of our web server code up and
running.  To test that everything is working, verify that no errors
present in your console and reload your web browser at 
http://localhost:4000

// CONCLUSION

Server-side web applications are the foundation of API development.
In this chapter, we built a basic web application using the Express.js
framework.  When developing Node-based web applications, you have a 
wide array of frameworks and tools to choose from.  Express.js is a
great choice due to its flexibility, community support, and
maturity as a project.  In the next chapter, we'll turn our web
application into an API.


 */