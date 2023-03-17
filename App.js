import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//components
import InNav from './navigator/inNav';
import OutNav from './navigator/outNav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {loggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
