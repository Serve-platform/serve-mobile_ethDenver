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
import {useRecoilState} from 'recoil';
import {modalState} from '~/recoils/atoms';
import DefaultModal from '~/components/DefaultModal';

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
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <GlobalNav />
        </NavigationContainer>
      </QueryClientProvider>
      {modalOpen && (
        <DefaultModal
          onPress={modalOpen.onPress}
          onPressText={modalOpen.onPressText}
          onCancelText={modalOpen.onCancelText}
          children={modalOpen.children}
          modalOpen={modalOpen.isOpen}
          setModalOpen={(isModalOpen: boolean) =>
            setModalOpen({...modalOpen, isOpen: isModalOpen})
          }
          isBackCancel={modalOpen.isBackCancel}
        />
      )}
    </>
  );
};

export default App;
