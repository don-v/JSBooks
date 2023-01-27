import React from 'react';
import { userMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

const DeleteNote = props => {
    return <ButtonAsLink>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote)