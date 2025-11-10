import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ProveedorAuth } from '../src/contexts/AuthContext';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProveedorAuth>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="PantallaInicioSesion" options={{ headerShown: false }} />
          <Stack.Screen name="PantallaRegistro" options={{ headerShown: false }} />
          <Stack.Screen name="PantallaDashboard" options={{ headerShown: false }} />
          {/* Comenta temporalmente las tabs */}
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ProveedorAuth>
  );
}