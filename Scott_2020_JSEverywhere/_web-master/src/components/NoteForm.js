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
            // HERE -- p. 178!
        })
    }
}