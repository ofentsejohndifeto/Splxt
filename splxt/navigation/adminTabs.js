import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Image, Text } from 'react-native';

import Appointments from '../screens/AppointmentsAdmin';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource, iconTintColor;

          if (route.name === 'Appointments') {
            iconSource = require('../assets/appointment.png')
            iconTintColor = focused ? '#E37383' : '#D3D3D3';
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/profile.png')
            iconTintColor = focused ? '#E37383' : '#D3D3D3';
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={{ bottom: 7, width: 20, height: 20, tintColor: iconTintColor }}
              />
              {/* Hiding the tab screen name */}
              {focused && <Text style={{ color: iconTintColor, fontSize: 10, bottom: 7 }}>{route.name}</Text>}
            </View>
          );
        },
      })}
      tabBarOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen name="Appointments" component={Appointments} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: '' }} />
    </Tab.Navigator>
  );
};

export default AdminTabs;
