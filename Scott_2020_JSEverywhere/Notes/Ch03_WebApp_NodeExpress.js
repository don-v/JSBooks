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



 */