# CHAPTER 17: DEPLOYING A WEB APPLICATION

When teach began web development, 'deployment' meant 
uploading files from local machine to a web server through
an FTP client.

There were no build steps or pipelines, meaning that the 
raw files on teach's machine were the same as those on the
web server. If something went wrong, teach would either
frantically try to fix the issue or roll back the change
by replacing it with copies of the old files. This wild
west approach worked OK at the time, but also led to a lot
of site downtime and unexpected issues.

In today's web development, the needs of our local development
environment and our web servers are quite different. On teach's
local machine, teach wants to see instant changes when teach
updates a file and have uncompressed files for debugging. On 
teach's web server, teach only expects to see changes when
he deploys them, and values small file sizes. In this chapter,
we'll look at one way that we can deploy a static application
to the web.

## STATIC WEBSITES

A web browser parses HTML, CSS, and JS to generate the web
pages that we interact with. Unlike frameworks such as Express,
Rails, and Django, which generate the markup for a page 
server-side at the time of the request, static websites are
simply a collection of HTML, CSS, and JS stored on a server.
This can range in complexity from a single HTML file containing
markup to complicated frontend build processes that compile 
templating languages, multiple JS files, and CSS pre-processors.
In the end, however, static websites are a collection of those
three file types. 

Our application, 'Notedly', is a static web application. It 
contains some markup, CSS, and JS. Our build tool, Parcel...:
`https://parceljs.org` ...,
compliles the components that we write into files usable by 
the browser. In local development, we run a web server and 
these files are updated on the using 'Parcel''s hot module
replacement feature. If we look at our 'package.json' file, 
you'll see that I've included two `deploy` scripts:

```
"scripts": {
    "deploy:src": "parcel build src/index.html --public-url ./",
    "deploy:final": "parcel build final/index.html --public-url ./"
}
```

To build the application, open your terminal application, `cd` 
into the root of your _web_ directory, which contains the project,
and then run the `build` command:

```
# if you're not already in the web directory, be sure to cd into it
$ cd Project/notedly/web
# build the files form the src directory
$ npm run deploy:src
```

# HERE -- p. 202!

