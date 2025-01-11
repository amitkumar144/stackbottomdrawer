import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <Button title='go to Home' onPress={() => {
        navigation.navigate('HomeScreen')
      }} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
