import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

//components
import InNav from './navigator/InNav';
import OutNav from './navigator/OutNav';

//context
import userContext from './userContext';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (!user) setLoggedIn(false);
    });
    if (user) setLoggedIn(true);
    return subscriber;
  }, [user]);

  return (
    <userContext.Provider value={user}>
      <NavigationContainer>
        {loggedIn ? <InNav /> : <OutNav />}
      </NavigationContainer>
    </userContext.Provider>
  );
}
