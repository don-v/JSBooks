# CHAPTER 25: MOBILE APPLICATION DISTRIBUTION

In the old days, calculator game distribution occurred by transferring games
over a cord that physically connected two calculators, a source calculator
which had the game already loaded, and a destination calculator, to which
the game would be sent. This distribution method was slow, requiring two 
students to remain connected for several minutes while others waited. Today,
our digital pocket computers are capable of much more than old graphing
calcultors, in part, because one can easily extend their capabilities through
installable third-party applications.

With our initial application dev complete, we can now distribute our application 
so that others may accessi it. In this chapter, we learn to configure our `app.json`
file for distribution. We'll then publish our application publicly with 'Expo'. 
Finally, we generate application packages that can be submitted to the 'Apple' or
'Google Play' stores.

## `app.json` CONFIGURATION

'Expo' applications include an _app.json_ file, which is used to configure 
application-specific settings.

When we generate a new 'Expo' application, an _app.json_ file is automatically
created for us. Let's take a look at the generated fle for our application:

```json
{
    "expo" : {
        "name": "Notedly",
        "slug": "notedly-mobile",
        "description": "An example React Native app",
        "privacy": "public",
        "sdkVersion": "33.0.0",
        "platforms": ["ios", "android"],
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "updates": {
            "fallbackToCacheTimeout": 1500
        },
        "assetBundlePatterns": ["**/*"],
        "ios": {
            "supportsTablet": true
        },
        "android": {}
    }
}
```

Let's review the properties of the JSON object that is
defined in our _app.json_ file:

_name_: The name of our application

_slug_: The URL name for publishing the 'Expo' app at _expo.io/project-owner/slug_

_description_: A description of our project, which will be used when publishing
the application with Expo.

_privacy_: The 'Expo' project's public availablity. This can be set to either
`public` or `unlisted`.

_sdk-Version_: the 'Expop' SDK version number

_platforms_: The platforms we are targeting, which can include `ios`, `android`, and
`web`.

_version_: Our application's version number, which should follow the Semantic 
Versioning standards (`https://semver.org`)

_orientation_: Our application's default orientation, which can be locked with
`portrait` or `landscape` values, or match the user's device rotation with `default`.

_icon_: A path to the application icon, which will be used for both 'iOS' and 'Android'.

_splash_: The image location and settings for the app loading screen.

_updates_: A configuration for how our application should check for over the air
(OTA) updates when the app is loaded. The `fallbackToCacheTimeout` parameter allows
us to specify a length of time in millisconds.

_assetBundlePatterns_: Allows us to specify the location of assets that should be
bundled with our application.

_ios_ and _android_: enable platform-specific settings.

This default configuration provides us with a solid basis for our application. There
are a number of additional settings, which can be found in the 'Expo' documentation
(`https://oreil.ly/XXT4k`).

## ICONS AND APP LOADING SCREENS

The small squarish icons found on our devices have become one of the most recognizable
designs in modern society. If one were to close one's eyes, one might be able to imagine
a dozen of them, down to a logo, or a specific background color. Additionally, when a 
user taps an icon there is an initial static "splash screen", which is displayed while 
the application loads. Up until now, we've ued the default empty 'Expo' icons and splash
screen. We can replace those with custom designs in our application!

Teach included a 'Notedly' icon and splash screen in the _assets/custom_ folder. We can
make use of these by replacing the images in the _assets_ directory with them or updating
our _app.json_ configuration to point to the files in the _custom_ subdirectory.

### APP ICONS

The _icon.png_ file is a square 1024 x 1024px PNG file. If we point to this file with our 
_app.json_ `icon` property, 'Expo' will generate the appropriate icons sizes for various
pplatforms and devices. The image should be exactly square and without any transparent
pixels. This is the simplest and most straightforward way to include an application icon:

```json
{
    "expo" : {
        // more properties
        "icon": "./assets/icon.png",
        // more properties
    }
}
```

In addition to the single cross-platform icon, we have the option to include platform-
specific icons. The main draw of this approach would be to include separate icons styles
for Android and iOS, particularly if one is interested in using 'Android's adaptive'
icons (`https://oreil.ly/vLC3f`).

For iOS, we would continue to use a single 1024x1024 png, in the _app.json_ file:

```json
{
    "ios" : {
        "icon" : "<IMAGE_PATH>"
    }
}
```

To make use of Android's adaptive icon, we would specify a `foregroudImage`, 
a `backgroundColor`, (or `backgroundImage`), and a fallback static `icon`:

```json
{
    "android" : {
        "adaptiveIcon" : {
            "foregroundImage": "<IMAGE_PATH>",
            "backgroundColor": "<HEX_CODE>",
            "icon": "<IMAGE_PATH>"
        }
    }
}
```

for our use case, we can continue to use the single static icon.

### SPLASH SCREENS

