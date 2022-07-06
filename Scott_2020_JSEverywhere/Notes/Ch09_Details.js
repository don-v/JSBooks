/*
// CH09: DETAILS

So far, we have a working API, but it's lacking the finishing 
touches that will allows us to put it into production. In this
chapter we'll implement some web and GraphQL application security
and user experience best practices. These details will be critical to 
safety, security, and usability of our application.

// WEB APPLICATION AND EXPRESS.JS BEST PRAX...

Express.js is the underlying web application framework that 
powers our API. We can make a few small tweaks to our Express.js
code to provide a solid basis for our application.

// EXPRESS HELMET

The 'Express Helmet' middleware...:
https://github.com/helmetjs/helmet

... is a collection of small security-minded middleware functions.
These will adjust our application's HTTP headers to be more secure.
While many of these are specific to browser-based applications, 
enabling Helmet is a simple step to protect our application from 
common web vulnerabilities. 

To enable 'Helmet', we'll require the middleware in our application 
and instruct Express ot use it early in our middleware stack. In the 
'/src/index.js' file, add the following:

```
// first require the package at the top of the file
const helmet = require('helmet')

// add the middleware at the top of the stack, after `const app = express()`
app.use(helmet());
```

By adding the 'Helmet' middleware, we're quickly enabling common
web security best practices for our application.

// CROSS-ORIGIN RESOURCE SHARING

Cross-Origin Resource Sharing (CORS) is the means by which we allow
resources to be requested from another domain.  Because our API and
UI code will live separately, we'll want to enable credentials from
other origins. If you're interested in learing the ins and outs of 
'CORS', teach highly recommends the 'Mozilla CORS guide'...:
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

... To enable CORS, we'll use the Express.js CORS middleware...:
https://expressjs.com/en/resources/middleware/cors.html

# HERE  -- p. 84!

*/