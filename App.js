import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

//components
import InNav from './navigator/InNav';
import OutNav from './navigator/OutNav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(user);
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    if (user) setLoggedIn(true);
    return subscriber;
  }, [user]);

  return (
    <NavigationContainer>
      {loggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
