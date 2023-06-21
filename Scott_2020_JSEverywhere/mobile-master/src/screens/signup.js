import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

// signUp GraphQL mutation
const SIGNUP_USER = gql`
    mutation signUp($email: String!, &username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

// update `storeToken` function to store a token string passed as a
// parameter

const SignUp = props => {
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's `main` screen
    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('App')
        );
    };

    // the signUp mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            storeToken(data.signUp)
        }
    })

    // if loading, return a loading indicator
    if (loading) return <Loading />;
    
    return (
        <React.Fragment>
            {error && <Text>Error signing in!</Text>}
            <UserForm 
                action={signUp}
                formType="signUp"
                navigation={props.navigation}
            />
        </React.Fragment>
    );
}

SignUp.navigationOptions = {
    title: 'Register'
};

export default SignUp;