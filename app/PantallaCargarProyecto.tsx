import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface MiembroEquipo {
  id: number;
  nombre: string;
  apellido: string;
}

const PantallaCargarProyecto: React.FC = () => {
  const [datosProyecto, setDatosProyecto] = useState({
    numero: '',
    nombre: '',
    especialidad: '',
  });
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([
    { id: 1, nombre: '', apellido: '' }
  ]);
  const [cargando, setCargando] = useState(false);

  const especialidades = [
    'Electromecánica',
    'Programación',
    'Química',
    'Electricidad',
    'Electrónica'
  ];

  const actualizarDatosProyecto = (campo: string, valor: string) => {
    setDatosProyecto(prev => ({ ...prev, [campo]: valor }));
  };

  const actualizarMiembro = (id: number, campo: string, valor: string) => {
    setMiembros(prev => prev.map(miembro =>
      miembro.id === id ? { ...miembro, [campo]: valor } : miembro
    ));
  };

  const agregarMiembro = () => {
    const nuevoId = miembros.length > 0 ? Math.max(...miembros.map(m => m.id)) + 1 : 1;
    setMiembros(prev => [...prev, { id: nuevoId, nombre: '', apellido: '' }]);
  };

  const eliminarMiembro = (id: number) => {
    if (miembros.length > 1) {
      setMiembros(prev => prev.filter(miembro => miembro.id !== id));
    }
  };

  const validarFormulario = (): boolean => {
    if (!datosProyecto.numero || !datosProyecto.nombre || !datosProyecto.especialidad) {
      Alert.alert('Error', 'Por favor completa todos los campos del proyecto');
      return false;
    }

    for (const miembro of miembros) {
      if (!miembro.nombre.trim() || !miembro.apellido.trim()) {
        Alert.alert('Error', 'Por favor completa nombre y apellido de todos los miembros');
        return false;
      }
    }

    return true;
  };

  const manejarEnviar = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    
    // Simulación de envío - AQUÍ SE CONECTARÁ CON LARAVEL
    try {
      const proyectoData = {
        ...datosProyecto,
        miembros: miembros.map(m => ({
          nombre: m.nombre.trim(),
          apellido: m.apellido.trim()
        }))
      };

      console.log('Datos a enviar a Laravel:', proyectoData);
      
      // TODO: Reemplazar con llamada real a la API
      // await fetch('/api/proyectos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(proyectoData)
      // });

      Alert.alert(
        'Éxito',
        'Proyecto cargado correctamente',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el proyecto');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={() => router.back()} style={estilos.botonAtras}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Cargar Proyecto</Text>
        <View style={estilos.espacioVacio} />
      </View>

      <View style={estilos.formulario}>
        {/* Información Básica del Proyecto */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Información del Proyecto</Text>
          
          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Número de Proyecto *</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ej: 001"
              value={datosProyecto.numero}
              onChangeText={(valor) => actualizarDatosProyecto('numero', valor)}
              keyboardType="numeric"
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Nombre del Proyecto *</Text>
            <TextInput
              style={estilos.input}
              placeholder="Ej: Sistema de Riego Automatizado"
              value={datosProyecto.nombre}
              onChangeText={(valor) => actualizarDatosProyecto('nombre', valor)}
            />
          </View>

          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Especialidad *</Text>
            <View style={estilos.contenedorEspecialidades}>
              {especialidades.map((especialidad) => (
                <TouchableOpacity
                  key={especialidad}
                  style={[
                    estilos.botonEspecialidad,
                    datosProyecto.especialidad === especialidad && estilos.botonEspecialidadSeleccionado
                  ]}
                  onPress={() => actualizarDatosProyecto('especialidad', especialidad)}
                >
                  <Text style={[
                    estilos.textoEspecialidad,
                    datosProyecto.especialidad === especialidad && estilos.textoEspecialidadSeleccionado
                  ]}>
                    {especialidad}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Miembros del Equipo */}
        <View style={estilos.seccion}>
          <View style={estilos.encabezadoMiembros}>
            <Text style={estilos.tituloSeccion}>Miembros del Equipo</Text>
            <TouchableOpacity style={estilos.botonAgregar} onPress={agregarMiembro}>
              <Ionicons name="add-circle" size={20} color="#4f46e5" />
              <Text style={estilos.textoAgregar}>Agregar</Text>
            </TouchableOpacity>
          </View>

          {miembros.map((miembro, index) => (
            <View key={miembro.id} style={estilos.contenedorMiembro}>
              <View style={estilos.encabezadoMiembro}>
                <Text style={estilos.numeroMiembro}>Miembro {index + 1}</Text>
                {miembros.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => eliminarMiembro(miembro.id)}
                    style={estilos.botonEliminar}
                  >
                    <Ionicons name="trash-outline" size={18} color="#dc2626" />
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={estilos.filaInputs}>
                <View style={[estilos.contenedorInput, estilos.inputMitad]}>
                  <Text style={estilos.etiqueta}>Nombre *</Text>
                  <TextInput
                    style={estilos.input}
                    placeholder="Nombre"
                    value={miembro.nombre}
                    onChangeText={(valor) => actualizarMiembro(miembro.id, 'nombre', valor)}
                  />
                </View>
                
                <View style={[estilos.contenedorInput, estilos.inputMitad]}>
                  <Text style={estilos.etiqueta}>Apellido *</Text>
                  <TextInput
                    style={estilos.input}
                    placeholder="Apellido"
                    value={miembro.apellido}
                    onChangeText={(valor) => actualizarMiembro(miembro.id, 'apellido', valor)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Botón de Envío */}
        <TouchableOpacity
          style={[estilos.botonEnviar, cargando && estilos.botonDeshabilitado]}
          onPress={manejarEnviar}
          disabled={cargando}
        >
          <Text style={estilos.textoBotonEnviar}>
            {cargando ? 'Cargando...' : 'Guardar Proyecto'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contenido: {
    flexGrow: 1,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  botonAtras: {
    padding: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  espacioVacio: {
    width: 40,
  },
  formulario: {
    padding: 20,
  },
  seccion: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
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
  contenedorEspecialidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botonEspecialidad: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  botonEspecialidadSeleccionado: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  textoEspecialidad: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  textoEspecialidadSeleccionado: {
    color: 'white',
  },
  encabezadoMiembros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  botonAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  textoAgregar: {
    color: '#4f46e5',
    fontWeight: '500',
    fontSize: 14,
  },
  contenedorMiembro: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  encabezadoMiembro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  numeroMiembro: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  botonEliminar: {
    padding: 4,
  },
  filaInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  inputMitad: {
    flex: 1,
    marginBottom: 0,
  },
  botonEnviar: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBotonEnviar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PantallaCargarProyecto;