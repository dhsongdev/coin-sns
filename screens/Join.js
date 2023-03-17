import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function Join({ navigation: { goBack } }) {
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitEditingEmail = useCallback(() => {
    passwordRef.current.focus();
  }, []);

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
        textContentType="password"
        returnKeyType="done"
        placeholder="password"
        value={password}
      />
      <Button
        title="join"
        onPress={() => {
          goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
});
