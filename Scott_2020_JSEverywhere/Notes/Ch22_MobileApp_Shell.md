https://github.com/javascripteverywhere

# CHAPTER 22: MOBILE APPLICAITON SHELL

<!-- HERE -- p. 235! -->

In photography, subject, light, angle are variables that affect image
composition. image proportions, however, remain consistent. Mobile
app dev is similar in that within the constraints of a small rectangular
screen, we can build incredibly powerful applications with immersive
user experience.

### REACTIVE NATIVE BUILDING BLOCKS

Let's begin by taking a look at the basic building blocks of a 'React
Native' application. One may have already guessed that a 'React Native'
application consists of 'React' components written in JSX. But without
an HTML page's DOM (document object model), waht exactly goes within 
those components? We can start by looking at the "Hello World" component
at _src/Main.js_. for now, teach has removed the styles:

```JavaScript
import React from 'react';
import { Text, View } from 'react-native';

const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello world!</Text>
    </View>
  );
};

export default Main;
```

In this markup there are two notable JSX tags: `<View>` and `<Text>`. If
you're coming from a web background, a `<View>` tag serves much of the 
purpose as a `<div>` tag. It is a container for the content of our 
applications. On their own they don't do much, but they contain all of 
our app's content, can be nested wihtin one another, and are used to 
apply styles. Each of our components will be contained within a `<View>`
tag. In 'React Native', one can use a `<View>` anywhere that one might
use a `<div>` or `<span>` tag on the web. The `<Text>` tag, unsurprisingly,
is used to contain any text in our app. Unlike on the web, however, this
single tag is used for all text. 

As one can imagine, we can also add images to our applications, by using
the `<Image>` JSX element. Let's update our _src/Main.js_ file to include
an image. To do so, we import the `Image` component form 'React Native'
and use an `<Image>` tag with a `src` attribute (See Figure 22-1).

```JavaScript
import React from 'react';
import { Text, View, Image } from 'react-native';

const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Test>Hello world!</Text>
      <Image source={require('.../assets/images/hello-world.jpg')} />
    </View>    
  );
};

export default Main;
```

The preceding code renders some text and image within a view. One may notice
that our `<View>` and `<Image>` JSX tags are passed properties that allow us
to cotnrol specific behavior (in this case the `style` of the `View` tag and the
`source` of the `Image` tag). Passing properties to an elemetn allows us to 
extend teh element with all sorts of additional features. 'React Native's API
documentation (`https://oreil.ly/3fACI`) catalogs the properties that are made
available to each element.

Our app doesn't do much yet, but in the next section we'll explore how we can
improve the look and feel using 'React Native's built-in style support and 
'Styled Components'.

### STYLE AND STYLED COMPONENTS

As app devs and designers, we want to be able to style our applicaitons
to have a precise look, feel, and user experience. There are a number of
UI component libraries, such as 'NativeBase', (`https://nativebase.io`) 
or 'React Native Elements' (`https://oreil.ly/-M8EE`), which offer a wide
range of predefined and often customizable components. These are well worth
a look, but for out purposes let's explore how we might compose our own 
styles and application layouts.

As we've already seen, 'React Native' provides a `style` property that 
allows us to apply custom styles to any JSX element in our application. The
style names and values match those of CSS, except that the names are written
in camelCase, such as `lineHeight`, and `backgroundColor`. Let's update our
_/src/Main.js_ file to include some styles for the `<Text>` element:

```JavaScript
const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ coor: '#0077cc', fontSize: 48, fontWeight: 'bold' }}>
      Hello world!</Text>
      <Image source={require('.../assets/images/hello-world.jpg')} />
    </View>    
  );
};
```

One may be thinking, rightfully, that applying styles at the element level
would quickly become an unmaintainable mess. We can use 'React Native's
`StyleSheet` library to help organize and reuse our styles.

First, we need to add `StyleSheet` to our list of imports:

```JavaScript
import {  Text, View, Image, StyleSheet } from 'react-native';
```

Now we can abstract our styles:

