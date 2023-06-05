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

**Using an Existing Account**: We'll be adding the ability to create an
account through the app later in the chapter. If one hasn't already, it
wuld be useful to create an account either directly through your API
instance's GraphQL Playground or the web application interface.

For storing and working with tokens, we'll be using Expo's SecurStore
library `https://oreil.ly/nvqEO`. I've found SecureStore to be a 
straighforward way to encrypt and store data locally on a device. For 
iOS devices, SecureStore makes use of the built-in keychain services
(`https://oreil.ly/iCu8R`), while on Android it uses the OS's Shared
Preferences, encrypting the data with Keystore (`https://oreil.ly/gIXsp`).
All of this happens under the hood, allowing us to simplify store and
retreive data.

To begin wiwth , we'll create our sign-in screen. For now, our sign-in
screen will consist of a `Button` component that, when pressed, will
store a token. Let's create a new screen component _src/screens/signin.js_,
importing our dependencies. 

```JavaScript
import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SignIn = props => {
    return (
        <View>
            <Button title="Sign in!"/>
        </View>
    );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;
```

Next, let's create our authentication loading component
at _src/screens/authloading.js_ which for now will simply
display a loading indicator:

```JavaScript
import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import Loading from '../components/Loading';

const AuthLoading = props => {
    return <Loading />;
};

export default AuthLoading;
```

Finally, we can create our settings screen at 
_src/screens/settings.js_:

```JavaScript
import React from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Settings = props => {
    return (
        <View>
            <Button title="Sign Out" />
        </View>
    );
};

Settings.navigationOptions = {
    title: 'Settings'
};

export default Settings;
```

With these components written, we will update our routing to handle
the authenticated and unauthenticated states. In _src/screens/index.js_,
add the new screens to our list of import statements as follows; with 
these changes, our _src/screens/index.js_ file will appear as follows:

```JavaScript
import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// add import for createStackNavigator
import { createStackNavigator } from 'react-navigation-stack';

// add icons from `MaterialCommunityIcons`
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import screen components
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';

// add the new screens to our list of import statements as follows:
import AuthLoading from './authloading';
import SignIn from './signin';
import Settings from './settings';

// navigation stack
const FeedStack = createStackNavigator({
  Feed: Feed,
  Note: NoteScreen
});

const MyStack = createStackNavigator({
  MyNotes: MyNotes,
  Note: NoteScreen
});

const FavStack = createStackNavigator({
  Favorites: Favorites,
  Note: NoteScreen
});

// navigation tabs
const TabNavigator = createBottomTabNavigator({
  FeedScreen: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="home" size={24} color={tintColor} />
      )
    }
  },
  MyNoteScreen: {
    screen: MyStack,
    navigationOptions: {
      tabBarLabel: 'My Notes',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="notebook" size={24} color={tintColor} />
      )
    }
  },
  FavoriteScreen: {
    screen: FavStack,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="star" size={24} color={tintColor} />
      )
    }
  }
});

// create the app container
export default createAppContainer(TabNavigator);
```

We'll also need to update our `react-navigation` dependency to
include `createSwitchNavigator`, which allows us to display a
single screen at a time and swtich between them. The 
`SwitchNavigator` (`https://oreil.ly/vSURH`) resets routes to
the default state when a user navigates and does not offer 
back-navigation options.

We can create a new `StackNavigator` for our authentication and
settings screens. This will allow us to add subnavigation screens
when or if needed in the future:

```JavaScript
const AuthStack = createStackNavigator({
  SignIn: Signin
});

const SettingsStack = createStackNavigator({
  Settings: Settings
});
```

We will then add our settings screen to the bottom `TabNavigator`.
The rest of the tab navigation settings will stay the same:

```JavaScript
// navigation tabs
const TabNavigator = createBottomTabNavigator({
  FeedScreen: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="home" size={24} color={tintColor} />
      )
    }
  },
  MyNoteScreen: {
    screen: MyStack,
    navigationOptions: {
      tabBarLabel: 'My Notes',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="notebook" size={24} color={tintColor} />
      )
    }
  },
  FavoriteScreen: {
    screen: FavStack,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="star" size={24} color={tintColor} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="settings" size={24} color={tintColor} />
      )
    }
  }
});
```

We can now create our `SwitchNavigator` by defining the screens to switch
between and setting a default screen, the `AuthLoading`. We'll then replace
our existing `export` statement with one that exports the `SwitchNavigator`:

```JavaScript
// create SwitchNavigator
const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    App: TabNavigator
  },
  {
    initialRouterName: 'AuthLoading'
  }
);

// create the app container
export default createAppContainer(TabNavigator);
```

