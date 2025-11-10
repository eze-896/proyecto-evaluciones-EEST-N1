import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Redirige directamente al login sin verificar autenticación
    // La verificación se hará dentro de las pantallas
    const timer = setTimeout(() => {
      router.replace('../PantallaInicioSesion');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text style={{ marginTop: 16, color: '#6b7280' }}>Cargando EduPonder...</Text>
    </View>
  );
}