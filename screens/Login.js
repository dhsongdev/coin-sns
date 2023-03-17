import React, { useRef, useState, useCallback } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation: { navigate } }) {
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const onSubmitEditingEmail = useCallback(() => {
    passwordRef.current.focus();
  }, []);

  const onSubmitEditingPassword = () => {
    setAuthLoading(true);
    if (password === '') {
      Alert.alert('Password', 'Fill the password');
      setAuthLoading(false);
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            'Check your email, please.',
            'That email address is invalid!'
          );
          setAuthLoading(false);
          return;
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            'Check your email or password, please.',
            'Worng password!'
          );
          setAuthLoading(false);
          return;
        }
      });
  };

  return (
    <View style={{ alignItems: 'center', paddingTop: 10 }}>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(e) => {
          setEmail(e);
        }}
        textContentType="emailAddress"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditingEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        ref={passwordRef}
        onChangeText={(e) => {
          setPassword(e);
        }}
        secureTextEntry
        returnKeyType="done"
        placeholder="password"
        value={password}
      />
      {authLoading ? (
        <Text>logging you in...</Text>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmitEditingPassword();
          }}
        >
          <Text>login</Text>
        </TouchableOpacity>
      )}
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