```JavaScript
const Main = () => {
  return (
    <View style={stles.container}>
      <Text style={styles.h1}>Hello world!</Text>
      <Text style={styles.paragraph}>This is my app</Text>
      <Image source={require('.../assets/images/hello-world.jpg')} />
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  h1: {
    fonstSize: 48,
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 18
  }
});
```

> **FLEXBOX**: 'React Native' uses the CSS flexbox algo to define 
layout styles. We won't be covering flexbox in depth, but React
Native offers documentation (`https://oreil.ly/owhZK`) that clearly
explains flexbox and its use cases for arranging elements on the 
screen.

## STYLED COMPONENTS

While 'React Native''s built-in `style` properties and `StyleSheet`
may offer everything that we need out of the box, they are far from
our only options for styling our applications. We can also make use of
popular web CSS-in-JS solutions, such as 'Styled Components' 
(`https://www.styled-components.com`) and 'Emotion' 
(`https://emotion.sh`). These offer, in my opinion, a cleaner syntax, 
are more closely aligned to CSS, and limit the amount of context 
swtitching needed between the web and mobile application codebases.
Using teh web-enabled CSS-in-JS libraries also creates the opportunity
to share stles or components across platforms. 

For our purposes, let's look at how we can adapt the previosu example to
use the 'Styled Components' library. First, in _src/Main.js_ we will 
import the `native` version of the library:

```JavaScript
import styled from 'styled-components/native';
```

From here we can migrate our styles to the 'Styled Components' syntax. 
If one followed along in C13, this syntax should look very familiar. The 
final code of our _/src/Main.js_ files becomes:

```JavaScript
import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

const StytledView = styled.View`
  flex: 1;
  justify-content: center;
`;

const H1 = styled.Text`
  font-size: 48px;
  font-weight: bold;
`;

const P = styled.Text`
  margin: 24px 0;
  font-size: 18px;
`;

const Main = () => {
  return (
    <StyledView>
      <H1>Hello world!</H1>
      <P>This is my app</P>
      <Image source={require('../assets/images/hello-world.jpg')} />
    </StyledView>
  );
};

export default Main;
```

> * **Styled Components Capitalization**: In the 'Styled Components' library,
the element names must alwasy be capitalized.

With this, we're now able to apply custom styling to our applications, with 
the option of using 'React Native's built-in style system, or by using the
'Styled Components' library.

## ROUTING

On the web, we can use HTML anchor links to link from one HTML document to
any other, including those on our own site. For JS-driven apps, we use 
routing to link together JS-rendered tempaltes. Waht about native mobile
applications? For these, we will route our users between screens. In this
section, we'll explore two common routing types: tab-based navigation and 
stack navigation.

### TABBED ROUTING WITH 'React Navigation'

To perform our routing we'll make use of the 'React Navigation' library 
(`https://reactnaviagation.org`), which is the routing solution recommended
by both the 'React Native' and 'Expo' teams. Most importantly, it makes it very 
straightforward to implement common routing patterns with a platform-specific
look and feel.

To get started, let's first create a new directory within our _src_ directory
named _screens_. Within the _screens_ directory, let's create three new files,
each containing a very basic 'React' component:

Add the following in _src/screens/favorites.js_:

```JavaScript
import React from 'react';
import { Text, View } from 'react-native';

const Favorites = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Favorites</Text>
        </View>
    );
};

export default Favorites;
```

Add the following to _src/screens/feed.js:

```JavaScript
import React from 'react';
import { Text, View } from 'react-native';

const Feed = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Feed</Text>
        </View>
    );
};

export default Feed;
```

Finally, add this in _scr/screens/mynotes.js_:

```JavaScript
import React from 'react';
import { Text, View } from 'react-native';

const MyNotes = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>My Notes</Text>
        </View>
    );
};

export default MyNotes;
```

We can then create a new file at _src/screens_ named 'index.js' 
to be used as the root of our application's routing. We'll begin
by importing our initial `react` and `react-navigation` 
dependencies:

```JavaScript
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// import screen components
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
```

With these dependencies imported, we can create a tab navigator
between these three screens using `react-navigation`'s 
`createBottomTabNavigator` to define which 'React' component screens
should appear in our navigation:

<!-- HERE -- p. 243! -->