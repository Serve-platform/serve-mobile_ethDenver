import React from 'react';
import './shim';
import {NavigationContainer} from '@react-navigation/native';
// import GlobalNav from 'navigators/GlobalNav';
import GlobalNav from './src/navigators/GlobalNav';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import axios from 'axios';

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        if (axios.isAxiosError(error) && error.response) {
          console.log(JSON.stringify(error.response.data));
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: error => {
        if (axios.isAxiosError(error) && error.response) {
          console.log(JSON.stringify(error.response.data));
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <GlobalNav />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
