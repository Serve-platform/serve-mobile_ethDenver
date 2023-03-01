import React from 'react';
import './shim';
import {NavigationContainer} from '@react-navigation/native';
// import GlobalNav from 'navigators/GlobalNav';
import GlobalNav from './src/navigators/GlobalNav';

const App = () => {
  return (
    <NavigationContainer>
      <GlobalNav />
    </NavigationContainer>
  );
};

export default App;
