import '../gesture-handler';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import StackNavigator from './presentation/navigator/StackNavigator';
import ThemeContextProvider from './presentation/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const PokedexApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    console.log('App mounted 🫠');
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#2b2b2b' : '#ebebeb',
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default PokedexApp;
