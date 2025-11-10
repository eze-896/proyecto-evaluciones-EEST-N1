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

interface CriterioEvaluacion {
  id: number;
  nombre: string;
  ponderacion: number;
  puntajeMaximo: number;
  puntaje: number;
}

const PantallaCargarEvaluacion: React.FC = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
  const [cargando, setCargando] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const criterios: CriterioEvaluacion[] = [
    {
      id: 1,
      nombre: 'Rigor Técnico',
      ponderacion: 35,
      puntajeMaximo: 5,
      puntaje: 0
    },
    {
      id: 2,
      nombre: 'Creatividad/Viabilidad',
      ponderacion: 20,
      puntajeMaximo: 5,
      puntaje: 0
    },
    {
      id: 3,
      nombre: 'Metodología',
      ponderacion: 25,
      puntajeMaximo: 5,
      puntaje: 0
    },
    {
      id: 4,
      nombre: 'Comunicación',
      ponderacion: 10,
      puntajeMaximo: 5,
      puntaje: 0
    },
    {
      id: 5,
      nombre: 'Trabajo en Equipo',
      ponderacion: 10,
      puntajeMaximo: 5,
      puntaje: 0
    }
  ];

  const [criteriosState, setCriteriosState] = useState<CriterioEvaluacion[]>(criterios);

  // Datos hardcodeados - SE REEMPLAZARÁ CON LLAMADA A LA API
  const proyectos = [
    { id: '1', nombre: 'Sistema de Riego Automatizado', especialidad: 'Electromecánica' },
    { id: '2', nombre: 'App para Gestión Escolar', especialidad: 'Programación' },
    { id: '3', nombre: 'Robot Seguidor de Línea', especialidad: 'Electrónica' },
    { id: '4', nombre: 'Planta de Tratamiento de Aguas', especialidad: 'Química' },
    { id: '5', nombre: 'Sistema de Iluminación Inteligente', especialidad: 'Electricidad' },
    { id: '6', nombre: 'Brazo Robótico Industrial', especialidad: 'Mecatrónica' },
    { id: '7', nombre: 'App de Control de Asistencia', especialidad: 'Programación' },
    { id: '8', nombre: 'Generador Eólico Miniaturizado', especialidad: 'Electromecánica' },
  ];

  // Filtrar proyectos basado en la búsqueda
  const proyectosFiltrados = proyectos.filter(proyecto =>
    proyecto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    proyecto.especialidad.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const actualizarPuntaje = (id: number, puntaje: string) => {
    const puntajeNum = parseFloat(puntaje) || 0;
    setCriteriosState(prev => prev.map(criterio =>
      criterio.id === id 
        ? { ...criterio, puntaje: Math.min(puntajeNum, criterio.puntajeMaximo) }
        : criterio
    ));
  };

  const incrementarPuntaje = (id: number) => {
    setCriteriosState(prev => prev.map(criterio =>
      criterio.id === id 
        ? { ...criterio, puntaje: Math.min(criterio.puntaje + 0.5, criterio.puntajeMaximo) }
        : criterio
    ));
  };

  const decrementarPuntaje = (id: number) => {
    setCriteriosState(prev => prev.map(criterio =>
      criterio.id === id 
        ? { ...criterio, puntaje: Math.max(criterio.puntaje - 0.5, 0) }
        : criterio
    ));
  };

  const calcularPuntajePonderado = (criterio: CriterioEvaluacion): number => {
    // Convertir el puntaje de 0-5 a porcentaje y aplicar ponderación
    const porcentaje = (criterio.puntaje / criterio.puntajeMaximo) * 100;
    return (porcentaje * criterio.ponderacion) / 100;
  };

  const calcularTotal = (): number => {
    const total = criteriosState.reduce((total, criterio) => {
      return total + calcularPuntajePonderado(criterio);
    }, 0);
    
    // El total máximo es 100, pero lo escalamos a 10
    return total / 10;
  };

  const validarFormulario = (): boolean => {
    if (!proyectoSeleccionado) {
      Alert.alert('Error', 'Por favor selecciona un proyecto');
      return false;
    }

    for (const criterio of criteriosState) {
      if (criterio.puntaje === 0) {
        Alert.alert('Error', `Por favor asigna un puntaje a "${criterio.nombre}"`);
        return false;
      }
    }

    return true;
  };

  const manejarEnviar = async () => {
    if (!validarFormulario()) return;

    setCargando(true);

    try {
      const evaluacionData = {
        proyecto_id: proyectoSeleccionado,
        criterios: criteriosState.map(criterio => ({
          criterio_id: criterio.id,
          puntaje: criterio.puntaje,
          puntaje_ponderado: calcularPuntajePonderado(criterio)
        })),
        total: calcularTotal(),
        fecha: new Date().toISOString()
      };

      console.log('Datos de evaluación a enviar a Laravel:', evaluacionData);

      // TODO: Reemplazar con llamada real a la API
      // await fetch('/api/evaluaciones', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(evaluacionData)
      // });

      Alert.alert(
        'Éxito',
        `Evaluación guardada correctamente\nPuntaje total: ${calcularTotal().toFixed(2)}/10`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la evaluación');
    } finally {
      setCargando(false);
    }
  };

  const proyectoSeleccionadoInfo = proyectos.find(p => p.id === proyectoSeleccionado);

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={() => router.back()} style={estilos.botonAtras}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Cargar Evaluación</Text>
        <View style={estilos.espacioVacio} />
      </View>

      <View style={estilos.formulario}>
        {/* Buscador de Proyectos */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Buscar Proyecto</Text>
          
          <View style={estilos.contenedorBusqueda}>
            <Ionicons name="search" size={20} color="#9ca3af" style={estilos.iconoBusqueda} />
            <TextInput
              style={estilos.inputBusqueda}
              placeholder="Buscar por nombre o especialidad..."
              value={terminoBusqueda}
              onChangeText={setTerminoBusqueda}
            />
            {terminoBusqueda.length > 0 && (
              <TouchableOpacity onPress={() => setTerminoBusqueda('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          {terminoBusqueda && (
            <Text style={estilos.contadorResultados}>
              {proyectosFiltrados.length} proyecto(s) encontrado(s)
            </Text>
          )}
        </View>

        {/* Información de la Evaluación */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Información de la Evaluación</Text>
          
          <View style={estilos.contenedorInput}>
            <Text style={estilos.etiqueta}>Proyecto a Evaluar *</Text>
            
            {proyectoSeleccionadoInfo && (
              <View style={estilos.proyectoSeleccionadoInfo}>
                <Text style={estilos.nombreProyectoSeleccionado}>
                  {proyectoSeleccionadoInfo.nombre}
                </Text>
                <Text style={estilos.especialidadProyectoSeleccionado}>
                  {proyectoSeleccionadoInfo.especialidad}
                </Text>
                <TouchableOpacity 
                  style={estilos.botonCambiarProyecto}
                  onPress={() => setProyectoSeleccionado('')}
                >
                  <Text style={estilos.textoBotonCambiar}>Cambiar</Text>
                </TouchableOpacity>
              </View>
            )}

            {!proyectoSeleccionado && (
              <ScrollView 
                style={estilos.contenedorProyectosScroll}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                <View style={estilos.contenedorProyectos}>
                  {proyectosFiltrados.map((proyecto) => (
                    <TouchableOpacity
                      key={proyecto.id}
                      style={estilos.botonProyecto}
                      onPress={() => setProyectoSeleccionado(proyecto.id)}
                    >
                      <View style={estilos.infoProyecto}>
                        <Text style={estilos.nombreProyecto}>
                          {proyecto.nombre}
                        </Text>
                        <Text style={estilos.especialidadProyecto}>
                          {proyecto.especialidad}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                  ))}
                  
                  {terminoBusqueda && proyectosFiltrados.length === 0 && (
                    <View style={estilos.sinResultados}>
                      <Ionicons name="search-outline" size={32} color="#9ca3af" />
                      <Text style={estilos.textoSinResultados}>No se encontraron proyectos</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>

        {/* Criterios de Evaluación */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Criterios de Evaluación</Text>
          
          {criteriosState.map((criterio) => (
            <View key={criterio.id} style={estilos.contenedorCriterio}>
              <View style={estilos.encabezadoCriterio}>
                <View style={estilos.infoCriterio}>
                  <Text style={estilos.nombreCriterio}>{criterio.nombre}</Text>
                </View>
                <View style={estilos.ponderacionCriterio}>
                  <Text style={estilos.textoPonderacion}>{criterio.ponderacion}%</Text>
                </View>
              </View>
              
              <View style={estilos.contenedorPuntaje}>
                <Text style={estilos.etiquetaPuntaje}>
                  Puntaje (0 - {criterio.puntajeMaximo})
                </Text>
                
                <View style={estilos.controlesPuntaje}>
                  <TouchableOpacity 
                    style={estilos.botonContador}
                    onPress={() => decrementarPuntaje(criterio.id)}
                    disabled={criterio.puntaje <= 0}
                  >
                    <Ionicons 
                      name="remove" 
                      size={20} 
                      color={criterio.puntaje <= 0 ? '#d1d5db' : '#374151'} 
                    />
                  </TouchableOpacity>
                  
                  <TextInput
                    style={estilos.inputPuntaje}
                    placeholder="0"
                    value={criterio.puntaje > 0 ? criterio.puntaje.toString() : ''}
                    onChangeText={(valor) => actualizarPuntaje(criterio.id, valor)}
                    keyboardType="numeric"
                    maxLength={4}
                    textAlign="center"
                  />
                  
                  <TouchableOpacity 
                    style={estilos.botonContador}
                    onPress={() => incrementarPuntaje(criterio.id)}
                    disabled={criterio.puntaje >= criterio.puntajeMaximo}
                  >
                    <Ionicons 
                      name="add" 
                      size={20} 
                      color={criterio.puntaje >= criterio.puntajeMaximo ? '#d1d5db' : '#374151'} 
                    />
                  </TouchableOpacity>
                </View>
                
                <View style={estilos.infoPuntaje}>
                  <Text style={estilos.textoPuntajePonderado}>
                    Ponderado: {(calcularPuntajePonderado(criterio) / 10).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Resumen */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Resumen</Text>
          <View style={estilos.contenedorTotal}>
            <Text style={estilos.etiquetaTotal}>Puntaje Total</Text>
            <Text style={estilos.puntajeTotal}>{calcularTotal().toFixed(2)}/10</Text>
          </View>
        </View>

        {/* Botón de Envío */}
        <TouchableOpacity
          style={[estilos.botonEnviar, cargando && estilos.botonDeshabilitado]}
          onPress={manejarEnviar}
          disabled={cargando}
        >
          <Text style={estilos.textoBotonEnviar}>
            {cargando ? 'Guardando...' : 'Guardar Evaluación'}
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
  contenedorBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconoBusqueda: {
    marginRight: 12,
  },
  inputBusqueda: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  contadorResultados: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
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
  proyectoSeleccionadoInfo: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0ea5e9',
  },
  nombreProyectoSeleccionado: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 4,
  },
  especialidadProyectoSeleccionado: {
    fontSize: 14,
    color: '#0284c7',
    marginBottom: 12,
  },
  botonCambiarProyecto: {
    alignSelf: 'flex-start',
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textoBotonCambiar: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  contenedorProyectosScroll: {
    maxHeight: 200,
  },
  contenedorProyectos: {
    gap: 8,
  },
  botonProyecto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoProyecto: {
    flex: 1,
  },
  nombreProyecto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  especialidadProyecto: {
    fontSize: 12,
    color: '#6b7280',
  },
  sinResultados: {
    alignItems: 'center',
    padding: 20,
  },
  textoSinResultados: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  contenedorCriterio: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  encabezadoCriterio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoCriterio: {
    flex: 1,
    marginRight: 12,
  },
  nombreCriterio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  ponderacionCriterio: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoPonderacion: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  contenedorPuntaje: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  etiquetaPuntaje: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    width: 100,
  },
  controlesPuntaje: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    overflow: 'hidden',
  },
  botonContador: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
  },
  inputPuntaje: {
    width: 60,
    padding: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#d1d5db',
  },
  infoPuntaje: {
    width: 100,
    alignItems: 'flex-end',
  },
  textoPuntajePonderado: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  contenedorTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0ea5e9',
  },
  etiquetaTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1',
  },
  puntajeTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0369a1',
  },
  botonEnviar: {
    backgroundColor: '#059669',
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

export default PantallaCargarEvaluacion;