import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Main = () => {
  return (
    <View style={stles.container}>
      <Text style={styles.h1}>Hello world!</Text>
      <Text style={styles.paragraph}>This is my app</Text>
      <Image source={require('.../assets/images/hello-world.jpg')} />
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  h1: {
    fonstSize: 48,
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 18
  }
});

export default Main;