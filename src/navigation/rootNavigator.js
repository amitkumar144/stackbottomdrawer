import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BottomNavigator from './bottomNavigator';
import SplashScreen from '../screens/SplashScreen';
import StackFullScreen from '../screens/StackFullScreen';
import CoffeeDetailScreen from '../components/CoffeeDetailScreen';
import CoffeeOrderScreen from '../screens/CoffeeOrderScreen';
import CoffeeMapView from '../components/CoffeeMapView';
import VerticalScrollableCard from '../screens/VerticalScrollableCard';
import CarouselBackgroundAnimation from '../screens/CarouselBackgroundAnimation';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="FullScreen" component={StackFullScreen} />
      <Stack.Screen name="DetailScreen" component={CoffeeDetailScreen} />
      <Stack.Screen name="OrderScreen" component={CoffeeOrderScreen} />
      <Stack.Screen name="MapScreen" component={CoffeeMapView} />
      <Stack.Screen name="VerticalCard" component={VerticalScrollableCard} />
      <Stack.Screen name="CarouselCard" component={CarouselBackgroundAnimation} />
      <Stack.Screen
        name="HomeScreen"
        component={BottomNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          gestureEnabled: false,
        }}
      />
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
