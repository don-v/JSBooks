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

<!-- HERE -- p. 304! -->

### SPLASH SCREENS

### 'EXPO' PUBLISH

## CREATING NATIVE BUILDS

### 'iOS'

### 'Android'

## DISTRIBUTING TO APP STORES

## CONCLUSION

# AFTERWORD