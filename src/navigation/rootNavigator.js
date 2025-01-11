import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BottomNavigator from './bottomNavigator';
import SplashScreen from '../screens/SplashScreen';
import StackFullScreen from '../screens/StackFullScreen';
import DrawerNavigator from './drawerNavigator';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="FullScreen" component={StackFullScreen} />
      <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer
      options={{
        gestureEnabled: false,
      }}>
      <LoginStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