All together, our _src/screens/index.js_ file will appear as follows:

```JavaScript
import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// add import for createStackNavigator
import { createStackNavigator } from 'react-navigation-stack';

// add icons from `MaterialCommunityIcons`
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import screen components
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';

// add the new screens to our list of import statements as follows:
import AuthLoading from './authloading';
import SignIn from './signin';
import Settings from './settings';

const AuthStack = createStackNavigator({
  SignIn: SignIn
});

// navigation stack
const FeedStack = createStackNavigator({
  Feed: Feed,
  Note: NoteScreen
});

const MyStack = createStackNavigator({
  MyNotes: MyNotes,
  Note: NoteScreen
});

const FavStack = createStackNavigator({
  Favorites: Favorites,
  Note: NoteScreen
});

const SettingsStack = createStackNavigator({
  Settings: Settings
});

// navigation tabs
const TabNavigator = createBottomTabNavigator({
  FeedScreen: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="home" size={24} color={tintColor} />
      )
    }
  },
  MyNoteScreen: {
    screen: MyStack,
    navigationOptions: {
      tabBarLabel: 'My Notes',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="notebook" size={24} color={tintColor} />
      )
    }
  },
  FavoriteScreen: {
    screen: FavStack,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="star" size={24} color={tintColor} />
      )
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="settings" size={24} color={tintColor} />
      )
    }
  }
});


// create SwitchNavigator
const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    App: TabNavigator
  },
  {
    initialRouterName: 'AuthLoading'
  }
);

// create the app container
export default createAppContainer(TabNavigator);
```

Right now, when we preview our app we'll only see loading spinner, since
our `AuthLoading` route is the initial screen. Let's update this so that 
the loading screen checks for the existence of a `token` value in the
application's `SecureStore`. If the token is present, we'll navigate to 
the user to the main application screen. However, if no token is present,
the user should be routed to the sign-in screen. Let's update
_src/screens/authloading.js_ to perform this check; here is what our 
updated _src/screens/authloading.js_ file looks like:

```js
import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import Loading from '../components/Loading';

const AuthLoading = props => {
    const checkLoginState = async () => {
        // retrieve the value of the token
        const userToken = await SecureStore.getItemAsync('token');
        // navigate to the app screen if a token is present
        // otherwise navigate to the auth screen
        props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
    // call checkLoginState as soon as the component mounts
    useEffect(() => {
        checkLoginState();
    });
    
    return <Loading />;
};

export default AuthLoading;
```

With this change, when we load the app, we should now be routed 
to the sign-in screen, since no token is present. For now,
let's update our sign-in screen to store a generic token and 
navigate to the application when the user presses the button
(Figure 24-1): the `SignIn` component is located at:
_\src\screens\signin.js_

```js
import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SignIn = props => {
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's `main` screen
    const storeToken = () => {
        SecureStore.setItemAsync('token', 'abc').then(
            props.navigation.navigate('App')
        );
    };

    return (
        <View>
            <Button title="Sign in!" onPress={storeToken} />
        </View>
    );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;
```

Now, when a user presses the button, a token is stored via `SecureStore`.
With the sign-in functionality in place, let's add the ability for users to 
sign out of the application. To do so, we'll add a button on our settings 
screen that, when pressed, will remove the _token_ from `SecureStore`. In
_src/screens/settings.js_:

```js
import React from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Settings = props => {
    // delete the token then navigate to the auth screen
    const signOut = () => {
        SecureStore.deleteItemAsync('token').then(
            props.navigation.navigate('Auth')
        );
    };

    return (
        <View>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    );
};

Settings.navigationOptions = {
    title: 'Settings'
};

export default Settings;
```

With these pieces in place, we have everything we need to create
an application authentication flow.

> **BE SURE TO SIGN OUT**: If one hasn't already, tap the 'Sign Out'
button on one's local app instance. We'll be adding proper sign-in 
functionality in teh upcoming sections.

## CREATING A SIGN-IN FORM

While we can now click a button and store a token on the user's device, 
we'lre not yet allowing a user to sign in to an account by entering 
their own information. Let's begin to remedy this by creating a form
where a user can enter their email address and password. To do this, 
we'll create a new component at _src/components/UserForm.js_ with a 
form using 'React Native''s `TextInput` component:

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const UserForm = props => {
    return (
        <View>
            <Text>Email</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput />
            <Button title='Log In'/>
        </View>
    );
}

export default UserForm;
```

<!-- HERE -- p. 282! -->