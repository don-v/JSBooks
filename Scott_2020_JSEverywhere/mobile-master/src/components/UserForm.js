import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
`;

const FormLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

const SignUp = styled.TouchableOpacity`
    margin-top: 20px;
`;

const Link=styled.Text`
    color: #0077cc;
    font-weight: bold;
`;

const UserForm = props => {
    // form element state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const handleSubmit = () => {
        // this function is called when the user presses the form button
        props.action({
            variables: {
                email: email,
                password: password,
                username: username
            }
        });
    };

    
    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput
                onChangeText={text => setEmail(text)} 
                value={email} 
                textContentType="emailAddress"
                autoCompleteType="email"
                autoFocus={true}
                autoCapitalize="none"
            />
            {props.formType === 'signUp' && (
                <View>
                    <FormLabel>Username</FormLabel>
                    <StyledInput 
                        onChangeText={text => setUsername(text)}
                        value={username}
                        textContentType="username"
                        autoCapitalize="none"
                    />
                </View>
            )}
            <FormLabel>Password</FormLabel>
            <StyledInput
                onChangeText={text => setPassword(text)} 
                value={password}
                textContentType='password' 
                secureTextEntry={true}
            />
            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>
            {/* HERE -- p. 296! */}
            {props.formType !== 'signUp' && (
                <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            )}
        </FormView>
    );
}

export default UserForm;