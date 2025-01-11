import {Platform, View} from 'react-native';
import React from 'react';

import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import styles from './styles';
import {
  DetailAltIcon,
  DetailIcon,
  HomeAltIcon,
  HomeIcon,
  ProfileAltIcon,
  ProfileIcon,
  SettingAltIcon,
  SettingIcon,
} from '../assets';
import HomeStack from './navigators/homeStackNavigator';
import DetailStack from './navigators/detailStackNavigator';
import SettingStack from './navigators/settingStackNavigator';
import ProfileStack from './navigators/profileStackNavigator';

const BottomNavigator = () => {
  let WIDTH = 25;
  let HEIGHT = 25;

  const BottomTabNavigator = createBottomTabNavigator();

  const tabBarListeners = ({navigation, route}) => ({
    tabPress: () => navigation.navigate(route.name),
  });

  return (
    <BottomTabNavigator.Navigator
      tabBar={props => (
        <View style={styles.wrapperStyle}>
          <BottomTabBar {...props} style={styles.bottomTabStyles} />
        </View>
      )}
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#767676',
        tabBarStyle:{
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
          height: Platform.OS === 'android' ? 65 : null,
        },
        tabBarLabelStyle: {
          fontFamily: "Arial",
          fontSize: 11,
        },
      }}>
      <BottomTabNavigator.Screen
        options={{
          tabBarShowLabel: true,
          gestureEnabled: false,
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeAltIcon width={WIDTH} height={HEIGHT} />
            ) : (
              <HomeIcon width={WIDTH} height={HEIGHT} />
            ),
        }}
        name="Home"
        listeners={tabBarListeners}
        component={HomeStack}
      />
      <BottomTabNavigator.Screen
        options={{
          tabBarShowLabel: true,
          gestureEnabled: false,
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <SettingAltIcon width={WIDTH} height={HEIGHT} />
            ) : (
              <SettingIcon width={WIDTH} height={HEIGHT} />
            ),
        }}
        name="Setting"
        listeners={tabBarListeners}
        component={SettingStack}
      />
      <BottomTabNavigator.Screen
        options={{
          tabBarShowLabel: true,
          gestureEnabled: false,
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <DetailAltIcon width={WIDTH} height={HEIGHT} />
            ) : (
              <DetailIcon width={WIDTH} height={HEIGHT} />
            ),
        }}
        name="Detail"
        listeners={tabBarListeners}
        component={DetailStack}
      />
      <BottomTabNavigator.Screen
        options={{
          tabBarShowLabel: true,
          gestureEnabled: false,
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <ProfileAltIcon width={WIDTH} height={HEIGHT} />
            ) : (
              <ProfileIcon width={WIDTH} height={HEIGHT} />
            ),
        }}
        name="Profile"
        listeners={tabBarListeners}
        component={ProfileStack}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigator;
