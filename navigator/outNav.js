import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from '../screens/Login';
import Join from '../screens/Join';

const Stack = createNativeStackNavigator();

export default function OutNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        options={() => ({
          presentation: 'modal',
          animation: 'slide_from_bottom',
        })}
        name="Join"
        component={Join}
      />
    </Stack.Navigator>
  );
}
