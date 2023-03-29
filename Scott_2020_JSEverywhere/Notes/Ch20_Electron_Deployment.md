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
a package directory, without fully packaging the app. This can be useful 
for testing purposes. Second, a `dist` script will package the application
in distributable format, such as a macOS DMG, Windows Inatller, or
DEB package:

```json
"scripts": {
    // add the `pack` and `dist` scripts to the existing `npm` scripts list:
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
}
```

With this change, one can run `npm run dist` in one's terminal application, 
which will package the application in the project's _dist/_ directory. 
Navigating to the _dist/_ directory, one can see that Electron Builder has
packaged the application for distribution for your operating system!

### APP ICONS

One thing that one has likely noteiced is that our application is using the
default Electron app icon. This is fine for local development, but for a 
production application we will want to use our own branding. In our
project's _/resources_ folder, teach has inlcuded some application icons
for both macOS and Windows. To generate these icons from a PNG file, teach
used the 'iConvert Icons application' (`https://iconverticons.com`), which
is available for both macOS and Windows.

In our _/resources_ folder one will see the following files:

* _icon.icns_: the macOS application icon

* _icon.ico_: the Windows application icon

* _icons/_: directory with a series of different-sized _.png_ files, 
used by Linux

Optionally, we could also include background images for the macOS DMG
by adding icons with the names of _background.png_ and 
_background@2x.png_, for retina screens.

Now within our _package.json_ file, we update the `build` object to 
specify the name of the build resource directory:

```json
"build": {
    "appId": "io.jseverywhere.notedly",
    "productName": "Notedly",
    "directories": {
        "buildResources": "resources"
    }
},
```

Now, when we build the application, Electron Builder will package it with
our custom applicaiton icons (see Figure 20-1)

## BUILDING FOR MULTIPLE PLATFORMS

Currently, we're only building our application for the operating for the 
operating sytem that matches our development platform. One of the great
advantages of Electron as a platform is that it allows us to use the same
code to target multiple platforms, by updating our `dist` script. To 
achieve this, Electron Builder makes use of the free and open source 
`electron-build-service` (`https://oreil.lyIEfW`). We'll be using the 
public instance of this serivce, but it is possible to self-host it for 
the organizations seeking additional security and privacy. 

In our `package.json` we update the `dist` script to:

```json
"dist": "electron-builder -mwl"
```

This will result in a build that targets macOS, Windows, and Linux. From
here we can distribute our application by uploading it as a release to 
Github or anywhere that we can distribute files, such as Amazone S3 or
our web server

## CODE SIGNING

Both macOS and Windows include the concept of _code signing_. Code 
signing is a boost for the security and trust of users, as it helps
signify the trusworthiness of the app. Teach says he won't be walking
through the code-signing process, as it is operating system specific and 
comes at a cost to devs. The Electron Builder documentation offers a 
comprehensive article (`https://oriel.ly/g6wEz`) on code signing for
various platforms.

Additionally, the Electron documentation (`https://oreil.ly/Yb4JF`)
offers several resources and links. If one is building a production
application, teach encourages one to furthe research the code-signing
options for macOS and Windows.

## CONCLUSION

We've covered the tip of the iceberg for deploying an Electron application.
In this chapter we used Electron Builder to build our applications. We can
then eaisly upload and dsitribute them through any web host. Once we have
outgrown these needs, we can use Electron Builder to integrate builds into 
a continuous delivery pipeline; auto-matically push releases to GitHub, S3,
or other distribution platforms; and integrate automatic updates into the 
application. If one is interested, these are fantastic next steps to take.