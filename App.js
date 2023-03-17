import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//components
import InNav from './navigator/InNav';
import OutNav from './navigator/OutNav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {loggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