The splash screen is a full screen image that will breifly display while
our application is booting on the device. We can replace the default 'Expo'
image with one found in _assets/custom_. Though device sizes vary within 
and across platforms, teach has chosen to use a size of 1242 X 2436, as 
recommended by the 'Expo' documentation (`https://oreil.ly/7a-5J`). 'Expo'
will then resize teh image to work across device screens and aspect ratios.

We can configure our splash screen in the _app.json_ file like so:

```json
{
    "splash": {
        "image": "./assets/splash.png",
        "backgroundColor": "#ffffff",
        "resizeMode": "contains"
    }
}
```

By default, we are setting a white background color, which may be 
visible as teh image loads, or, depending on our selected `resizeMode`, 
as a border around the splash screen image. We can update this to match
the color of our screen:

```json
{
    "splash": {
        // other attributes
        "backgroundColor": "#4A90E2",
        // other attributes...
    }
}
```

The `resizeMode` dictates how the image should be resized for various screen
sizes. By setting this to `contain`, we preserve the aspect ratio of the
original image. When one uses `contain`, some screen sizes or resolutions will
see the `backgroundColor` as a border around the splash screen image. 
Alternately, we could set `resizeMode` to `cover`, the gradient, let's set our
`resizeMode` to `cover`:

```json
{
    "splash": {
        // other attributes
        "resizeMode": "cover",
        // other attributes...
    }
}
```

With this, our icon and splash screen images are configured (see Figure 25-1).
We are now ready to look at how to distribute our application to make it
accessible to others.

### 'EXPO' PUBLISH

during development, our application is accessible to us in the 'Expo Client'
application on a physical device, over our local area network. This means that 
we can access teh application as long as our development machine and phone are
on the same network. 

'Expo' enables us to publish our project, which uploads the application to an 
'Expo' CDN and gives us a publicly accessible URL. With this, anyone can run our
application through the 'Expo Client'. This can be useful for testing or quick 
application distribution.

To publish our porject, we can click the "Publish or republish project" link in 
the browsers' "Expo Dev Tool" (See Fig 25-2), or type 'expo publish' in our
terminal

Items available in Fig 25-2:

```json
{
    "title": "logged in as ascott1",
    "Name": "notedly",
    "URL slug": "notedly-mobile",
    "github source url (optional)": " ",
    "Description": "The example 'React Native' application for 'JavaScript Everywhere by
                    Adam Scott, published by O'Reilly Media",
    "optimize assets": "true",
    "note": "Once one publishes one's project, one will be able to view it at 
            'https://expo.io/@ascott1/notedly-mobile'"

}
```

Onece the packaging has been completed, anyone can visit 
`https://expo.io/<user-name>/<slug>`

## CREATING NATIVE BUILDS

While distirbuting directly through 'Expo' is a great option for testing or
quick use cases, we will most likely want to release our application through 
the 'Apple App Store' or 'Google Play Store'. To do so, we will build the files 
that can be uploaded to the respective store.

> TIP/WISDOM: **Windows Users**: 

According to the 'Expo' documentation, 'Windows' users need to enable Windows
Substystem for Linux (WSL). To accomplish this, follow the installation guide
for Windows 10 (`https://oreil.ly/B8_nd`) provided by Microsoft.

### 'iOS'

Generating an iOS build requires a membership to the Apple Developers Program
(`https://oreil.ly/E0NuU`), which costs $99 a year. With an account, we can then
add a `bundleIdentifier` for iOS in our _app.json_ file. This identifier should 
follow reverse DNS notation:

```json
{
    "expo": {
        "ios": {
            "bundleIdentifier": "com.yourdomain.notedly"
        }
    }
}
```

With our _app.json_ file updated, we can generate the build. In one's terminal
application, from the root of the project directory, enter:

```sh
$ expo build:ios
```

After running the build one'll be prompted to sign in with one's Apple ID. Once one 
is signed in, one'll be asked several questions about how one would like to handle 
credentials. 'Expo' is able to manage all credentials and certificates for us, which
one can permit by selecting the first option at each of the following prompts:

* How would you like to upload your credentials? (Use arrow keys)
    * 'Expo' handles all credentials, one can still provide overrides <-- selected by each
    * I will provide all the credentials and files needed, 'Expo' does 
    `limited validation`

* Will you proivde your own Apple Distribution Certificate? (Use arrow keys)
    * Let 'Expo' handle the process <-- selected by teach
    * I want to upload my own file

* Will you provide your own Apple Push Notifications service key? (Use arrow keys)
    * Let 'Expo' handle the process <-- selected by teach
    * I want to upload my own file

If one has an active Apple Developer Program account, 'Expo' will then generate
teh file, which can be subitted to the 'Apple App Store'!

### 'Android'

<!-- HERE -- p. 307! -->

## DISTRIBUTING TO APP STORES

## CONCLUSION

# AFTERWORD