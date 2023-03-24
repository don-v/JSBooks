# CHAPTER 20: ELECTRON DEPLOYMENT

Presently, to run our application, we need to type a prompt in our terminal
application to start the Electron process. In this chapter, we'll look at how
we can bundle our application for distribution. To achieve this, we'll be
using the popular Electron Builder (`https://www.electron.build`) library, 
which will help us package and distribute our application to our users!

## ELECTRON BUILDER

Electron Builder is a library designed to simplify the packaging and 
distribution of Electron and Proton Native (`https://proton-native.js.org`)
applications. While there are other packaging solutions, Electron
Builder simplifies a number of pain points associated with application
distribution, including:

* Code signing
* Multiplatform distribution targets
* Autoupdates
* Distribution

It offers a great blaance between flexibility and features. Additionally, 
though we won't be making use of them, there are several Electron Builder
boilerplates for 

* Webpack (`https://oreil.ly/faYta`)
* React (`https://oreil.ly/qli_e`)
* Vue (`https://oreil.ly/9QY2W`)
* Vanilla (`https://oreil.ly/uJo7e`)

> **Electron Builder Versus Electron Forge**: Electron Forge
(`https://www.electronforge.io`) is another popular library that offers
many similar features to Electron Builder. A primary advantage of Electron
forge is that it is based on official Electron libraries, while Electron
Builder is an independent build tool. This means that users benefit
from the growth of the Electron ecosystem. The downside is that Electron
Forge is based on a much more rigid application setup. For the purposes
of this book, Electron Builder provides the right balance of features
and learning opportunities, but teach encorages us to take a look at
Electron Forge as well!

### CONFIGURING ELECTRON BUILDER

All of the configuration of Electron Builder will take place in our 
application's _package.json_ file. In that file, we can see that 
`electron-builder` is already listed as a development dependency. Within
the _package.json_ file, we can include a key called "build", which will
contain all of the instructions to Electron Builder for packaging our 
app. To begin, we will include two fields:

* `appId`: This is a unique identifier for our application. macOS calls the 
concept `CFBundle Identifier` (`https://oreil.ly/OOg1O`) and Windows terms it 
the `AppUserModelID` (`https://oreil.ly/mr9si`). The standard is to use the 
reverse DNS format. For example, if we run a company with a domain of 
_jseverywhere.io_ and build an application named Notedly, the ID would be
`io.jseverywhere.notedly`.

* `productName`:  This is the human-readable version of our product's 
name, as teh `package.json name` field requrires hyphenated or single-
word names!

All together, our beginning build configuration will appear as follows:

```json
"build": {
    "appId": "io.jseverywhere.notedly",
    "productName": "Notedly"
},
```

Electron Builder provides us with many configuration options, several 
of which we'll be exploring throughout this chapter. For the complete
list, visit the Electron Builder docs (`https://oreil.ly/ESAx-`)

### BUILD FOR OUR CURRENT PLATFORM

With our minimal configuration in place, we can create our first 
application build. By default, Electron Builder will produce a build
for the system we are developing on. For example, since teach is writing
this on a MacBook, teach's build will default to `macOS`.

Let's first add two script to our `package.json` file, which will be
responsible for application builds. first, a `pack` script will generate
a package directory, without fully packaging the app....

<!-- HERE -- p. 225! -->