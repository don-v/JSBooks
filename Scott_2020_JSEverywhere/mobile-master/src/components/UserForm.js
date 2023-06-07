import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <View>
            <Text>Email</Text>
            <TextInput onChangeText={text => setEmail(text)} value={email} />
            <Text>Password</Text>
            <TextInput onChangeText={text => setPassword(text)} value={password} />
            <Button title='Log In'/>
        </View>
    );
}

export default UserForm;