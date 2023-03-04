# CHAPTER 18: DESKTOP APPLICATIONS WITH ELECTRON

Desktop applications include email clients, text editors, chat
clients, spreadsheet software, music streaming services, among others.

For years, the ability to create these applications felt out of 
reach. Thankfully, today we are able to use web technologies to 
build fully featured desktop applications with a small learning
curve.

## WHAT WE ARE BUILDING

Over the next few chapters, we'll build a desktop client for our 
social note application, Notedly.  Our goal is to use JS and 
web technologies to develop a desktop application that a user can 
download and install on their computer. For now, this application
will be a simple implementation that wraps our web within a 
desktop application shell. Developing our app in this way will allow
us to quickly ship a desktop app to those users who are interested,
while providing us the flexibility to introduce a custom application
for desktop users at a later date.

## HOW WE'RE GOING TO BUILD THIS

To build our application, we'll be using 'Electron' 
(`https://electronjs.org`), an open source framework for building
cross-platform desktop applications with web technologies. It works
by utilizing Node.js and Chrome's underlying browser engine, Chromium.
The means that developers that as devs, we have access to the 
world of the browser, Node.js, and operating-system specific abilities
which are typically unavailable in a web environment. Electron was 
originally developed by Github for the Atom text editor, 
(`https://atom.io`), but has been used as a platform for applications
both big and small, including Slack, VS Code, Discord, and WordPress
Desktop!

## GETTING STARTED

Before we can start development, we need to make a copy of the project
starter files to our machine. The project's source code at
()`https://github.com/javascripteverywhere/desktop`) contains all of the
script an dreferences to third-party libraries that we will need to 
develop our application. To clone the code to our local machine, open
the terminal, navigate to the directory where you keep your projects, and
`git clone` teh  project repository. If one has worked with the 'API',
and 'web' chapters, one may also have already created a _notedly_
directly to keep the project code organized:

```sh
$ cd Projects
# type the `mkdir notedly` command if you don't yet have a 
# notedly directory
$ cd notedly
$ git clone git@github.com:javascripteverywhere/desktop.git
$ cd desktop
$ npm install
```

> WISDOM: Installing Third-Party Dependencies -- By making a copy of the book's
starter code and running `npm install` in the directory, one avoids to again 
`run npm install` for any of the individual third-party dependencies.

The code is structured as follows:

* '/src': This is the directory where one should perform one's development
as one follows along with this book.

* '/solutions': This directory contains the solutions for each chapter. If
one gets stucks, these are available for you to consult.

* '/final': This directory contains the final project

With our project directory created and dependencies installed, we are ready
to begin our development.

## OUR FIRST ELECTRON APP

With our repository cloned to our machine, let's develop our first Electron 
app. If one looks within one's _src_ directory, one'll see that there are a
few files. The _index.html_ file contains bare-bones HTML markup. For now, 
this file will serve as Electron's "renderer process," meaning that it will 
be the web page displayed as a window by our Electron applications:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Notedly Desktop</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

The _index.js_ file is where we will set up our Electron application. In
our application, this file will contain what Electron calls the "main
process," which defines the application shell. The main process works
by creating a `BrowserWndow` instance in Electron, which serves as the 
application shell.

> **index.js versus main.js**: Though teach has named the file _index.js_,
to follow the pattern found in the rest of our sample applications, it
is common in Electron development to name the "main process" file 
_main.js_

Let's set up our main process to display a browser window containing 
our HTML page. First, import Electron's `app` and `browserflow` 
functionality in '/src/index.js':

```JavaScript
const { app, BrowserWindow } = require('electron');
```

Now we can define our application's `browserWindow` and define the 
file that our application will load. In '/src/index.js', add the 
following:

```JavaScript
const { app, BrowserWindow } = require('electron');

// to avoid garbage collection, declare the window as a 
// variable

let window;

// specify the details of the browser window
function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load the HTML file
  window.loadFile('index.html');

  // when the window is closed, reset the window object
  window.on('closed', () => {
    window = null;
  });
}

// when electron is ready, create the application window
app.on('ready', createWindow);
```

<!-- HERE -- p. 210, test tomorrow! -->


