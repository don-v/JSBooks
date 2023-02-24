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
the terminal, navigate to the directory ...

<!-- HERE -- p. 208! -->