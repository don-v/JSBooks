import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
    }

    return (
        <View>
            <Text>Email</Text>
            <TextInput 
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput 
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <Button 
                title='Log In'
                onPress={handleSubmit}    
            />
        </View>
    );
}

export default UserForm;