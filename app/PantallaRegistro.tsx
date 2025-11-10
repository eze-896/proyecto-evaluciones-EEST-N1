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

const PantallaRegistro: React.FC = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });
  const [cargando, setCargando] = useState(false);
  const { registrar } = useAuth();

  const manejarRegistro = async () => {
    const { nombre, apellido, dni ,email, contraseña, confirmarContraseña} = datosFormulario;

    if (!nombre || !apellido|| !dni || !email || !contraseña || !confirmarContraseña) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (contraseña.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setCargando(true);
    try {
      await registrar({ 
        email, 
        contraseña, 
        nombre, 
        apellido,
        dni: parseInt(dni), 
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta');
    } finally {
      setCargando(false);
    }
  };

  const actualizarDatosFormulario = (campo: string, valor: string) => {
    setDatosFormulario(prev => ({ ...prev, [campo]: valor }));
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
          <Text style={estilos.tituloFormulario}>Crear Cuenta</Text>
          
          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Nombre</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ingresa tu nombre"
              value={datosFormulario.nombre}
              onChangeText={(valor) => actualizarDatosFormulario('nombre', valor)}
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Apellido</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ingresa tu apellido"
              value={datosFormulario.apellido}
              onChangeText={(valor) => actualizarDatosFormulario('apellido', valor)}
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>DNI</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ingresa tu DNI"
              value={datosFormulario.dni}
              onChangeText={(valor) => actualizarDatosFormulario('dni', valor)}
              keyboardType="numeric"
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Email</Text>
            <TextInput
              style={estilos.input}
              placeholder="tu@email.com"
              value={datosFormulario.email}
              onChangeText={(valor) => actualizarDatosFormulario('email', valor)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Contraseña</Text>
            <TextInput
              style={estilos.input}
              placeholder="Mínimo 6 caracteres"
              value={datosFormulario.contraseña}
              onChangeText={(valor) => actualizarDatosFormulario('contraseña', valor)}
              secureTextEntry
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Confirmar Contraseña</Text>
            <TextInput
              style={estilos.input}
              placeholder="Repite tu contraseña"
              value={datosFormulario.confirmarContraseña}
              onChangeText={(valor) => actualizarDatosFormulario('confirmarContraseña', valor)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[estilos.boton, cargando && estilos.botonDeshabilitado]}
            onPress={manejarRegistro}
            disabled={cargando}
          >
            <Text style={estilos.textoBoton}>
              {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Text>
          </TouchableOpacity>

          <View style={estilos.pie}>
            <Text style={estilos.textoPie}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity onPress={() => router.push('/PantallaInicioSesion')}>
              <Text style={estilos.enlace}>Inicia sesión aquí</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 40,
  },
  titulo: {
    fontSize: 32,
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
    marginBottom: 16,
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
    marginTop: 16,
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
});

export default PantallaRegistro;