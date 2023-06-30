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

_assetBundlePatterns_: 
<!-- HERE -- p. 303! -->

<!-- HERE -- p. 302! -->

## ICONS AND APP LOADING SCREENS

### APP ICONS

### SPLASH SCREENS

### 'EXPO' PUBLISH

## CREATING NATIVE BUILDS

### 'iOS'

### 'Android'

## DISTRIBUTING TO APP STORES

## CONCLUSION

# AFTERWORD