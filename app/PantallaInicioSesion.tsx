import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

const PantallaInicioSesion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false);
  const { iniciarSesion } = useAuth();

  const manejarInicioSesion = async () => {
    if (!email || !contraseña) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setCargando(true);
    try {
      await iniciarSesion(email, contraseña);
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={estilos.contenedorScroll}>
        <View style={estilos.encabezado}>
          <Text style={estilos.titulo}>Proyectos E.E.S.T N1</Text>
        </View>

        <View style={estilos.formulario}>
          <Text style={estilos.tituloFormulario}>Iniciar Sesión</Text>
          
          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Email</Text>
            <TextInput
              style={estilos.input}
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Contraseña</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ingresa tu contraseña"
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[estilos.boton, cargando && estilos.botonDeshabilitado]}
            onPress={manejarInicioSesion}
            disabled={cargando}
          >
            <Text style={estilos.textoBoton}>
              {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>

          <View style={estilos.pie}>
            <Text style={estilos.textoPie}>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={() => router.push('/PantallaRegistro')}>
              <Text style={estilos.enlace}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[estilos.boton, estilos.botonDemo]}
            onPress={() => router.push('/PantallaDashboard')}
          >
            <Text style={estilos.textoBoton}>Acceso Rápido (Demo)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contenedorScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  encabezado: {
    alignItems: 'center',
    marginBottom: 50,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
  },
  formulario: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tituloFormulario: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  contenedorInput: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  boton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pie: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  textoPie: {
    color: '#6b7280',
  },
  enlace: {
    color: '#4f46e5',
    fontWeight: '600',
  },
  botonDemo: {
    backgroundColor: '#059669',
    marginTop: 12,
  },
});

export default PantallaInicioSesion;