import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function Login({ navigation: { navigate } }) {
  return (
    <View>
      <Text>login screen</Text>
      <TextInput />
      <TextInput />
      <TouchableOpacity onPress={() => {}}>
        <Text>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate('Join');
        }}
      >
        <Text>join</Text>
      </TouchableOpacity>
    </View>
  );
}
