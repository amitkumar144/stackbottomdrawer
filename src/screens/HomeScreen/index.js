import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MenuIcon} from '../../assets';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{position: 'absolute', top: 12, left: 10}}>
        <MenuIcon width={24} height={24} />
      </TouchableOpacity> */}
      <Text>HomeScreen</Text>
      <Button
        title="Navigate within tab"
        onPress={() => navigation.navigate('WithInBottomScreen')}
      />
      <Button
        title="Navigate to Stack"
        onPress={() => navigation.navigate('FullScreen')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
