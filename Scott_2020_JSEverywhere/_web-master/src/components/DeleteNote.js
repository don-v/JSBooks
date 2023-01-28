import React from 'react';
import { userMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
// import the `DELETE_NOTE` mutation
import { DELETE_NOTE } from '../gql/mutation';
// import queries to refetch after note deletion
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
// HERE -- p. 193!

const DeleteNote = props => {
    return <ButtonAsLink>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote)