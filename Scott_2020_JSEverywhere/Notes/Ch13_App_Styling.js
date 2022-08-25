/* CHAPTE 13: STYLING AN APPLICATION

teach argues that style is an important part of human culture (nature).
Clothes not only serve the functional purpose of protecting our bodies,
but also convey information about our culture, social status, interests,
and much more!

A web application is functional without anything beyondthe deafult styles
of the web, but by applying CSS we are able to more clearly communicate 
with out users.

Inthis chapter, we will explore how we can use the 'CSs-in-JS' Styled
Components library to introduce layout and style to our application. This
will allow us to make a more usable and aesthetically pleasing application
within a maintainable, component-based, code structure.

// CREATING A LAYOUT COMPONENT

Many, or in our case all, pages of an application will share a common
layout. for example, all the pages of our application will have a header,
a sidebar, and a content area (Figure 13-1). Rather than import the
shared layout elements within each page component, we can instead create a
component specifically for our layout and wrap each of our page components
within it.

To create our component, we'll begin by creating a new file at 
'/src/components/Layout.js'. Within this file we'll import our
shared components and aly out our content. Our 'React' component
function will receive a property of `children`, which will allow
us to specify where child content will appear in the layout. We'll
also make use of the empty `<React.Fragment>` JSX element to help
avoid extraneous markup.

Let's create our component in '/src/components/Layout.js'

```
import React from 'react';

imort Header from './Header';
import Navigation from '.Navigation';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <div className="wrapper">
                <Navigation />
                <main>{children}</main>    
            </div>
        </React.Fragment>
    );
};
```


*/