import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Restaurants } from '../screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'cutlery' : 'cutlery';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Search"
        component={Home}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
