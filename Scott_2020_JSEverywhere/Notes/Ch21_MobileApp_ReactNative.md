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
'Expo'...

<!-- HERE -- p. 230! -->