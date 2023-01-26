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

so had an error accessing in page/mynotes.js, line 15 -- loading,
never made the query!

ok, so 'mynotes' works!

when i sign in, then logout, we get signout. but sometimes,
we can still click mynotes, without signing in?!

need to figure that out!

// UPDATING NOTES

Currently once a user writes a note, they have no way to make
an update to it. To address this, we want to enable note editing
in our application. Our GraphQL API has an `updateNote` mutation, 
which accepts a note ID and content as parameters. If the note
exists in the database, the mutation will update the stored 
content with the content sent in the mutation.

In our application, we can create a route at `/edit/<NOTE_ID>`
that will place the existing note content in a form `textarea`.
When a user clicks 'Save', we'll submit the form and perform
the `updateNote` mutation.

Let's create a new route where our notes will be edited. To 
begin, we can make a duplicate of our 'src/pages/notes.js' page
and name it 'edit.js'. For now, this page will simply display
the note.

in '/src/pages/edit.js':

```
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'

// import the Note component
import Note from '../components/Note';
// import the `GET_NOTE` query
import { GET_NOTE } from '../gql/query';

const EditNote = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our note query
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;
  // if successful, pass the data to the note coomponent
  return <Note note={data.note} />;
};

export default EditNote;
```

Now, we can make the page navigable by adding it to our routes in
'/src/pages/index.js':

```
// import the edit page component:
import EditNote from './edit';

// add a new private route that accepts an `:id` parameter
<PrivateRoute path="/edit/:id" component={EditNote} />
```

our '/src/pages/index.js' page now look as follows:

```
// import React and routing dependencies
import React from 'react';
// update our react-router import to include `Redirect`
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import shared layout component
import Layout from '../components/Layout';

// import the sign-in page component
import SignIn from './signin';


// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

// import the signup route
import SignUp from './signup';

// import the NewNote route component
import NewNote from './new';

// import the edit page component
import EditNote from './edit';

import { useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// define routes
const Pages = () => {
  return (
    <Router>
      <Layout>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/mynotes" component={MyNotes} />
          <PrivateRoute path="/favorites" component={Favorites} />
          // add a private route to our list  of routes, within the 
          <PrivateRoute path="/new" component={NewNote} />
          // add a new private route that accepts an `:id` parameter 
          <PrivateRoute path="/edit/:id" component={EditNote} />
          <Route path="/note/:id" component={NotePage} />
          // within the Pages component add the route 
          <Route path="/signup" component={SignUp} />
          // add a signin route to our routes list 
          <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the user is logged in, route them to the requested component
  // else redirect them to the sign-in page
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;
```

With this, if one navigates to a note page at '/note/<note-id>' and swap
it for /edit/<note-id>', ( so identical note ids ), one will see a render
of the note itself. Let's change this so that it instead displays the note
content presented in a form's `textarea`:

In '/src/pages/edit.js', remove the import statement of the `Note` 
component and replace it with the `NoteForm` component:

```
// import the NoteForm component
import NoteForm from '../components/NoteForm';
```

# HERE -- p. 187!

Now we can udpate our `EditNote` component to use our editing form. We can
pass the content of the note to our form component by using the `content`
property. Through our GraphQL mutation will accept updates only from the 
original author, we can also limit displaying the form to the note's author, 
to aviod confusing other users.

First, add a new query to the '/src/gql/query.js' file to get the current
user, their user ID, and a list of favorited note IDs:

so after updating our '/src/gql/query.js` file, our source
looks as follows:

```
import { gql } from '@apollo/client';

// add GET_ME to our queries
const GET_ME = gql`
    query me {
        me {
            id
            favorites {
                id
            }
        }
    }
`;

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

// update to include GET_ME
export { 
    GET_NOTES, 
    GET_NOTE, 
    GET_MY_NOTES, 
    GET_MY_FAVORITES,
    GET_ME, 
    IS_LOGGED_IN
};
```

Now, in '/src/pages/edit.js', we import the `GET_ME` query
we just implemented and include a user check:

# HERE -- p. 188!

after updating '/src/pages/edit.js', our source looks as follows:

```
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'

// import the Note component
// import Note from '../components/Note';

// import the NoteForm component
import NoteForm from '../components/NoteForm';

// import the queries from query
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our note query
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});
  // fetch the current user's data
  const { data: userdata } = useQuery(GET_ME);
  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;
  // if the current user and the author of the note do not match
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  // pass the data to the form component
  return <NoteForm content={data.note.content} />;
};

export default EditNote;
```

We are now able to edit a note in the form, but clicking
the button does not yet save our changes. Let's write our
GraphQL `updateNote` mutation. Similar to our file of queries,
let's create a file to hold our mutations. In '/src/gql/mutation.js',
add the following:

once the file is updated, it has the following source:

