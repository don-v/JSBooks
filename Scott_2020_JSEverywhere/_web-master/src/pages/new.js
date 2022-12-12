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