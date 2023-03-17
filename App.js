import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import auth from '@react-native-firebase/auth';

//components
import InNav from './navigator/InNav';
import OutNav from './navigator/OutNav';

//context
import userContext from './userContext';

//---------------------------------------------

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {loggedIn ? <InNav /> : <OutNav />}
        </NavigationContainer>
      </QueryClientProvider>
    </userContext.Provider>
  );
}
