import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

import { useMutation, useApolloClient, gql } from '@apollo/client';

const SIGNUP_USER  = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%,
        margin-bottom: 1em;
    }
`;


// include the props passed to the component for later use
const SignUp = () => {
    // set the default state of the form
    const [values, setValues] = useState();

    // update the state when a user types in the form
    const onChange = event => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            });
        };

        useEffect(() => {
            // update the document title
            document.title = 'Sign Up - Notedly';
        });

        // add the mutation hook
        const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
            onCompleted: data => {
                // console.log the JSON Web Token when the mutation is complete
                console.log(data.signUp)
                // store the JWT in localstorage
                localStorage.setItem('token', data.signUp);
                // redirect the user to hte homepage
                props.history.push('/');
            }
        });

        return (
            <Wrapper>
            <h2>Sign Up</h2>
             {/* pass the form data to the mutation when a user submits the form  */}
                <Form
                    onSubmit={event => {
                        event.preventDefault();
                        signUp({
                            variables: {
                                ...values
                            }
                        });
                    }}
                >
                    <label htmlFor="username">Username:</label>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={onChange}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Wrapper>
        );
    };

export default SignUp;