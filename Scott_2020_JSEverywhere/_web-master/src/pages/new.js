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
            {/* as the mutation is loading, dispaly a loading message */}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display an error message */}
            {error && <p>Error saving the note</p>}
            {/* the form component, passing the mutation data as a propr */}
            <NoteForm action={data}/>;
        </React.Fragment>
    );
};

export default NewNote;