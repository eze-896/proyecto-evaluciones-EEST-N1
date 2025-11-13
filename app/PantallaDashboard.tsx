import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

const PantallaDashboard: React.FC = () => {
  const { usuario, cerrarSesion } = useAuth();
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Datos hardcodeados - ESTO SE REEMPLAZARÁ CON LA API DE LARAVEL
  const proyectosDestacados = [
    {
      id: 1,
      nombre: 'Sistema de Riego Automatizado',
      especialidad: 'Electrónica',
      promedio: 9.2,
      grupo: '4° A',
      profesor: 'Carlos Rodríguez',
    },
    {
      id: 2,
      nombre: 'App para Gestión Escolar',
      especialidad: 'Programación',
      promedio: 8.8,
      grupo: '5° B',
      profesor: 'María González',
    },
    {
      id: 3,
      nombre: 'Robot Seguidor de Línea',
      especialidad: 'Electromecánica',
      promedio: 8.5,
      grupo: '6° C',
      profesor: 'Roberto Sánchez',
    },
  ];

    const especialidades = [
    {
      id: 1,
      nombre: 'Electrónica',
      cantidadProyectos: 12,
      color: '#4f46e5',
      icono: 'hardware-chip' as const,
    },
    {
      id: 2,
      nombre: 'Programación',
      cantidadProyectos: 8,
      color: '#059669',
      icono: 'code' as const,
    },
    {
      id: 3,
      nombre: 'Electromecánica',
      cantidadProyectos: 6,
      color: '#dc2626',
      icono: 'construct' as const,
    },
    {
      id: 4,
      nombre: 'Química',
      cantidadProyectos: 7,
      color: '#0ea5e9',
      icono: 'flask' as const,
    },
    {
      id: 5,
      nombre: 'Ciclo Básico',
      cantidadProyectos: 10,
      color: '#f59e0b',
      icono: 'school' as const,
    },
    {
      id: 6,
      nombre: 'EPS',
      cantidadProyectos: 5,
      color: '#8b5cf6',
      icono: 'people' as const,
    },
  ];

  const proyectosRecientes = [
    {
      id: 1,
      nombre: 'Control de Acceso con RFID',
      especialidad: 'Electrónica',
      fecha: '2024-01-15',
      estado: 'Evaluado',
    },
    {
      id: 2,
      nombre: 'Sistema de Monitoreo Ambiental',
      especialidad: 'Programación',
      fecha: '2024-01-14',
      estado: 'Pendiente',
    },
    {
      id: 3,
      nombre: 'Brazo Robótico Educativo',
      especialidad: 'Electromecánica',
      fecha: '2024-01-13',
      estado: 'Evaluado',
    },
  ];

  // Filtrar proyectos basado en la búsqueda
  const proyectosFiltrados = proyectosDestacados.filter(proyecto =>
    proyecto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    proyecto.especialidad.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    proyecto.grupo.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      <StatusBar barStyle="dark-content" />
      
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <View style={estilos.infoUsuario}>
          <Text style={estilos.saludo}>Bienvenido, {usuario?.nombre}</Text>
        </View>
        <TouchableOpacity style={estilos.botonCerrarSesion} onPress={cerrarSesion}>
          <Ionicons name="log-out-outline" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Barra de Búsqueda */}
      <View style={estilos.contenedorBusqueda}>
        <Ionicons name="search" size={20} color="#9ca3af" style={estilos.iconoBusqueda} />
        <TextInput
          style={estilos.inputBusqueda}
          placeholder="Buscar proyectos, especialidades..."
          value={terminoBusqueda}
          onChangeText={setTerminoBusqueda}
        />
        {terminoBusqueda.length > 0 && (
          <TouchableOpacity onPress={() => setTerminoBusqueda('')}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={estilos.contenido} showsVerticalScrollIndicator={false}>
        {/* Sección: Mejor Proyecto de la Escuela */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>🏆 Mejor Proyecto</Text>
          <View style={estilos.tarjetaDestacada}>
            <View style={estilos.encabezadoTarjetaDestacada}>
              <Text style={estilos.tituloProyectoDestacado}>{proyectosDestacados[0].nombre}</Text>
              <View style={estilos.badgePromedio}>
                <Text style={estilos.textoBadge}>{proyectosDestacados[0].promedio}</Text>
              </View>
            </View>
            <Text style={estilos.detalleProyecto}>Especialidad: {proyectosDestacados[0].especialidad}</Text>
            <Text style={estilos.detalleProyecto}>Grupo: {proyectosDestacados[0].grupo}</Text>
            <Text style={estilos.detalleProyecto}>Profesor: {proyectosDestacados[0].profesor}</Text>
          </View>
        </View>

        {/* Sección: Acciones Rápidas */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Acciones Rápidas</Text>
          <View style={estilos.contenedorAcciones}>
            <TouchableOpacity 
              style={estilos.botonAccion}
              onPress={() => router.push('/PantallaCargarProyecto')}
            >
              <Ionicons name="add-circle" size={32} color="#4f46e5" />
              <Text style={estilos.textoBotonAccion}>Cargar Proyecto</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={estilos.botonAccion}
              onPress={() => router.push('/PantallaCargarEvaluacion')}
            >
              <Ionicons name="document-text" size={32} color="#059669" />
              <Text style={estilos.textoBotonAccion}>Cargar Evaluación</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección: Proyectos por Especialidad */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Proyectos por Especialidad</Text>
          <View style={estilos.contenedorEspecialidades}>
            {especialidades.map((especialidad) => (
              <TouchableOpacity 
                key={especialidad.id} 
                style={[estilos.tarjetaEspecialidad, { borderLeftColor: especialidad.color }]}
                onPress={() => console.log('Ver proyectos de:', especialidad.nombre)}
              >
                <View style={estilos.encabezadoEspecialidad}>
                  <Ionicons name={especialidad.icono} size={24} color={especialidad.color} />
                  <Text style={estilos.nombreEspecialidad}>{especialidad.nombre}</Text>
                </View>
                <Text style={estilos.cantidadProyectos}>{especialidad.cantidadProyectos} proyectos</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sección: Proyectos Destacados (con búsqueda) */}
        <View style={estilos.seccion}>
          <View style={estilos.encabezadoConTitulo}>
            <Text style={estilos.tituloSeccion}>
              {terminoBusqueda ? 'Resultados de Búsqueda' : 'Proyectos Destacados'}
            </Text>
            {terminoBusqueda && (
              <Text style={estilos.contadorResultados}>
                {proyectosFiltrados.length} resultado(s)
              </Text>
            )}
          </View>
          
          {proyectosFiltrados.length > 0 ? (
            proyectosFiltrados.map((proyecto) => (
              <TouchableOpacity 
                key={proyecto.id} 
                style={estilos.tarjetaProyecto}
                onPress={() => console.log('Ver proyecto:', proyecto.id)}
              >
                <View style={estilos.encabezadoProyecto}>
                  <Text style={estilos.nombreProyecto}>{proyecto.nombre}</Text>
                  <View style={estilos.badgePromedio}>
                    <Text style={estilos.textoBadge}>{proyecto.promedio}</Text>
                  </View>
                </View>
                <Text style={estilos.especialidadProyecto}>{proyecto.especialidad}</Text>
                <Text style={estilos.detalleProyecto}>Grupo {proyecto.grupo} • {proyecto.profesor}</Text>
              </TouchableOpacity>
            ))
          ) : terminoBusqueda ? (
            <View style={estilos.sinResultados}>
              <Ionicons name="search-outline" size={48} color="#9ca3af" />
              <Text style={estilos.textoSinResultados}>No se encontraron proyectos</Text>
              <Text style={estilos.subtextoSinResultados}>
                Intenta con otros términos de búsqueda
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  infoUsuario: {
    flex: 1,
  },
  saludo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  escuela: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  botonCerrarSesion: {
    padding: 8,
  },
  contenedorBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconoBusqueda: {
    marginRight: 12,
  },
  inputBusqueda: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  contenido: {
    flex: 1,
    paddingHorizontal: 20,
  },
  seccion: {
    marginBottom: 24,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  encabezadoConTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contadorResultados: {
    fontSize: 14,
    color: '#6b7280',
  },
  tarjetaDestacada: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  encabezadoTarjetaDestacada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tituloProyectoDestacado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  badgePromedio: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoBadge: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  detalleProyecto: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  contenedorAcciones: {
    flexDirection: 'row',
    gap: 12,
  },
  botonAccion: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textoBotonAccion: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  // NUEVO: Contenedor grid para especialidades
  contenedorEspecialidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tarjetaEspecialidad: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '48%', // 2 columnas con espacio entre ellas
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  encabezadoEspecialidad: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nombreEspecialidad: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  cantidadProyectos: {
    fontSize: 14,
    color: '#6b7280',
  },
  tarjetaProyecto: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  encabezadoProyecto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nombreProyecto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  especialidadProyecto: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
    marginBottom: 4,
  },
  sinResultados: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textoSinResultados: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginTop: 12,
    marginBottom: 4,
  },
  subtextoSinResultados: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default PantallaDashboard;