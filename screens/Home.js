import React, { useContext, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

//context
import userContext from '../userContext';

const Logout = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        auth()
          .signOut()
          .then(() => {
            Alert.alert('Logged out', 'Logged out!');
          });
      }}
    >
      <Text>logout</Text>
    </TouchableOpacity>
  );
};

export default function Home({ navigation: { setOptions } }) {
  const user = useContext(userContext);

  useEffect(() => {
    setOptions({
      headerRight: () => <Logout />,
    });
  }, []);

  return user ? (
    <View>
      <Text>wellcome {user.email}</Text>
    </View>
  ) : null;
}
