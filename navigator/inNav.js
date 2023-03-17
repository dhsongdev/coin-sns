import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const Logout = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        auth()
          .signOut()
          .then(() => {
            Alert.alert('Log out', 'Logged out!');
          });
      }}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default function InNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => {
          return {
            headerRight: () => {
              return <Logout />;
            },
          };
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
}
