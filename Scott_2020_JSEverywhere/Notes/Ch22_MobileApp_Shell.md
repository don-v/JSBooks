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
      <Image sourc={require('.../assets/images/hello-world.jpg')} />
    </View>    
  );
};

export default Main;
```

The preceding code renders some text and image within a view.

<!-- HERE -- p. 236! -->