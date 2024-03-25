import React from 'react';
import { View, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Appointments from '../screens/AppointmentsUser';
import ScheduleAppointments from '../screens/ScheduleAppointment';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource, iconTintColor;

          if (route.name === 'Home') {
            iconSource = require('../assets/home.png');
            iconTintColor = focused ? '#E37383' : '#D3D3D3';
          } else if (route.name === 'ScheduleAppointments') {
            iconSource = require('../assets/appointment.png');
            iconTintColor = focused ? '#E37383' : '#D3D3D3';
          } else if (route.name === 'Appointments') {
            iconSource = require('../assets/scheduledappointments.png');
            iconTintColor = focused ? '#E37383' : '#D3D3D3';
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/profile.png');
            iconTintColor = focused ? '#E37383' : '#D3D3D3';
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={{ bottom: 7, width: 20, height: 20, tintColor: iconTintColor }}
              />
              {focused && (
                <Text style={{ color: iconTintColor, fontSize: 10, bottom: 7 }}>{route.name}</Text>
              )}
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
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: '' }} />
      <Tab.Screen
        name="ScheduleAppointments"
        component={ScheduleAppointments}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen name="Appointments" component={Appointments} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: '' }} />
    </Tab.Navigator>
  );
};

export default Tabs;
