import React from 'react';
import MainNavigator from './src/navigation/rootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';


const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};

export default App;