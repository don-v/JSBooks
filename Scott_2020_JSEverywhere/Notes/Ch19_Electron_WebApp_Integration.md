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

Now, replace...

<!-- HERE -- p. 216! -->
