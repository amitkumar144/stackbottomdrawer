import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import LanguageComponent from '../../components/LanguageComponent';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LanguageComponent />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
