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

## WARNINGS AND ERRORS:

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
source map-related issues. ...

<!-- HERE -- p. 217! -->
