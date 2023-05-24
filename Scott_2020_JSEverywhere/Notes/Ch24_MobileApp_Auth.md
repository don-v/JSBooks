# CHAPTER 24: MOBILE APPLICATION AUTHENTICATION

Without the ability to customize or read user-specific data, 
out app might fill users with the same sense of discomfort. Their
notes are simply mixed in with those of everyone else, not making 
the application truly their own. In this chapter we'll add 
authentication to our application. To accomplish this, we'll 
introduce an authentication routing flow, store token data using
`Expo`'s `SecureStore`, create text forms in 'React Native', 
and perform authentication GraphQL mutations.

## AUTHENTICATION ROUTING FLOW

Let's begin cy creating our authentication flow. When a user first
accesses our application, we'll present them with a sign-in screen.
When the user signs in , we'll store a token on the device, allowing
them to bypass the sign-in screen on future application uses. We'll
also add a settings screen, where a user can click a button to log
out of the application and remove the token from their device.

To accomplish this, we'll be adding several new screens:

* _authloading.js_: This will be an interstitial screen, which users
won't interact with. When the app is opened, we'll use the screen to 
check if a token is present and navigate the user to either the sign-in
screen or the application content.

* _signin.js_: This is the screen where a user can sign in to their 
account. After a successful login attempt, we will store a token on 
the device.

* _settings.js_: In the settings screen, a user will be able to click
a button and log out of the application. Once they are logged out, they
will be routed back to the sign-in screen.

**Using an Existing Account**: We'll be adding ...

<!-- HERE -- p. 274!~ -->