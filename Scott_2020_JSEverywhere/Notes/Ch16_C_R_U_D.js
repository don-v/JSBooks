/* 
CHAPTER 16: CREATE, READ, UPDATE, AND DELETE OPERATIONS

Our 'Notedly' application is a CRUD (create, read, update, delete) 
application. An authenticated user can create new notes, read notes,
update a note's contents or if a note is favorited or not, and delete
a note. In this chapter, we implmement this CRUD functionality within
our web user interface. To accomplish these tasks, we'll be writing
GraphQL mutations and queries.

// CREATING NEW NOTES

Currently, we have the means to view notes, but not a way to create
them. This is akin to having a notebook without a pen. Let's add 
the ability for users to create new notes. We'll do this by creating
a `textarea` form in which users can write the note. When the user
submits the form, we'll perform a GraphQL mutation to create the note
in our database.

To begin, we create a `NewNote` component at '/src/pages/news.js':

here is the updated source for our '/src/pages/new.js' page:

```
import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const NewNote = props => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note -- Notedly';
    });

    return <div>NewNote</div>;
};

export default NewNote;
```

Next, let's set up the new route in our '/src/pages/index.js' file:

```
// import the NewNote route component
import NewNote from './new';

// add a private route to our list of routes, within the
<PrivateRoute path="/new" component={NewNote} />
```

We know that we'll be both creating new notes as well as updating 
existing notes. To accomodate this behavior, let's create a new
component called `NoteForm`, which will serve as the markup and 
'React' state for note form editing.

We'll creat a new file '/src/components/NoteForm.js'. The component
will consist of a form element containing a text area along with
some minimal styles. The functionality will be much like our 
`UserForm` component:

```
import React, {  useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled .div`
    height: 100%;
`;

const Form = styled.form`
    height: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 90%;
`;

const NoteForm = props => {
    // set the default state of the form
    const [value, setValue] = useState({ content: props.content || '' });

    // update the state when a user types in the form
    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note content"
                    value={value.content}
                    onChange={onChange}
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    );
};

export default NoteForm;
```

Next, we will need to reference our `NoteForm` component in our `NewNote`page
component. So in our '/src/pages/new.js' file:

```
import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
// import the `NoteForm` component
import NoteForm from '../components/NoteForm';

const NewNote = props => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note -- Notedly';
    });

    return <NoteForm />;
};

export default NewNote;
```

With these updates, if we navigate to `http://localhost:1234/new`, 
we our NoteForm will be displayed!

# HERE -- p. 180!, test didn't work, added private route to
'/src/pages/index.js'

was able to log in, but not able to logout!

With the form complete, we can go about writing our mutation to
create the new note. In '/src/pages/new.js':

```
import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
// import the `NoteForm` component
import NoteForm from '../components/NoteForm';

// our new note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note -- Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        onCompleted: data => {
            // when complete, redirect user to the note page
            props.history.push(`note/${data.newNote.id}`);
            }
    });

    return (
        <React.Fragment>
            //  as the mutation is loading, dispaly a loading message 
            {loading && <p>Loading...</p>}
            //  if there is an error, display an error message 
            {error && <p>Error saving the note</p>}
            //  the form component, passing the mutation data as a propr 
            <NoteForm action={data}/>;
        </React.Fragment>
    );
};

export default NewNote;
```

logout not working properly!
but we were able to save a note for a new logged in user!

examin logout in 'final'!; still working, p. 181!, studying
header!; p. 181! everything looks good, keep looking!

12/26/2022 -- continue with book for now.

In the previous code, we perform a `newNote` mutation when
the form is submitted. If the mutation is successful, the use
is redirected to the individual note page. One may notice
that the `newNote` mutation requests quite a bit of data. This
matches the data requested by the `note` mutation, ideally
updating Apollo's cache for quick navigation to the individual
note component.

As mentioned earlier, Apollo aggressively caches our queries,
which is helpful for speeding up our application's navigation.
Unfortunately, this also means a user could visit a page and
not see an update they've made. We can manually update Apollo's
cache, but an easier way to accomplish this is to use Apollo's
refetchQueries feature to intentionallly update the cache 
when performing a mutation. To do this, we'll need access to our
prewritten queries. Up until now, we've been including them at
the top of a component file, but let's move them to their own 
'query.js' file. Create a new file at '/src/gql/query.js' and
add each of our note queries as well as our `IS_LOGGED_IN` 
query:

```
import { gql } from '@apollo/client';

const GET_NOTES = gql`
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
`;

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

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

export { GET_NOTES, GET_NOTE, IS_LOGGED_IN};
```

> TRICKS/TIPS: Reusable Queries and Mutations -- Moving forward, we will keep
all of our mutations separate from our components. This will allow us to 
easily reuse them in our application and is also useful for mocking
during testing!

Now in '/src/pages/new.js', we can request that our mutation refetch 
the `GET_NOTES` query by importing the query and adding the `refetchQueries`
option:

```
import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
// import the `NoteForm` component
import NoteForm from '../components/NoteForm';

// import the query
import { GET_NOTES } from '../gql/query';

// our new note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note -- Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // refetch the GET_NOTES query to update the cache
        refetchQueries: [{ query: GET_NOTES}],
        onCompleted: data => {
            // when complete, redirect user to the note page
            props.history.push(`note/${data.newNote.id}`);
            }
    });

    return (
        <React.Fragment>
            // as the mutation is loading, dispaly a loading message 
            {loading && <p>Loading...</p>}
            // if there is an error, display an error message 
            {error && <p>Error saving the note</p>}
            // the form component, passing the mutation data as a propr 
            <NoteForm action={data}/>;
        </React.Fragment>
    );
};

export default NewNote;
```

Our final step will be to add a link to our `/new` page, so that users
can easily navigate to it. In the '/src/components/Navigation.js' file,
add a new link items as follows:

```
<li>
    <Link to="/new">New</Link>
</li>
```

With this, our users are able to navigate to the new note page, type
a note, and save the note to the database.

// READING USER NOTES

Our application is currently capable of reading our note feed as well 
as individual notes, but we are not yet querying the notes of authenticated
users. Let's write two GraphQL queries to create a feed of notes by the user
as well as their favorites.

in '/src/gql/query.js', add a `GET_MY_NOTES` query and update the exports
like so:

```
import { gql } from '@apollo/client';

const GET_NOTES = gql`
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
`;

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

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

// add the GET_MY_NOTES query:
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

export { GET_NOTES, GET_NOTE, IS_LOGGED_IN, GET_MY_NOTES };
```

Now, in '/src/pages/mynotes.js', we import the query and display
the notes using the `NoteFeed` component:

so, after udating the page, the source is as follows:

```
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';


const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes - Notedly';
  });

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there aren't notes, display a message
  if (data.me.notes.length !==0) {
    return <NoteFeed notes={data.me.notes}/>
  } else {
    return <p>No notes yet</p>
  }
};

export default MyNotes;

```

We repeat this process for create the "favorites" page. First, in
'/src/gql/query.js', we update the source as follows:

```
import { gql } from '@apollo/client';

const GET_NOTES = gql`
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
`;

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

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

// add the GET_MY_NOTES query:
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

// add the GET_MY_FAVORITES query:
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

// update to include GET_MY_FAVORITES
export { GET_NOTES, GET_NOTE, IS_LOGGED_IN, GET_MY_NOTES, GET_MY_FAVORITES };
```

Now, in '/src/pages/favorites.js', we update the source as follows:

```
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';

// import the query
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />
  } else {
    return <p>No favorites yet</p>;
  }
  
};

export default Favorites;

```

Finally, let's update our '/src/pages/new.js' file to refetch the GET_MY_NOTES 
query, to ensure that a cached list of user notes is updated when the note
is created. In '/src/pages/new.js', first update the GraphQL query import 
statement:

```
import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
// import the `NoteForm` component
import NoteForm from '../components/NoteForm';

// import the query
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

// our new note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note -- Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // refetch the GET_NOTES  and GET_MY_NOTES query to update the cache
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            // when complete, redirect user to the note page
            props.history.push(`note/${data.newNote.id}`);
            }
    });

    return (
        <React.Fragment>
            // as the mutation is loading, dispaly a loading message 
            {loading && <p>Loading...</p>}
            // if there is an error, display an error message 
            {error && <p>Error saving the note</p>}
            // the form component, passing the mutation data as a propr 
            <NoteForm action={data}/>;
        </React.Fragment>
    );
};

export default NewNote;
```

With these changes, we now can perform all the read operations within
our application. 

# HERE -- p. 186!

*/