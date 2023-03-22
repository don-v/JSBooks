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
many similar features to Electron Builder....

<!-- HERE -- p. 224! -->