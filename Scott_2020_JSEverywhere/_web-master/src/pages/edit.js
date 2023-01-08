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
  const { loading, error, data } = useQery(GET_NOTE, { variables: { id }});

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;
  // HERE -- p. 187!
}