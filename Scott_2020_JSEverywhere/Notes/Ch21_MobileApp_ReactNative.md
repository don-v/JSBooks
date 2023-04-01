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

<!-- HERE -- p. 231! -->