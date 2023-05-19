# CHAPTER 23: GraphQL AND React Native

In this chapter, we'll begin to fill our application by first exploring
how we can display content with 'React Native''s list views. We'll then
make use of Apollo Client (`https://www.apollographql.com/docs/react`)
to connect to our data API. Once we've connected, we'll write GraphQL
queries, which will display data on an app screen.

> **RUNNING OUR API LOCALLY**: The development of our mobile application
will require access to a local instance of our API. If one has been 
following along with the book, one may already have the 'Notedly' API
and its database up and running on one's machine. If not, teach has
added instructions in the book's Appendix A on how to get a copy of 
the API up and running along with some sample data. If one already has
the API running, but would like some additional data to work with, run
`npm run seed` from the root of the API project directory. 

## CREATING LIST AND SCROLLABLE CONTENT VIEWS

Lists are everywhere. In life, we keep to-do lists, grocery lists, and 
guest lists. In applications, lists are one of the most common UI patterns:
lists of social media posts, lists of articles, lists of songs, lists of
movies, and so on. 'React Native' makes creating scrollable lists of
content a straightforward process.

The two types of lists on 'React Native' are `FlatList` and 
`SectionList`. A `FlatList` is useful for a large number of items in a 
single scrollable list. 'React Native' does some helpful things behind
the scenes, such as rendering only the items that are initially viewable
to improve performance. A `SectionList` is much like a `FlatList`, except
that it allows groups of list items to have a header. Think of contacts
in a contact list, often grouped alphabetically beneath an alphanumeric
header.

For our purposes, we'll be using a `FlatList` to display a list of notes,
through which a user can scroll and tap a preview to read the full note.
To achieve this, let's create a new component named `NoteFeed`, which we
an use to to display the list of notes. For now, we'll use some stand-in
data, but we'll connect it to our API soon.

To begin, let's create a new component at _/src/components/NoteFeed.js_.
We'll start by importing our dependencies and adding an array of temporary
data.

Here is what our `NoteFeed` component looks like initially, from our
_/src/components/NoteFeed.js_ file:

```JavaScript
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

const NoteFeed = () => {
    // our component code will go here
};

export default NoteFeed;
```

Now we can write our component code, which will contain a `FlatList`:

the updated code appeas as follows:

```JavaScript
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

const NoteFeed = props => {
    return (
        <View>
            <FlatList 
                data={notes}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => <Text>{item.content}</Text>}
            />
        </View>
    );
};

export default NoteFeed;
```

In the preceding `NoteFeed` component code, we see the `FlatList` 
receives three properties that simplify the process of iterating
over the data:

`data`: This property points to teh array of data that the list will
contain

`keyExtractor`: Each item in the list must have a unique `key` value. 
We are using `keyExtractor` to use the unique `id` value as the `key`.

`renderItem`: This property defines what should be rendered within 
the list. For now we are passing an individual `item` form our 
`notes` array and displaying it as `Text`.

We can view our list by updating our _src/screens/feed.js_ component
to display the feed: 

```JavaScript
import React from 'react';

// import NoteFeed
import NoteFeed from '../components/NoteFeed';

const Feed = props => {
    return <NoteFeed />;
};

Feed.navigationOptions = {
    title: 'Feed'
};

export default Feed;
```

Let's move back to our _src/components/NoteFeed.js_ file and update
`renderItem` to add some spacing between list items using a 
styled component:

```JavaScript
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';

// FeedView styled component definition
const FeedView = styled.View`
    height: 100;
    overflow: hidden;
    margin-bottom: 10px;
`;

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

const NoteFeed = props => {
    return (
        <View>
            <FlatList 
                data={notes}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <FeedView>
                        <Text>{item.content}</Text>
                    </FeedView>
                )}
            />
        </View>
    );
};

export default NoteFeed;
```

If one previews our app, one'll see a scrolllable list of data. 
Finally, we can add a separator between our list items. Rather than 
adding a bottom border via CSS, 'React Native' enables us to pass
an `ItemSeparatorComponent` property to our `FlatList`. This gives
us fine-grained control to place any type of component as a separator
between list elements. It also avoids placing a separator in unwanted
places, such as after the last item in the list. For our purposes, 
we'll add a simple border, created as a styled component `View`:

```JavaScript
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';

// FeedView styled component definition
const FeedView = styled.View`
    height: 100;
    overflow: hidden;
    margin-bottom: 10px;
`;

// add a Separator styled component
const Separator = styled.View`
    height: 1;
    width: 100%;
    background-color: #ced0ce;
`;

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

const NoteFeed = props => {
    return (
        <View>
            <FlatList 
                data={notes}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <FeedView>
                        <Text>{item.content}</Text>
                    </FeedView>
                )}
            />
        </View>
    );
};

export default NoteFeed;
```

Rather than rendering and stling our note's content direclty
in our `FlatList`, let's isolate it within its own component.
To do so we'll introduce a new type of view called `ScrollView`.
The functionality of a `ScrollView` is precisely what you'd 
expect: rather than conforming to the size of the screen, a 
`ScrollView` will overflow the content, allowing the user to 
scroll.

