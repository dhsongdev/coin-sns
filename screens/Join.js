import React, { useCallback, useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';

export default function Join({ navigation: { goBack } }) {
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
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code);
        console.log(password);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Check your email, please.',
            'That email address is already in use!'
          );
          return;
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            'Check your email, please.',
            'That email address is invalid!'
          );
          return;
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert(
            'Check your password, please.',
            'Use stronger password by using 특수기호 or numbers'
          );
          return;
        }
        setAuthLoading(false);
        goBack();
      });
  };

  return (
    <View style={{ alignItems: 'center' }}>
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
        style={[styles.input, { marginBottom: 30 }]}
        ref={passwordRef}
        onChangeText={(e) => {
          setPassword(e);
        }}
        secureTextEntry
        returnKeyType="done"
        placeholder="password"
        value={password}
      />
      <View>
        {authLoading ? (
          <Text>Creating account...</Text>
        ) : (
          <Button
            title="join"
            onPress={() => {
              onSubmitEditingPassword();
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
});