```
import { gql } from '@apollo/client';

const EDIT_NOTE = gql`
    mutation updateNote($id: ID!, $content: String!) {
        updateNote(id: $id, content: $content) {
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

export { EDIT_NOTE };
```

With our mutation written, we can import it and update our
component code to call the mutation whe the button is clicked.
To do this, we will add a `useMutation` hook. When the mutation
is complete, we'll redirect to the note page:

this appears to bee in the '/src/pages/edit.js' file, so
more a route than component:, after updating it, the 
source will look as follows:

```
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'

// import the Note component
// import Note from '../components/Note';

// import the NoteForm component
import NoteForm from '../components/NoteForm';

// import the queries from query
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our note query
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});
  // fetch the current user's data
  const { data: userdata } = useQuery(GET_ME);
  // define our mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/$(id)`);
    }
  });
  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;
  // if the current user and the author of the note do not match
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  // pass the data to the form component
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
```

Finally, we want to display an 'Edit' link to users, but only if they
are the author of the note. In our application, we will need to check
to ensure that the ID of the current user matches the id of the note
author. To implement this behavior, we'll be touching several components.

Now we could implement our functionality direclty within the `Note` 
component, but let's instead create a component specifically for 
logged-in user interactions at '/src/components/NoteUser.js'. In this 
'React' component we will perform a GraphQL query for the current user
ID and provide a routable link to the edit page. With this information, 
we can begin by including our required libraries and setting up a new
'React' component. Within the 'React' component, we will include an 
'Edit' link, which will route the user to the edit page for the note.
For now, the user will see this link regardless of who owns the note.

Update '/src/components/NoteUser.js' as follows:

```
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const NoteUser = props => {
    return <Link to={`/edit/${props.note.id}`}>Edit</Link>;
};

export default NoteUser;
```

Next, we will update our `Note` component to perform a local
`isLoggedIn` state query. We can then conditionally redner 
our `NoteUser` component based on teh logged-in state of the
user. 

Let's first import the GraphQL libraries to perform the query
along with our `NoteUser` component. In '/src/components/Note.js',
add teh following to the top of the file:

```
import { useQuery } from '@apollo/client';

// import logged in user UI components
import NoteUser from './NoteUser';
// import the IS_LOGGED_IN local query
import { IS_LOGGED_IN } from '../gql/query';
```

Now, we can update our JSX component to check the logged-in
state. If the user is logged in, we'll display the `NoteUser`
component; otherwise, we'll display the favorite count.

```
updating Note component, p. 191!
```

now, the `Note` component has been updated. It now has the
following source:

```
// import the format utility from `date-fns`
// import { format } from 'date-fns';

// update the date markup to format it as Month, Day, and Year
// {format(note.createdAt, 'MMM Do YYYY')} Favorites: {' '}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';

// import logged in user UI components
import NoteUser from './NoteUser';
// import the IS_LOGGED_IN local query
import { IS_LOGGED_IN } from '../gql/query';

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
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
          src={note.author.avatar}
          // alt="{note.author.username} avatar"
          alt={`${note.author.username} avatar`}
          height="50px"
          />  
        </MetaInfo>
        <MetaInfo> 
          <em>by</em> {note.author.username} <br />  
          {format(note.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>  
        )}        
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
```

> 'Unauthenticated Edits': Though we will be hiding the edit link in
the UI, users could still navigate to a note's edit screen without
being the note owner. Thankfully, our GraphQL API is designed to 
prevent anyone but the note owner from editing the note's content. 
Though we won't be doing it in this book, a good additional step 
would be to update the 'src/page/edit.js' component to redirect a 
if they are not the note owner!

With this change, logged-in users are able to see an edit link at
the top of each note. Clicking the link will navigate to an edit
form, regardless of who is the owner of the note. Let's address this
by updating our `NoteUser` component to query for the current user's
ID and display the edit link only if it matches the ID of the note
author.

First in '/src/components/NoteUser.js' add the following:

```
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// import our `GET_ME` query
import { GET_ME } from '../gql/query';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there's an error fetching the data, dislpay an error message
    if (error) return <p>Error!</p>;
    return (
        <React.Fragment>
            Favorites: {props.note.favoriteCount}
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edit</Link>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default NoteUser;
```

With this change, only the note's original author will see the edit
link in the UI!

Tested, this, and it worked. saw edit link when logged in for 
the note, but when logged out, clicked on same note, edit link
was not visible!

### DELETING NOTES

Our CRUD application is still missing the ability to delete a note.
We can write a button UI component that, when clicked, will perform
a GraphQL mutation, deleting the note. Let's start by creating a new
component at 'src/components/DeleteNote.js':

// HERE -- p. 193!

{
    username: 'world_lover2',
    email: 'world_lover2@example.com',
    password: 'password12345'    
}

*/