Let's create a new component at _src/components/Note.js_:

```JavaScript
import React from "react";
import { Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';

const NoteView = styled.ScrollView`
    padding: 10px;
`;

const Note = props => {
    return (
        <NoteView>
            <Text>{props.note.content}</Text>
        </NoteView>
    );
};

export default Note;
```

Finally, we'll update our _src/components/NoteFeed.js_
component to make use o four new `Note` component by importing
it and using it within our `FeedView`. The final component 
code will be as follows:

```JavaScript
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';

import Note from './Note';

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

// FeedView styled component definition
const FeedView = styled.View`
    height: 100;
    overflow: hidden;
    margin-bottom: 10px;
`;

// add a Separator styled component
const Separator = styled.View`
    height: 1;
    width: 100%;
    background-color: #ced0ce;
`;

const NoteFeed = props => {
    return (
        <View>
            <FlatList 
                data={notes}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <FeedView>
                        <Note note={item} />
                    </FeedView>
                )}
            />
        </View>
    );
};

export default NoteFeed;
```

With this, we've laid out a simple `FlatList`. Now let's make it possible to route from
a list item to an individual route.

### MAKING A LIST ROUTABLE

A very common pattern in mobile applications is to tap an item in a list to view
more information or expanded functionality. If one recalls from the previous 
chapter, our feed screen sits atop the note screen in our navigation stack. In
'React Native', we can use the `TouchableOpacity` as a wrapper for making any view
respond to user touches. This means that we can wrap the content of our `FeedView`
in `TouchableOpacity` and route the user on press, the same way that we previously
did with a button. Let's go ahead and update our _src/components/NoteFeed.js_
component to do just that.

First, we must update our `react-native` import to include `TouchableOpacity` in 
_src/components/NoteFeed.js_:

```JavaScript
import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Note from './Note';

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

// FeedView styled component definition
const FeedView = styled.View`
    height: 100;
    overflow: hidden;
    margin-bottom: 10px;
`;

// add a Separator styled component
const Separator = styled.View`
    height: 1;
    width: 100%;
    background-color: #ced0ce;
`;

const NoteFeed = props => {
    return (
        <View>
            <FlatList 
                data={notes}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => 
                            props.navigation.navigate('Note', {
                                id: item.id
                            })
                        }
                    >
                        <FeedView>
                            <Note note={item} />
                        </FeedView>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default NoteFeed;
```

We'll also need to update our '`Feed`' component to pass the
navigation properties to the feed. In _src/screens/feed.js_:

```JavaScript
import React from 'react';

// import NoteFeed
import NoteFeed from '../components/NoteFeed';

const Feed = props => {
    return <NoteFeed navigation={props.navigation} />; // change was in this line!
};

Feed.navigationOptions = {
    title: 'Feed'
};

export default Feed;
```

With this, we can easily navigate to our generic note screen. Let's
customize that screen so that it displays the ID of the note. One may
have noticed that in our `NoteFeed` component navigation, we're passing
an `id` property. In _screens/note.js_, we can read the value of that
property:

```JavaScript
import React from 'react';
import { Text, View } from 'react-native';

const NoteScreen = props => { // added `props`
  const id = props.navigation.getParam('id'); //retreived `id`
  return (
    <View style={{ padding: 10 }}>
      <Text>This is note {id}</Text> /*use `id` property */
    </View>
  );
};

export default NoteScreen;
```

Now, we're able to navigate from our list view to a detail page. Next,
let's take a look at how we can integrate data from our API into our
application.

## 'GraphQL' WITH APOLLO CLIENT

At this point we are ready to read and display data within our application.
We'll be accessing the GraphQL API that we created in the first portion of
the book. Conveniently, we'll be making use of Apollo Client, the same 
'GraphQL' client library form the web portion of the book. Apollo Client
offers a number of helpful features to simplify working with GraphQL 
within JavaScript UI applications. Apollo's client features include fetching
data from a remote API, local caching, GraphQL syntax handling, local state
management, and more.

To get started we'll first need to set up our configuration file. We'll store
our environment variables in a file called _config.js_. There are several ways
to manage envrironment and configuration variables in 'React Native', but
I've found this style of configuration file to be the most straightforward and
effective. To get started, teach included a _config.example.js_ file, which 
we can copy and edit with our app values. In one's terminal applicaiton, from 
the root of the project directory:

```sh
$ cp config.example.js config.js
```

From here, we can update any `dev` or `prod` environment variables. In our
case that will only be a production `API_URI` value:

