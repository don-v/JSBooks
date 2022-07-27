/* 
USER INTERFACES AND REACT

In this chapter, we explore we take a brief look at the
history of JS UI development. 

With that background, we then explore React, the
JS library we'll be using the rest of the way!

JS developed in mid-1990s (in 10 days, allegedly); JS provided
an embedded scripting language; allowed devs to add small
interactions to web page that were not possible with HTML
alone!

early, there were issues with cross-browser compatibility
which led to the proliferation of the dev of many browser-
specific libraries!

Mid-2000s, 'jQuery` and 'MooTools' took off; jQuery allowed
devs to write JS with a simple API that worked well across
browsers. Facilitated the ability to remove, add, replace, 
and animate things on web pages!

Around the same time, AJAX (asynchronous JS and XML) came 
on scene; AJAX allowed one to fetch data from a server and
inject it into the page. The combinations of these 2 
technologies provided an ecosystem to create powerful
interactive web applications!

As apps grew, so did need for organization and boilerplate
code! By early 2010s, frameworks like 'Backbone', 'Angular',
and 'Ember' dominated the JS application landscape.

These frameworks imposed application structure, and 
provided code that facilitated the implementation of
common application patterns; These frameworks were
often modeled after the Model, Controller, and View
(MVC) software design pattern. Each framework was 
prescriptive about all of the layers of the web application,
providing a structured ways to handle templating, data,
and user interactions. While this approach had many
benefits, it also meant that the effort of intergrating
new or non-standard technologies could be quite high!

Meanwhile, desktop applications conitnued to be written
in system-specific programming languages. This mean that 
developers and teams were often forced to make either/or
style choices (either a Mac app or a Windows app), (either
as web app or a desktop app); 

Mobile applications were in a similar position; The rise
of responsive web design meant that designers and devs
could create truly incredible sites and applications for
the mobile web browser, but choosing to build a web-only
application locked them out of the mobile platform app 
stores.

Applies' iOS applicaitons were written in Objective-C
(and more recently Swift), while Android relied upon
Java. This meant that the web, consisting of 
HTML, CSS, and JS was the only truly cross-platform
UI environment!

// DECLARATIVE INTERFACES WITH JS

In early 2010s, devs at FB began to face challenges in the
organization, and management of their JS code. In response,
the software engineer Jordan Walke wrote React, inspired
by FB's PHP library, XHP. React differed from other popular
JS frameworks in that it focused solely on the rendering of
the UI. To do this, React took a 'declarative' programming 
approach, meaning that it provides an abstraction that allows
devs to focus on describing what the state of the UI should
be!

With the rise of React, and similar libraries like Vue.js, 
there has been a shift in the way devs write UIs; these
frameowrks provide a means to manage the state of a UI at 
the component level! This approach makes applications
feel smooth and seamless to users, while providing an 
excellent development experience. With tooling such as 
Electron for building desktop apps and 'React Native' for
cross-platform mobile applications, devs and teams are now
able to leverage these paradigms in all of their 
applications!

// JUST ENOUGH REACT

Throughout the remaining chapter, we will rely on the 
'React' library to build out UIs. One does not need to 
have any prior experience with 'React' to follow along.
Still, it may be helpful to get a sens of the syntax before
jumping in. To do this, we'll use `creat-react-app` to
scaffold out a new project. `create-react-app` is a tool
developed by the 'React' team that allows one to quickly
set up a new 'React' project and helpfully abstracts the 
underlying build tooling, such as 'Webpack' and 'Babel'.

In our terminal, application, cd into the 'projects' 
directory and run the following commands, which will create
a new 'React' application in  folder named 'just-enough-react':

```
$ npx create-react-app just-enough-react
cd just-enough-react
```
# HERE -- p. 103!, still here!

*/