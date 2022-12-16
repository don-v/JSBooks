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