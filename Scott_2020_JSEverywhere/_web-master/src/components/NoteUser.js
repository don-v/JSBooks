import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// import our `GET_ME` query
import { GET_ME } from '../gql/query';
// import the `DeleteNote` component
import DeleteNote from'./DeleteNote';
// import the FavoriteNote component
import FavoriteNote from './FavoriteNote';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there's an error fetching the data, dislpay an error message
    if (error) return <p>Error!</p>;
    
    return (
        <React.Fragment>
            <FavoriteNote
                me={data.me}
                noteId={props.note.id}
                favoriteCount={props.note.favoriteCount}    
            />
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edit</Link> <br />
                    <DeleteNote noteId={props.note.id} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default NoteUser;