```JavaScript
// set envrionment variables
const ENV = {
    dev: {
        API_URI: `http://${localhost}:4000/api`
    },
    prod: {
        // update the `API_URI` value with your publicly deployed `API` address
        API_URI: `https://your-api-uri/api`
    }
};
```

We will now be able to access these two values, based on Expo's 
environment, using the `getEnvVars` function. We won't dive into the 
rest of the configuration file, but it is well commented if one
is interested in exploring the setup further.

From here we can connect our client to our API. In our _src/Main.js_ file,
we will set up Apollo by using the Apollo Client library. If one works
through the web portion of the book, this will look very familiar:

after updating our _/src/Main.js_ file, it will have the following source:

```JavaScript
import React from 'react';
import Screens from './screens';
// import the Apollo libraries
import { Apolloclient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import environment from configuration
import getEnvVars from '../config';
const { API_URI } = getEnvVars();

// configure our API URI & cache
const uri = API_URI;
const cache = InMemoryCache();

// configure Apollo Client
const client = new Apolloclient({
  uri,
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

With this, there won't be a visible change in our application, but 
we are now connected to our API. Next, let's look at how we can query
data form that API.

## WRITING GraphQL QUERIES

Now that we're connected to our API, let's query some of the data. We'll
start by querying for all of the notes in our database, to be displayed
in our `NoteFeed` list. We'll then query for individual notes to be displayed
in our `Note` detail view.

> WISDOM: **The note Query:** -- We'll be using the bullk `note` API query
rather than the paginated `noteFeed` query for simplicity and to reduce
repitiion.

Writing a `Query` component works exactly the same way as in a 'React' web
application. In _src/screens/feeds.js_, we import the `useQuery` and 
'GraphQL Language' (`gql`) libraries like so:

here is our updated _src/screens/feed.js_ file:

```JavaScript
import React from 'react';

// import NoteFeed
import NoteFeed from '../components/NoteFeed';

// import our React Native and Apollo dependencies
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

// next we compose our query:
const GET_NOTES = gql`
    query notes {
        id
        createdAt
        content
        favoriteContent
        author {
            username
            id
            avatar
        }
    }
`;

const Feed = props => {
    // update our component to call the query:
    const { loading, error, data } = useQuery(GET_NOTES);
    // if the data is loading, our app will display a loading indicator
    if (loading) return <Text>Loading</Text>;
    // if there is an error fetching the data, display an error message
    if (error) return <Text>Error loading notes</Text>;
    // if the query is successful and there are notes, return the feed of notes
    
    return <NoteFeed notes={data.notes} navigation={props.navigation} />;
};

Feed.navigationOptions = {
    title: 'Feed'
};

export default Feed;
```

For teach, in his final version, he includes a `Loading` component:

```JavaScript
import React from 'react';
import { Text } from 'react-native';
// import our React Native and Apollo dependencies
import { useQuery, gql } from '@apollo/client';


import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';


// next we compose our query:
const GET_NOTES = gql`
    query notes {
        id
        createdAt
        content
        favoriteContent
        author {
            username
            id
            avatar
        }
    }
`;

const Feed = props => {
    // update our component to call the query:
    const { loading, error, data } = useQuery(GET_NOTES);
    // if the data is loading, our app will display a loading indicator
    if (loading) return <Text>Loading</Text>;
    // if there is an error fetching the data, display an error message
    if (error) return <Text>Error loading notes</Text>;
    // if the query is successful and there are notes, return the feed of notes
    
    return <NoteFeed notes={data.notes} navigation={props.navigation} />;
};

Feed.navigationOptions = {
    title: 'Feed'
};

export default Feed;
```

this component referenced by `import Loading from '../components/Loading';`
does not seem to be used in the file!

for completeness, here is the contents of the `Loading` component
taken from the _\mobile-master\final\components_ directory:

```JavaScript
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <LoadingWrap>
      <ActivityIndicator size="large" />
    </LoadingWrap>
  );
};

export default Loading;
```

With out query written, we can update the _scr/components/NoteFeed.js_
component to use the data passed to it via `props`:

```JavaScript
import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Note from './Note';

// our dummy data
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Landquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];

// FeedView styled component definition
const FeedView = styled.View`
    height: 100;
    overflow: hidden;
    margin-bottom: 10px;
`;

// add a Separator styled component
const Separator = styled.View`
    height: 1;
    width: 100%;
    background-color: #ced0ce;
`;

const NoteFeed = props => {
    return (
        <View>
            <FlatList 
                data={props.notes} // updated props here!
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => 
                            props.navigation.navigate('Note', {
                                id: item.id
                            })
                        }
                    >
                        <FeedView>
                            <Note note={item} />
                        </FeedView>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default NoteFeed;
```

With this change, with Expo running, we will see the data from our
local API displayed in a list, as shown in Figure 23-2.

Right now, tapping a note preview in the list will still display a
generic note page. Let's resolve that by making a `note` query in 
the _src/screens/note.js_ file; after updates to this file, it
will appear as follows:

```JavaScript
import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

// our note query, which accepts an ID variable
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
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
`;

const NoteScreen = props => {
  const id = props.navigation.getParam('id');
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <Text>Loading</Text>;
  // if there's an error, display this message to the user
  if (error) return <Text>Error! Note not found</Text>;
  // if successful, pass the data to the note component
  
  return <Note note={data.note} />
};

export default NoteScreen;
```

Finally, let' supdate our _src/components/Note.js_ component file to display
the note contents. We'll add two new dependencies, 
`react-native-markdown-renderer` and `date-fns` to parse the Markdown and
dates from our AI in a more user-friendly way:

<!-- HERE -- p. 268! -->