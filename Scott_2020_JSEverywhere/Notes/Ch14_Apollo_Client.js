/* 
// CHAPTER 14: WORKING IWTH APOLLO CLIENT

The modem-based connections for internet access from previous
decades, though quite slow and unreliable, still capture the 
essence of modern-day service communications:

1. services request a connection
2. make the connection
3. send a request
4. recieve the response

Our client application will work in a similar manner. We will
first make a connection to our server API application, and if
successful, make requests to that server.

In this chapter, we will use Apollo Client to connect to our
API. Once connected, we'll write a GraphQL query, which will be
used to display data on a page. We'll also introduce pagination, 
both within the API query and in our interface components!

> WISDOM: Running the API locally -- The devlopment of our web
client application will require access to a local instance of our
API. If you've been following along with the book, one may already
have the Notedly API and its database up and running on machine!

If not, teach has added instructions to Appendix A on how to get
a copy of the API up and running along with some sample data.
If one already has the API running, but would like some additional
data to work with, run execute `npm run seed` from the root of
the API project directory!

# Finished 09/11/2022 -- copied seed to src folder from final; 
adjust package.json; update DB_HOST uri, set content without 
accessing url for lorem ipsum 

# HERE -- updated bcrypt - bcryptjs; test npm run seed next!

checked the seed, it worked!

// SETTING UP APOLLO CLIENT

Much like Apollo Server, Apollo Client offers a number of helpful 
features to simplify working with GraphQL within JS UI applications.
Apollo Client provides libraries for connecting a web client to an
an API, local caching, GraphQL syntax, local state management, and 
more. We'll also be using Apollo Client with a 'React' application,
but Apollo also offers libraries for Vue, Angular, Meteor, Ember,
and Web Components

First, we'll want to ensure that our '.env' file contains a reference
to our local API URI. This will allow us to use our local API instance
in development, while pointing to our product API when we release our
applicaiton to a public web server. in our '.env' file, we should have 
`API_URI` variable with our local API server's address. 

```
API_URI=http://localhost:4000/api
```

Our code bundler, Parcel, is configured to automatically work with
'.env' files. Any time we want to reference and '.env' variable
in our code, we can use `process.env.VARIABLE_NAME`. This will allow
us to use unique values in lcoal development, production, and any other
environment that we may need (such as staging or continuous 
integration).

With the address stored in an environment variable, we are ready to
connect our web client to our API server. Working in our '/src/App.js'
file, first we need to import the Apollo packages that we'll be using:

```
// import Apollo Client libraries
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
```

With these imported, we can configure a new Apllo Client instance, passing
it the API URI, initiating the cache, and enabling the use of the local 
Apollo developer tools:

```
// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});
```

Finally, we can connect our 'React' appliction to our
Apollo Client by wrapping it in an `ApolloProvider`. 
We'll replace our empty 'div' tags with `<ApolloProvider>`
and include our client as a connection:

```
const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </Apolloprovider>
    );
};
```

afte we update our '/src/App.js' file, it should read as 
follows:

```
// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client libraries
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'; 

// import global styles
import GlobalStyle from '/components/GlobalStyle';
// import routes
import Pages from '/pages';

// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true  
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle/>
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

With our client connected to our API server, we can now integrate
GraphQL queries and mutations into our application.

// QUERYING AN API

When we query an API, we are requesting data. In a UI client, we
want to be able to query that data and display it to the user. Apollo
enables us to compose queries to fetch data. We can then update React
components to display the data to the end user. 

We can explore the use of queries by writing a `noteFeed` query, which
will return a feed of the latest notes to the user and display it on
the application's home page.

When teach is first writing a query, he finds the following process
useful:

1. Consider what data the query needs to return.
2. Write the query in the GraphQL Playground.
3. Integrate the query into the client application.

Let's follow this process in drafting our query. If you followed along 
in the API portion of the book, you may recall that the `noteFeed` query
returns a list of 10 notes along with a `cursor`, which indicates the
position of the last note returned, and has `NextPage` boolean, which
allows us to determine if there are additional notesto load.  We can view
our schema within the GraphQL Playground, allowing us to see all of the
data options avilable. For the query, we'll most likely require the 
following informaiton:

```
{
  cursor
  hasNextPage
  notes {
    id
    createdAt
    content
    favoriteCount
    author {
      id
      username
      avatar
    }
  }
}
```

Now, in our GraphQL Playground we can flesh this out into a GraphQL
query. We'll be writing this a bit more verbosely than the queries 
from a server chapter, by naming the query and providing an optional
variable named `cursor`. To use the GraphQL Playground, first ensure
that the API server is running, and then visit 
'http://localhost:4000/api'. In the GraphQL Playground, add the 
following query:

```
query noteFeed($cursor: String) {
  noteFeed(cursor: $cursor) {
    cursor
    hasNextPage
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
```

In the GraphQL Playground, also add a "query variable" to test out
the use of the variable:
```
{
  "cursor": ""
}
```

which returns the following output:

```
{
  "data": {
    "noteFeed": {
      "cursor": "631f5520c3c3e73c749bcc57",
      "hasNextPage": true,
      "notes": [
        {
          "id": "631f5520c3c3e73c749bcc60",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Non error nemo minus omnis iure. Magni placeat distinctio porro ut quasi sunt dolor et possimus. Officia aut aut quis sequi laudantium sit ut inventore ipsam.",
          "favoriteCount": 0,
          "author": {
            "username": "Sabina.Macejkovic",
            "id": "631f5520c3c3e73c749bcc41",
            "avatar": "https://www.gravatar.com/avatar/8203f1eeac90b384f0a4a8ffafa8dd18.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc5f",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Quia deleniti velit nostrum recusandae enim rerum. Aliquid porro modi voluptatum et qui. Aut voluptas dolor accusantium doloribus qui deserunt voluptate quia. Possimus exercitationem assumenda nulla dolorem.",
          "favoriteCount": 0,
          "author": {
            "username": "Adolf98",
            "id": "631f5520c3c3e73c749bcc46",
            "avatar": "https://www.gravatar.com/avatar/8ac2fd7461d929c87607f0820480d4ba.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc5e",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Voluptate non consequuntur. Nihil corporis qui aut numquam. Provident eos vitae. Voluptas esse animi. Veniam quia modi quis sunt consequatur quos architecto.",
          "favoriteCount": 0,
          "author": {
            "username": "Brittany.Nicolas",
            "id": "631f5520c3c3e73c749bcc40",
            "avatar": "https://www.gravatar.com/avatar/d04c1d335eb466917cddfbb9f14dd0c5.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc5d",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Voluptas corrupti esse sit est nam molestiae recusandae culpa. Exercitationem nam hic corrupti ipsa. Et ea et illum molestiae voluptatem iste aliquam.",
          "favoriteCount": 0,
          "author": {
            "username": "Bert56",
            "id": "631f5520c3c3e73c749bcc3e",
            "avatar": "https://www.gravatar.com/avatar/c2abbc98cbcbe8311280e65ce423b674.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc5c",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Consectetur autem ut omnis illo rerum autem. Officia voluptatibus suscipit iure dolores non minus optio et id. Dolor perspiciatis amet ea. Autem iusto eum voluptatem nisi. Minima tenetur minima modi sunt.",
          "favoriteCount": 0,
          "author": {
            "username": "Buster_Flatley37",
            "id": "631f5520c3c3e73c749bcc42",
            "avatar": "https://www.gravatar.com/avatar/b0cb01d0a98cbfc219d3684578191dae.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc5b",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Est libero sit est aut alias sint ut praesentium qui. Assumenda est reiciendis unde est vero aut aliquid molestias. Dicta nobis quia qui id est. Id sint qui voluptatibus tempore.",
          "favoriteCount": 0,
          "author": {
            "username": "Buster_Flatley37",
            "id": "631f5520c3c3e73c749bcc42",
            "avatar": "https://www.gravatar.com/avatar/b0cb01d0a98cbfc219d3684578191dae.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc5a",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Beatae necessitatibus quo ut debitis molestiae velit natus. Tempora eveniet doloremque quos in labore et. Rerum eius assumenda sint ullam aliquam non odit corrupti eaque. Similique nihil voluptatem. Ex laudantium dolore molestiae mollitia autem assumenda.",
          "favoriteCount": 0,
          "author": {
            "username": "Adolf98",
            "id": "631f5520c3c3e73c749bcc46",
            "avatar": "https://www.gravatar.com/avatar/8ac2fd7461d929c87607f0820480d4ba.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc59",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Et neque ducimus. Quaerat sed temporibus quam. Dolore vel molestiae corrupti qui et sed perspiciatis distinctio eos. Quis aut iusto et molestiae consequatur odit vel officia et. Et similique voluptatem.",
          "favoriteCount": 0,
          "author": {
            "username": "Lesly57",
            "id": "631f5520c3c3e73c749bcc3f",
            "avatar": "https://www.gravatar.com/avatar/22067513c09d87c3df7839078d5feb5d.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc58",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Consectetur temporibus ut placeat deleniti facilis ut fugiat voluptatum. Enim occaecati eos non qui porro. Illum odio vel ullam id vero nisi velit sit.",
          "favoriteCount": 0,
          "author": {
            "username": "Elinore55",
            "id": "631f5520c3c3e73c749bcc44",
            "avatar": "https://www.gravatar.com/avatar/7e763dc11af5f30da443b4d958e89d89.jpg?d=identicon"
          }
        },
        {
          "id": "631f5520c3c3e73c749bcc57",
          "createdAt": "2022-09-12T15:49:52.939Z",
          "content": "Molestiae labore eveniet sint similique cum veniam repudiandae. Rerum in incidunt et rerum. Modi aut voluptas in maiores beatae facere mollitia repudiandae. Consequatur in est qui animi doloribus iste similique.",
          "favoriteCount": 0,
          "author": {
            "username": "Buster_Flatley37",
            "id": "631f5520c3c3e73c749bcc42",
            "avatar": "https://www.gravatar.com/avatar/b0cb01d0a98cbfc219d3684578191dae.jpg?d=identicon"
          }
        }
      ]
    }
  }
}
```

Now that we know that our query is properly written, we can confidently
integrate it into our web application. in the '/src/pages/home.js' file, 
import the `useQuery` library as well as the GraphQL syntax via the `gql`
library from `@apollo/client`:

```
// import the required libraries
import { useQuery, gql } from '@apollo/client';

// our GraphQL query, stored as a variable
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
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
```

Now we can integrate the query into our 'React' application. To
do this, we'll pass our GraphQL query string to Apollo's `useQuery`
'React' hook. Our hook will return an object containing one of the
following values:

`data`
  The data returned by the query, if successful.

`loading`
  the loading state, which is set to `true` when the data is being
  fetched. This allows us to display a loading indicator to our users.

`error`
  If our data fails to fetch, an error is returned to the application.

We can update our `Home` component to include our query:

```
const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an `error message`:
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI:
  return (
    <div>
      {console.log(data)}
      The data loaded!
    </div>
  );
};
```


If one has done everything correctly, one should see a "The data loaded!" 
message on the home page of our application (Figure 14-2). We've also 
included a `console.log` statement, which will print our data to the 
borrower console. Taking a look at the structure of data results can be 
a helpful guidepost whne integrating data into our application!

Now, let's integrate the data we receive into the application. To do this,
we will `map` over the array of notes returned whithin our `data` object.
'React' requires that each result be assigned a unique key, for which we'll
use the individual note's ID. To begin, we'll display the username of the
author for each note:

```
import React from 'react';

import Button from '../components/Button';

// import the required libraries
import { useQuery, gql } from '@apollo/client';

// our GraphQL query, stored as a variable
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
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

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an `error message`:
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI:
  return (
    <div>
      {data.noteFeed.notes.map(note => (
        <div key={note.id}>{note.author.username}</div>
      ))}
      <p>This is the home page</p>
      <Button>Click me!</Button>
    </div>
  );
};


export default Home;
```

> TECHNICAL: 'Using JS' `map` method': If one hasn't wokred with JS
`map` method before the syntax can be a bit intimidating at first. The
`map` method allows one to perform an action for items within an array.
This can be incredibly useful when one is working with data returned 
from an API, allowing you to perform actions such as displaying each
item in a certain way within the template. To learn more about `map`,
teach recommends reading the MDN web docs guide:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Now that we have successfully mapped over our data, we can write the rest
of our component. Since our notes are written in Markdown, let's import a
library that will allow us to render Markdown to the page:

in our '/src/pages/homes.js' we can update it as follows:

```
import ReactMarkdown from 'react-markdown';
```

Now we can upate our UI to include the author's avatar, the author's username,
the date the note was created, the number of favorites that a note has, and
finally the content of the note itself. In '/src/pages/homes.js':

```
// if the data is successful, display the data in our UI
return (
  <div>
    {data.noteFeed.notes.map(note => (
      <article key={note.id}>
      <img
        src={note.author.avatar}
        alt={`${note.author.username} avatar`}
        height="50px"
      />{' '}
      {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
      <ReactMarkdown source={note.content} />
      </article>
    ))}
  </div>
);
```

> WISDOM: Whitespace in 'React' -- 'React' strips the whitespace between
elements on new lines. Using `{' '}` in our markup is a way of manually
adding whitespace.

You should now see a complete list of notes in your browser. Before we 
move on to styling them, however, there is an opportunity for a small 
refactor. This is our first page displaying notes, but we know that we
will be making several more. On other pages we will need to display
individuals notes, as well as feeds of other note types (such as "my
notes" and "favorites"). Let's go ahead and create two new components:
'/src/components/Note.js' and '/src/components/NoteFeed.js'

In '/src/components/Note.js', we'll include the markup for an individual
note. To accomplish this, we'll pass each of our component functions a
property containing the appropriate content.

```
import React from 'react';
import ReactMarkdown from 'react-markdown';

const Note = ({ note }) => {
  return (
    <article>
      <img
      src={note.author.avatar}
      alt="{note.author.username} avatar"
      // alt={`${note.author.username} avatar`}
      height="50px"
      />{' '}
      {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
      <ReactMarkdown source={note.content} />
    </article>
  );
};

export default Note;
```

now for hte 'src/components/NoteFeed.js':

```
import React from "react";
import Note from "./Note";

const NoteFeed = ({ notes }) => {
    return (
        <div>
            {notes.map(note => (
                <div key={note.id}>
                    <Note note={note} />
                </div>
            ))}
        </div>
    );
};

export default NoteFeed;
```

Finally, we update the '/src/pages/home.js' component to reference our `NoteFeed`:

```
import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
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

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore }  = useQuery(GET_NOTES);

  // if the data is loading, displayl a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI
  return <NoteFeed notes={data.noteFeed.notes} />;
}

export default Home;
```

Whit this refactor, we'll now be able to easily re-create note and 
note feed instances across our application!

before we update '/src/pages/home.js', we have to see what
it looked like before:

```
import React from 'react';

import Button from '../components/Button';

// import the required libraries
import { useQuery, gql } from '@apollo/client';

import ReactMarkdown from 'react-markdown';

// our GraphQL query, stored as a variable
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
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

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an `error message`:
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI:
  return (
    <div>
      {data.noteFeed.notes.map(note => (
        <article key={note.id}>
        <img
          src={note.author.avatar}
          alt={`${note.author.username} avatar`}
          height="50px"
        />{' '}
        {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
        <ReactMarkdown source={note.content} />
        </article>
      ))}
      <p>This is the home page</p>
      <Button>Click me!</Button>
    </div>
  );
};


export default Home;
```

ok, tested the code after the refactor, and it still works!

// SOME STYLE

Now that we have written our components and can view our data, we
can add soem style. One of the most obvious opportunities for improvement
is in the way that our "created at" date displays.  To address this, we'll
use the `date-fns` library,:

http://date-fns.org

which provides small components for working with dates in JS. In
'/src/components/Note.js', import the library and update the date
markups to apply the conversion as follows:

```
// import the format utility from `date-fns`
import { format } from 'date-fns';

// update the date markup to format it as Month, Day, and Year
// {format(note.createdAt, 'MMM Do YYYY')} Favorites: {' '}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  mrgin: 0 auto;
`;

// Style the note metadata
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: tpo;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align 'UserActions' to the right on larger screens
const UserActions = styled.div`
  margin-left: auto;
`;

const Note = ({ note }) => {
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
          src={note.author.avatar}
          alt="{note.author.username} avatar"
          // alt={`${note.author.username} avatar`}
          height="50px"
          />  
        </MetaInfo>
        <MetaInfo> 
          <em>by</em>{note.author.username} <br />  
          {format(note.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        <UserActions>
        <em>Favorites:</em> {note.favoriteCount}
        </UserActions>  
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
```

We would also be well served to add some space and a light
border between the notes in our 'NoteFeed.js' component:

```
import React from "react";

import styled from "styled-components";

const NoteWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid #f5f4f0
`;

import Note from "./Note";

const NoteFeed = ({ notes }) => {
    return (
        <div>
            {notes.map(note => (
                <NoteWrapper key={note.id}>
                    <Note note={note} />
                </NoteWrapper>
            ))}
        </div>
    );
};

export default NoteFeed;
```

with these updates, we've introduced layout styles ot our 
application!

let's test it out! ok it worked!!

// DYNAMIC QUERIES

Currently, our application consists of three routes, each of
which is static. These routes are located at a static URL and
will always make the same data request. However, applications
commonly need dynamic routes and queries based upon those 
routes. As an example, every twee on Twitter.com is assigned
a unique URL at at `twitter.com/<username>/status/<tweet_id>`
This allows users to link and share individual tweets both
within the Twitter ecosystem as well as anywhere on the web.

Currently, in our application notes can only be accessed
within a feed, but we want to allow users to view and link
to individual notes. To acccomplish this we'll set up dynamic
routing in our 'React' application as well as an individual
note GraphQL query. Our goal is for users to be able to access
routes at /note/<note_id>

To begin, we'll create a new page component at 
'src/pages/note.js'. We will pass our `props` (property) to
the component, which includes the `match` property via
'React' Router. This property contains information about how
the route path matches the URL. This will give us access to
the URL parameters through `match.params`.

```
import React from 'react';

const NotePate = props => {
  return (
    <div>
      <p>ID: {props.match.params.id}</p>
    </div>
  );
};

export default NotePage;
```

Now we can add a corresponding route to our 'src/pages/index.js'
file. This route will include an 'ID' paremter indicated with `:id`:

```
// import React and routing dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import shared layout component
import Layout from '../components/Layout';

// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

// define routes
const Pages = () => {
  return (
    <Router>
      <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/mynotes" component={MyNotes} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/note/:id" component={NotePage} />
      </Layout>
    </Router>
  );
};

export default Pages;
```

Now, visiting `http://localhost:1234/note/123 will print `ID: 123` 
to our page. To test it out, replace the `id` parameter with
anything of your choosing, such as `/note/pizza` or 
`/note/GONNAPARTYLIKE1999`. This is pretty cool, but not very useful.

so tested this functionality and it worked!

Let's update our '/src/pages/note.js' component ot make 'GraphQL' 
for the note with the 'id' found in the URL. To do this, we'll use 
the note query from our API as well as our 'Note' 'React' component.

```
import React from 'react';
// import GraphQL dependencies
import { useQuery, gql } from '@apollo/client';

// import the Note component
import Note from '../components/Note';

// the note query, which accepts an ID variable
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

const NotePage = props => {
  // store the id found in the url a a variable
  const id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;

  // if the data is successful, display the data in our UI
  return <Note note={data.note} />;
};

export default NotePage;
```

Now navigating to a URL with an id parameter will render either
the corresponding note or an error message. Finally, let's update 
our '/src/components/NoteFeed.js' component to displayl a link to 
the individual note in the UI.

// First, at the top of the file, import `{Link}` from 'React Router'
import { Link } from 'react-router-dom';

// Then update the JSX to include a link to the note page as follows:

```
    <NoteWrapper key={note.id}>
      <Note note={note} />
      <Link to={`note/${note.id}`}>Permalink</Link>
    </NoteWrapper>
```

With this, we are using dynamic routes in our application and enabling
users to view individual notes. 

tested and it worked! (10/07/2022)

// PAGINATION

Currently, we are only retrieving 10 most recent notes within our application
home page. If we want to display additional notes, we need to enable pagination.
One may recall from the beginning of this chapter and the development of the
API server that our API returns a `cursor`, which is the `ID` of the last note
returned in a page of results. Additionally, the API returns the `hasNextPage`
boolean, which is `true` if there are additional notes found in our database. 
When making a request to our API, we can pass it a cursor argument, which will 
return the next 10 items.

In other words, if we have a list of 25 objects (with corresponding IDs of 1-25),
when we make an initial request it will return items 1-10 as well as `cursor`
value of 10 and a `hasNextPage` value of `true`. If we make a request, passing a
`cursor` value of 10, we will receive items 11-20, with a cursor value of 20 and 
a `hasNextPage` value of `true`. Finally, if we make a third request, passing it 
a `cursor` value of 20, we will receive items 21-25, with a `cursor` value of 25
and a `hasNextPage` value of `false`. This is exactly the logic we'll be 
implementing within our `noteFeed` query.

To do this, we will upate our '/src/pages/home.js' file to make paginated 
queries. In our UI, when a user clicks a 'See More' button, the next 10 notes
should load on the page. We'll want this to happen without any page refreshes.
To do this we need to inlude the `fetchMore` argument within our query 
component and display the `Button` component only when `hasNextPage` is true.
For now we'll write this directly into our home page component, but it could 
easily be isolated into its own component or become part of the `NoteFeed` 
component. 

```
// if the data is successful, display the data in our UI
return (
  // add a <React.Fragment> element to provide a parent elmeent
  <React.Fragment>
    <NoteFeed notes={data.noteFeed.notes} />
    {/<asterisk> Only display the Load More button if hasNextPage is true <asterisk>/}
    {data.noteFeed.hasNextPage && (
      <Button>Load more</Button>
    )}
    </React.Fragment>
);
```

> CONDITIONALS IN REACT: In the previous example we are conditionally displaying the
"Load more" button using an inline `if` statment with the `&&` operator. If `hasNextPage`
is true, the button is displayed. One can read more about conditional rendering in
the official React docs:
https://reactjs.org/docs/conditional-rendering.html

Now we can update the `Button` component using an `onClick` handler.
When a user clicks the button, we'll want to use the `fetchMore` method 
to make an additional query and append the returned data to our page

```
{data.noteFeed.hasNextPage && (
  // onClick perform a query, passing the current cursor as a variable
  <Button
    onClick={() =>
      fetchMore({
        variables: {
          cursor: data.noteFeed.cursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            noteFeed: {
              cursor: fetchMoreResult.noteFeed.cursor,
              hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
              // combine the new results and the old
              notes: [
                ...previousResult.noteFeed.notes,
                ...fetchMoreResult.noteFeed.notes
              ],
              __typename: 'noteFeed'
            }
          };
        }
      })
    }
  >
    Load more
  </Button>
)}
```

tested notefeed button, but still displaying, error
in query, returning null for non-nullable! Note.author?
# HERE -- p. 152!, perhaps some notes were created prior to
having registered a user!

The previous code might look a little gnarly, so let's break it down.
Our `Button` component include an `onClick` handler. When the button
is clicked, a new query is executed using the `fetchMore` method,
passing the `cursor` value returned in the previous query. Once 
returned, `updateQuery` is executed, which updates our `cursor`
and `hasNextPage` values and combines the results into a single array.
The `__typename` is the name of the query, which is inlcuded in 
Apollo's results.

With this change, we are able to view all of the notes form our note
feed. Try it out yourself by scrolling to the bottom of your note 
feed. If yoru database contains more than 10 notes, the button will
be visible. Clicking 'Load more' will add the next `noteFeed` result
to the page.

// CONCLUSION

We've covered a lot of ground in this chapter. We've set up Apollo
Client to work with our 'React' applicaton and integrated multiple
GraphQL queries into our UI. The power of GraphQL is demonstrated
in the ability to write single queries that return precisely the data
that a UI requires. In the next chapter we'll integrate user 
authentication into our application, allowing users to log in and 
view their notes and favorites. 

fetchMore method: 
https://www.apollographql.com/docs/react/data/queries/

# HERE -- p. 152!


*/