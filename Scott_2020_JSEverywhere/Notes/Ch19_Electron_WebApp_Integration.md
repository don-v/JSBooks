# CHAPTER 19: INTEGRATING AN EXISTING WEB APPLICATION WITH ELECTRON

In this chapter, we'll look at how we can take an existing web application
and wrap it in an Electron shell. Before proceeding, one will need a local
copy of our example API and web application. If one has not bee following 
along, one can use Appendixes A and B to execute these!

## INTEGRATING OUR WEB APPLICAITON

In the previous chapter, we set up our Electron application to load an 
_index.html_ file. Alternatively, we can load a specific URL. In our case, 
we'll begin by loading the URL of our localy running web application. First,
be sure that our web app and API are running locally. Then we can update our 
_src/index.js_ file, first by updating the `nodeIntegration` setting in the 
`BrowserWindow` to `false`. This will avoid the security risks of a locally
running node application accessing an external site.

```JavaScript
webPreferences: {
    nodeIntegration: false
}
```

Now, replace. the `window.loadFile('index.html');` line with the following:

```JavaScript
window.loadURL('http://localhost:1234');
```

> **RUNNING THE WEB APPLICATION**: A local instance of our web application will need
to be running on the `1234` port. If one has been following along with the book, 
simply run `npm start` from the root of the `web application` server to start the
development server!

This will instruct 'Electron' to load a URL, rather than a file. Now if one
runs the app with `npm start`, one will see it loaded in a Electron window, with
some caveats! (it worked!)

### WARNINGS AND ERRORS:

The Electron browser developer tools and our terminal currently display a 
large number of warnings and errors. Let's look at each of these 

First, our terminal displays a large number of 
`SyntaxError: Unexpected Token` errors.  Additionally, our developer tools 
show several corresponding warnings stating 
`DevTools failed to parse SourceMap`. These two errors are related to the
way in which `Parcel` generates source maps and Electron reads them. 
Unfortunately, with the combination of technologies that we are using, there
does not seems to be a reasonable fix for this issue. Our best option is to
disable JS source maps. In the application window's developer tools, click
"Settings" and then uncheck "Enable JS source maps".

Now if one quits and restarts the application one will no longer see the 
source map-related issues. This does come with the tradeoff that debugging 
our client-side JavaScript within Electron may be more difficult, but 
thankfully we can still access this feature and our application in our
web browser.

The final two warnings are related to Electron's security. We will address
these before bundling our application for production, but it's worth 
exploring now what these warnings are.

## `Electron Security Warning (Insecure Resources)` 

This warning notifies us that we are loading web resources over an 
_http_ connection. In production, we should always load resources
over _https_ to ensure privacy and security. In development, loading
our localhost over _http_ is not a problem, as we will be referencing
our hosted website, which uses _https_ in the bundled application.

## `Electron Security Warning (Insecure Content-Security-Policy)`

This wwarning informs us that we ahve not yet set a Content Security
Policy (CSP). A CSP allows us to specify which domains our application
is permitted to load resources from, greatly reducing the risk of a
cross-site scripting (XSS) attack. Again, this is not a concern during
local development, but it's important in production. We'll 
be implementing CSP later.

With our errors addressed, we're ready to set up our application's 
configuration file

## CONFIGURATION

When developing locally, we want to be able to run the local version of
our web application, but when bundling the app to be used by others, we
want it to reference the publicly available URL. We can set up a simple
configuration file to handle this.

In our _./src_ directory, we will add a _config.js_ file where we can
store application-specific properties. Teach has included a
_config.exmaple.js_ file, which one can easily copy from the terminal
with the following command:

```sh
cp src/config.example.js src/config.js
```

Now we can fill in the properties of our application:

```JavaScript
const config = {
  LOCAL_WEB_URL: 'http://localhost:1234/',
  PRODUCTION_WEB_URL: 'https://YOUR_DEPLOYED_WEB_APP_URL',
  PRODUCTION_API_URL: 'https://YOUR_DEPLOYED_API_URL'
};

module.exports = config;
```

> **WHY NOT `.env`?**: In our previous environments, we've used
_.env_ files to manage envrionment-specific settings. In this 
instance, we're using a JS configuraiton file because of the way
that Electorn apps bundle their depenencies.

Now in our Electron application's main process, we can use the 
configuration file to specify which URL we would like to load in 
development and production.  In _src/index.js_, first import the 
_config.js_ file:

```JavaScript
const config = require('./config');
```

Now we can update the `loadURL` functionality to load different
URIs for each environment:

```JavaScript
// load the URL
if (is.development) {
    window.loadURL(config.LOCAL_WEB_URL);
} else {
    window.loadURL(config.PRODUCTION_WEB_URL);
}
```

By using a configuration file, we can easily provide Electron
with environment specific settings. 

### CONTENT SECURITY POLICY

<!-- HERE -- p. 219! -->