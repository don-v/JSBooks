import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

// add our GraphQL query
const SIGNIN_USER = gql`
    mutation signIn($email: String, $password, String!) {
        signIn(email: $email, password: $password)
    }
`;

// update `storeToken` function to store a token string passed as a
// parameter

const SignIn = props => {
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's `main` screen
    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('App')
        );
    };

    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            storeToken(data.signIn)
        }
    })

    // if loading, return a loading indicator
    if (loading) return <Loading />;
    return (
        <React.Fragment>
            {error && <Text>Error signing in!</Text>}
            <UserForm 
                action={signIn}
                formType="signIn"
                navigation={props.navigation}
            />
        </React.Fragment>
    );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;