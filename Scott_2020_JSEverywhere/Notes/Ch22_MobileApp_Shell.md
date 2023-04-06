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

<!-- HERE -- p. 236! -->