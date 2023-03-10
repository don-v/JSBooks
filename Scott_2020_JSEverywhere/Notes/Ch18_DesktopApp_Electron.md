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

with this in place, we are ready to run our desktop application
locally. In our terminal, from our project's directory, we
need to run:

```
npm start
```

it worked!, the command ran `electron src/index.js`, launching
a development environment version of our application!

## macOS Application Window Details

macOS handles application windows differently from Windows. When
a user clicks the "close window" button, the application window
cloases, but the application itself does not quit. Clicking the 
application's icon in the macOS dock will re-open the application 
window. Electron allows us to implement this functionality. 
Add the following to the bottom of the `src/index.js` file:

```JavaScript

// quit when all windows are closed.
app.on('window-all-closed', () => {
  // on macOS only quit when a user explicitly quits the application
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // on macOS, re-create the window when the icon is clicked in the dock
  if (window === null) {
    createWindow();
  }
});

```

With this added, one can see these changes by quitting the application
and rerunning it with the `npm start` command. Now, if a user is 
accessing our application with 'macOS', they will see the expected
behavior when closing a window.

### DEVELOPER TOOLS

Since Electron is based on the Chromium browser engine (the engine behind
Chorme, Microsoft Edge, Opera, and many other browsers), it also give us
access to Chromium's Developer Toos. This allows us to perform all of the
same JS debugging that we might do in a browser environment. Let's check if
our application is in development mode, and if so, automatically open dev
tools when the app launches. 

To perform this check, we'll use the 
`electron-util` library
(`https://www.electronjs.org/docs/latest/api/utility-process`); This is 
a small collection of utilities that will allow us to easily check 
system conditions and simlifies boilerplate code for common Electron
pattterns. For now, we'll be making use of the `is` module, which will
allow use to check if our application is in development mode:

At the top of our `/src/index.js` file, import the module:

```JavaScript

const { is }  = require('electron-util');

```

Now, in our application code, we can add the following the following
on the line below `window.loadFile(index.html)`, where we load our HTML
file, which will open the development tools when the application is 
in a development environment.

```JavaScript

// if in development mode, open the browser dev tools
if (is.development) {
  window.webContents.openDevTools();
}

```

> **8ELECTRON SECURITY WARNING**: One may notice that our Electron app
currently displays a security warning related to an insecure Content
Security Policy (CSP). We will address this warning in the next chapter.

With easy access to the browser dev toosl, we are well prepared to 
develop a client application!

### THE ELECTRON API

One of the advantages of desktop development is that, through the 
Electron API, we gain access to operating system-level features that
are rightfully unavailable in a web browser environment, including:

* Notifications
* Native file drag an drop
* macOS Dark Mode
* Custom menus
* Robust keyboard shortcuts
* System dialogs
* The application tray
* System information

As one can imagine, these options allow us to add some unique features
and improved user experiences to our desktop clients. We don't be using
these in our simple sample application, but it is worth familiarizing 
yourself with them. Electorn's documentation 
(`https://electronjs.org/docs`) provides detailed examples of each of 
Electron's APIs. Additionally, the Electron team has created 
`electron-api-demos`, a full functioning Electron application that 
demonstrates many of the unique features of the Electron API.

### CONSLUSION

In this chapter, we've explored the basics of using Electron to build
desktop applications with web technologies. The Electron environment 
offers us, as developers, an opportunity to provide  cross-platform
desktop experience to users without learning the intracacies of 
multiple programming languages and operating systems. Armed with the
simple setup we've explored in this chapter and knowledge of web
development, we are well prepared to build robust desktop applications.
In next chapter, we'll look at how we can incorporate an existing
web application into an Electron shell!
