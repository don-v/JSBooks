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
        // HERE -- p. 258!
    );
};
```