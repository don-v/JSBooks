import React from 'react';
import { Text, View, Image } from 'react-native';

const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#0077cc', fontSize: 48, fontWeight: 'bold' }}>
      Hello world!</Text>
      <Image source={require('.../assets/images/hello-world.jpg')} />
    </View>    
  );
};

export default Main;