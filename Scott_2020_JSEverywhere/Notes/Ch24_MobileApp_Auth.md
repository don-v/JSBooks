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

Now we can display this form on  our authentication screen. To do so, update
_src/screens/signin.js_ to import and use the component like so:

```js
import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import UserForm from '../components/UserForm';

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
            <UserForm />
        </View>
    );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;
```

With this, we'll see a basic form display on the authentication screen,
but it lacks any style or functionality. We can continue implementing the
form in our _src/components/UserForm.js_. We'll be using 'React''s 
`useState` hook to read and set the values of our fomr elements:

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <View>
            <Text>Email</Text>
            <TextInput onChangeText={text => setEmail(text)} value={email} />
            <Text>Password</Text>
            <TextInput onChangeText={text => setPassword(text)} value={password} />
            <Button title='Log In'/>
        </View>
    );
}

export default UserForm;
```

Now we can add a few more additional properties to our form elements to provide
user with the expected functionality when working with our email addresses or
passwords. Full documentation of the `TextINput` API can be found in the 
'React Native' docs (`https://oreil.ly/yvgyU`). We'll also call a funciton when
the button is pressed, though the functionality will be limited.

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
    }

    return (
        <View>
            <Text>Email</Text>
            <TextInput 
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput 
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <Button 
                title='Log In'
                onPress={handleSubmit}    
            />
        </View>
    );
}

export default UserForm;
```

Our form has all the necessary components, but the styling leaves a
lot to be desired. Let's use the Styled Components library to give the
form a more appropriate appearance:

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
`;

const FormLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
    }

    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            <FormLabel>Password</FormLabel>
            <StyledInput
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <Button 
                title='Log In'
                onPress={handleSubmit}    
            />
        </FormView>
    );
}

export default UserForm;
```

Finally, our `Button` component is limited to the default style options, 
with the exception of accepting a `color` property value. To create a
custom-styled button component, we can use the 'React Native' wrapper 
`TouchableOpacity` (see Figure 24-3):

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
`;

const FormLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
    }

    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            <FormLabel>Password</FormLabel>
            <StyledInput
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>
        </FormView>
    );
}

export default UserForm;
```

With this, we've implemented a sign-in form and applied custom styles.
Let's now implement the form's functionality.

### AUTHENTICATION WITH 'GraphQL' MUTATIONS

One may recall the authentication flow we've developed form the API and
web application chapters, but before moving forward let's do a quick 
refresher. We will send a GraphQL mutation to our API that includes the 
user's email address and password. If the email address exists in the
database, and the password is correct, the API will resopond with a JWT
(JavaScript WebToken). We can then store the token on the user's device. 
This will allow us to identify the user on every API request, without 
requiriting them to constantly re-enter their password (log-in info).

With our form in place, we can write our GraphQL mutation in 
_src/screens/signin.js_. First, we'll add the Apollo libraries as well as
our `Loading` component to our list of imports:

```js
import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

// add our GraphQL query
const SIGNIN_USER = gql`
    mutation signIn($email: String, $password, String!) {
        signIn(email: $email, password: $password)
    }
`;

// update `storeToken` function to store a token string passed as a
// parameter

const SignIn = props => {
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's `main` screen
    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('App')
        );
    };

    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            storeToken(data.signIn)
        }
    })

    // if loading, return a loading indicator
    if (loading) return <Loading />;
    return (
        <React.Fragment>
            {error && <Text>Error signing in!</Text>}
            <UserForm 
                action={signIn}
                formType="signIn"
                navigation={props.navigation}
            />
        </React.Fragment>
    );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;
```

Now we can make a simple change in our _src/components/UserForm.js_ 
component, which will enable it to pass the user-entered data to the
mutation. Within the component, we will update our `handleSubmit` 
function to pass the form values to our mutation:

```js
    const handleSubmit = () => {
        // this function is called when the user presses the form button
        props.action({
            variables: {
                email: email,
                password: password
            }
        });
    };
```

With our mutation written and form complete, users can now sign in to the 
application, which will store the returned JSON Web Token (JWT) for future
use.

our _/src/components/UserForm.js_ now appears as follows:

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
`;

const FormLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
        props.action({
            variables: {
                email: email,
                password: password
            }
        });
    };

    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            <FormLabel>Password</FormLabel>
            <StyledInput
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>
        </FormView>
    );
}

export default UserForm;
```

## AUTHENTICATED GRAPHQL QUERIES

Now that our users can sign-in to their account, we'll need to use the
stored token to authenticate each request. This will allow us to request
user-specific data, such as a list of notes by the current user or a list
of notes the user has marked as "favorites." To accomplish this, we'll 
update teh Apollo configuration to check for the existence of a token
and, when one is present, send that token's value with each API call.

In _src/Main.js_, first add `SecureStore` to the list of imports and 
update the Apollo Client dependencies to include `creatHttpLink` and
`setContext`:

```js
import React from 'react';
import Screens from './screens';
// import the Apollo libraries
import { 
  Apolloclient, 
  ApolloProvider, 
  createHttpLink,
  InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
// import `SecureStore` for retreiving the token value
import * as SecureStore from 'expo-secure-store';
// import environment from configuration
import getEnvVars from '../config';
const { API_URI } = getEnvVars();

// configure our API URI & cache
const uri = API_URI;
const cache = InMemoryCache();
const httpLink = createHttpLink({ uri });

// return the headers to teh context
const authLink = setContext(async (_, { headers}) => {
return {
      headers: {
      ...headers,
      authorization: (await SecureStore.getItemSync('token')) || ''
    }
  };
});

// configure Apollo Client
const client = new Apolloclient({
  link: authLink.concat(httpLink),
  cache
});

const Main = () => {
  // wrap our app in the ApolloProvider higher-order component
  return (
    <ApolloProvider client={client}>
      <Screens />
    </ApolloProvider>
  );
};

export default Main;
```

With the token sent in the header of each request, we can now update 
the `mynotes` and `favorites` screens to request user-specific data. 
If one followed along through the web chapters, these queries should 
look very familiar.

In _src/screens/mynotes.js_:

```js
import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed'
import Loading from '../components/Loading';

// our GraphQL query
const GET_MY_NOTES = gql`
    query me {
        me {
            id
            username
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const MyNotes = props => {
    const { loading, error, data } = useQuery(GET_MY_NOTES);

    // if the data is loading, our app will display a loading message
    if (loading) return <Loading />;
    // if there is an error fetching the data, display a error message
    if (error) return <Text>Error loaidng notes</Text>;
    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't any notes, display a message
    if (data.me.notes.length != 0) {
        return <NoteFeed notes={data.me.notes} navigation={props.navigation}/>
    } else {
        return <Text>No notes yet</Text>
    }
};

MyNotes.navigationOptions = {
    title: 'My Notes'
};

export default MyNotes;
```

In _/src/screens/favorites.js_:

```js
import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

// our GraphQL query
const GET_MY_FAVORITES = gql`
    query me {
        me {
            id
            username
            favorites {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const Favorites = props => {
    const { loading, error, data } = useQuery(GET_MY_FAVORITES);

    // if the data is loading, our app will display a loading message
    if (loading) return <Loading />;
    // if there is an error fetching the data, display an error message
    if (error) return <Text>Error loading notes</Text>;
    // if the query is successful and there are notes, return teh feed of notes
    // else if the query is successful and there aren't noes, display a message
    if (data.me.favorites.length !==0) {
        return <NoteFeed notes={data.me.favorites} navigation={props.navigation} />;
    } else {
        return <Text>No notes yet</Text>
    }
};

Favorites.navigationOptions = {
    title: 'Favorites'
};

export default Favorites;
```

We are now retrieving user-specific data based on the token value stored
on the user's device.

## ADDING A SIGN-UP FORM

Right now, a user can sign in to an existing account, but they have no way
to create an accoutn if one doesn't exist. A common UI pattern is to add a
link to a registration form below the sign-in link (or vice versa). Let's
add a sign-up screen to allow users to create a new account from within our
application.

To begin, let's create a new screen component at _src/screens/signup.js_.
This component will be nearly identical to our sign-in screen, but we'll 
call our `signUp` GraphQL mutations and pass a `formtype="signUp"` property
to our `UserForm` component:

```js
import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

// signUp GraphQL mutation
const SIGNUP_USER = gql`
    mutation signUp($email: String!, &username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

// update `storeToken` function to store a token string passed as a
// parameter

const SignUp = props => {
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's `main` screen
    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('App')
        );
    };

    // the signUp mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            storeToken(data.signUp)
        }
    })

    // if loading, return a loading indicator
    if (loading) return <Loading />;
    
    return (
        <React.Fragment>
            {error && <Text>Error signing in!</Text>}
            <UserForm 
                action={signUp}
                formType="signUp"
                navigation={props.navigation}
            />
        </React.Fragment>
    );
}

SignUp.navigationOptions = {
    title: 'Register'
};

export default SignUp;
```

With the screen created, we can add it to our router. In the 
_src/screens/index.js_ file, first add the new component to out
list of file imports:

```js
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
import SignUp from './signup';

const AuthStack = createStackNavigator({
  SignIn: SignIn,
  SignUp: SignUp
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

With this, our component is created and routable; however, our `UserForm`
component does not contain all of the necessary fields. Rather than 
creating a registration form component, we can make use of the 
`formType` property that we're passing to `UserForm` to customize the 
form, depending on the type.

In our _src/components/UserForm.js_ file, let's first update the form to
include a username field when the `formType` equals `signUp`:

```js
            {props.formType === 'signUp' && (
                <View>
                    <FormLabel>Username</FormLabel>
                    <StyledInput 
                        onChangeText={text => setUsername(text)}
                        value={username}
                        textContentType="username"
                        autoCapitalize="none"
                    />
                </View>
            )}
```

Next, let's add a link at the bottom of the sign-in form that will allow
a user to route to the sign-up form when pressed!

```js
            {props.formType !== 'signUp' && (
                <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            )}
```

We can then use styled components to update the lookf of the link:

```js

const SignUp = styled.TouchableOpacity`
    margin-top: 20px;
`;

const Link=styled.Text`
    color: #0077cc;
    font-weight: bold;
`;
```

And the apply the style to our JSX component:s

```js

                <SignUp onPress={() => props.navigation.navigate('SignUp')}>
                    <Text>
                        Need an account? <Link>Sign up.</Link>
                    </Text>
                </SignUp>

```

All together, our _src/components/UserForm.js file will now have the 
following source:

```js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
`;

const FormLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const SignUp = styled.TouchableOpacity`
    margin-top: 20px;
`;

const Link=styled.Text`
    color: #0077cc;
    font-weight: bold;
`;

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
        props.action({
            variables: {
                email: email,
                password: password,
                username: username
            }
        });
    };

    
    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            {props.formType === 'signUp' && (
                <View>
                    <FormLabel>Username</FormLabel>
                    <StyledInput 
                        onChangeText={text => setUsername(text)}
                        value={username}
                        textContentType="username"
                        autoCapitalize="none"
                    />
                </View>
            )}
            <FormLabel>Password</FormLabel>
            <StyledInput
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>
            {props.formType !== 'signUp' && (
                <SignUp onPress={() => props.navigation.navigate('SignUp')}>
                    <Text>
                        Need an account? <Link>Sign up.</Link>
                    </Text>
                </SignUp>
            )}
        </FormView>
    );
}

export default UserForm;
```

With these changes, a user can both sign in and register for an 
account iwth our application.

## CONCLUSION

In this chapter, we look at how to bring authentication to an 
applicaiton. Through a combination of 'React Native's text form 
elmeents, 'React Navigation''s routing capabilities, 'Expo's
`SecureStore` library, and GraphQL mutations, we can create a 
user-friendly authentication flow. Having a solid understanding
of this type of authentication also enables us to explore 
additional 'React Native' authentication methods, such as 'Expo''s
`AppAuth` (`https://oreil.ly/RaxNo`) or `GoogleSignIn`
(`https://oreil.lyIc6BW`). In this next chapter, we'll look at how
we can publish and distribute a 'React Native' application!