import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { useAuth } from '@/hooks/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loggedIn } = useAuth();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <ThemeProvider value={DefaultTheme}>
      {
      !(loggedIn && loggedIn !== "Invalido" && loggedIn !== "Error") ? (
          <Stack>
            <Stack.Screen name="(accounts)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found"/>
          </Stack>
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found"/>
          </Stack>
        )
      }
    </ThemeProvider>
  );
}
