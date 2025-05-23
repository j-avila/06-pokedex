import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeContext,
} from '@react-navigation/native';

import {adaptNavigationTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Define your custom font styles
const customFonts = {
  displaySmall: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 20,
  },
  displayMedium: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 24,
  },
  bodyLarge: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 12,
  },
  labelLarge: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '500' as '500',
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 10,
  },
  regular: {fontFamily: 'Nunito-Regular', fontWeight: '400' as '400'},
  medium: {fontFamily: 'Nunito-Medium', fontWeight: '500' as '500'},
  bold: {fontFamily: 'Nunito-Bold', fontWeight: '700' as '700'},
  heavy: {fontFamily: 'Nunito-Heavy', fontWeight: '900' as '900'},
  headlineMedium: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as '400',
    fontSize: 22,
  },
};

export const ThemeContent = createContext({
  isDark: false,
  theme: {...LightTheme, fonts: customFonts},
});

const customColors = {
  primary: 'blue',
  background: 'white',
  card: 'white',
  text: 'grey',
  border: 'grey',
  notification: 'red',
};

const customDarkColors = {
  primary: 'blue',
  background: 'black',
  card: 'black',
  text: 'white',
  border: 'grey',
  notification: 'red',
};

const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDarkMode] = useState(colorScheme === 'dark');

  const initalTheme = {
    ...LightTheme,
    text: customColors.text,
    fonts: customFonts,
  };

  const darkTheme = {
    ...DarkTheme,
    fonts: customFonts,
  };

  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const schemeIsDark = colorScheme === 'dark' ? true : false;
    setTheme(schemeIsDark ? darkTheme : initalTheme);
    setIsDarkMode(schemeIsDark);
    console.log('🎨', {colorScheme, schemeIsDark});
  }, [colorScheme]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider
          value={{
            dark: isDark,
            colors: theme.colors,
            fonts: theme.fonts,
          }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ThemeContextProvider;
