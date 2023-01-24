import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// import our `GET_ME` query
import { GET_ME } from '../gql/query';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    // if the data is loading, display a loading message
    // HERE -- p. 192!
    return <Link to={`/edit/${props.note.id}`}>Edit</Link>;
};

export default NoteUser;