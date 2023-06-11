import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

// HERE -- p. 288!

const SignIn = props => {
    // store the token with a key value of `token`
    // after the token is stored navigate to the app's `main` screen
    const storeToken = () => {
        SecureStore.setItemAsync('token', 'abc').then(
            props.navigation.navigate('App')
        );
    };

    return (
        <View>
            <UserForm />
        </View>
    );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;