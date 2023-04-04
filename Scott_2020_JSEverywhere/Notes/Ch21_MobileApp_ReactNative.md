# CHAPTER 21: MOBILE APPLICATIONS WITH REACT NATIVE

`https://github.com/javascripteverywhere`

Modern mobile app dev is splintered across the Apple iOS and 
Android platforms, each using a different programming
language and toolchain.

JS allows us devs to write cross-platform mobile apps. In this
chapter, teach will introduce the 'React Native' library, as
well as the 'Expo' tool chain. We'll also clone the sample project
code, which we'll be building upon over the next few chapters!

## WHAT WE'RE BUILDING

Over the next few chapters we'll build a mobile client for our
social note application, Notedly. The goal is to use JS and 
web technologies to develop an application a user can install
on their mobile device. We'll be implementing a subset of 
features so as to avoid too much repetition from the web 
application chapters. Specifically, our application will:

* Work on both iOS and Android operating systems

* Load a note feed and individual user notes from our GraphQL API

* Use CSS and styled components for styling

* Perform standard and dynamic routing

These features will provide a solid overview of the core concepts 
of developing a mobile application with React Native. Before we
get started, we will review the technologies we will be using
to build our mobile application!

## HOW WE'RE GOING TO BUILD THIS

'React Native' is the core technology that we will be using to 
develop our application. 'React Native' allows us to write 
applications in JS, using 'React', and render them for the native
mobile platform. This means that to users, there is no discernable
difference between a React Native aplication and one written in 
the platform's programming langugae. This is React Native's key
advantage over other popular web technology-based mobile frameworks,
which traditionally wrapped a web view withn an application shell.
'React Native' has been used to deveoop apps by Facebook, Instagram,
Bloomberg, Tesla, Skype, Walmart, Pinterest, and many others. 

The second key piece of our application development workflow is
'Expo', a set of tools and services that simplify React Native
development through really useful features such as on-device 
previews, application builds, and extending the core 'React
Native' library. Before getting with our development, teach
recommends that one does the following:

1. Visit _expo.io_ and create an Expo account.

2. Install the Expo command-line tools with the following command:
`npm install expo-cli --global` into your terminal application.

3. Sign in to one's Expo account locally by typing `expo login` in
your terminal application.

4. Install the Expo Client application for your mobile device. Links
to the Expo client iOS and Android app can be found at _expo.io/tools_.

5. Sign in to to one's account in the Expo Client application.

Finally, we will again use Apollo Client (`https://oreil.ly/xR622T`)
to interact with data from our GraphQL API. Apollo Client comprises
a collection of open source tools for working with GraphQL.

## GETTNIG STARTED

Before we can start development, one'll need to make copy the 
project starter files to one's machine. the project's source code
(`https://github.com/javascripteverywhere/moble`) contains all the 
scripts and references to third-party libraries that we will need
to develop our application. To clone the code to your local machine,
open the terminal, navigate to the directory where one keeps one's
projects, and `git clone` the project repo. If one has worked through
the API, web, and /or desktop chapters, one may have already 
created a `notedly` directory to keep the project code organized:

```sh
cd Projects
# type the `mkdir notedly` command if one does not not yet
# have a notedly directory
cd notedly
git clone git@github.com:javascripteverywhere/mobile.git
cd mobile
npm install
```

> **INSTALLING THRID-PARTY DEPENDENCIES**: By making a copy of the 
book's starter code and running `npm install` in the directory, one 
avoids having to agin run `npm install` for any of the individual
third-party dependencies.

The code structure is as follows:

* _/src_: This is the directory where one should perform one's development
as one follows along with the book.

* _/solutions_: This directory contains the solutions for each chapter. 
If one gts stuck, these are available for you to consult.

* _/final_: This directory contains the final working project.

The remaining files and project setup match the standard output of the 
`expo-cli` 'React Native' generator, which  one can run by typing 
`expo init` in one's terminal!

> **App.js**: ...

Because of the way that Expo's build chain works, the _App.js_ file
in the root of the project directory is typically the application's
point of entry. To standardize our mobile project with the code found in
the rest of the book, the _App.js_ file isued only as a reference to a 
_/src/Main.js_ file.

Now that we have the code on our local machiens and our dependencies 
installed, let's run the app. To start the application, in one's
terminal application, type use the `npm start` command.

This will open Expo's "Metro Bundler" web application on a local port in
one's browser. From here, one can launch a local device simulator by 
clicking "Run on..."

Options include:

```json
[
    'Run on Android device/emulator',
    'Run on iOS simulator',
    'Send link with email...',
    'Publish or republish project...'
]
```

<!-- HERE -- p. 232! -->