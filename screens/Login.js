import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Login({ navigation: { navigate } }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 10 }}>
      <TextInput style={styles.input} placeholder="email" />
      <TextInput style={styles.input} placeholder="password" />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigate('Join');
        }}
      >
        <Text>join</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'grey',
    width: 60,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  input: {
    marginTop: 5,
  },
});
