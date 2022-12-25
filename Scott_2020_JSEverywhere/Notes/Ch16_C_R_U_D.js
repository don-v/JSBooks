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

# HERE -- p. 181!

*/