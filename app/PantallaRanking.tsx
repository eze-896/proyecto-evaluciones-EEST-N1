import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProyectoRanking {
  id: number;
  nombre: string;
  especialidad: string;
  grupo: string;
  profesor: string;
  promedio: number;
}

const proyectosRanking: ProyectoRanking[] = [
  {
    id: 1,
    nombre: 'Sistema de Riego Automatizado',
    especialidad: 'Electrónica',
    grupo: '4° A',
    profesor: 'Carlos Rodríguez',
    promedio: 9.2,
  },
  {
    id: 2,
    nombre: 'App para Gestión Escolar',
    especialidad: 'Programación',
    grupo: '5° B',
    profesor: 'María González',
    promedio: 8.9,
  },
  {
    id: 3,
    nombre: 'Robot Seguidor de Línea',
    especialidad: 'Electromecánica',
    grupo: '6° C',
    profesor: 'Roberto Sánchez',
    promedio: 8.7,
  },
  {
    id: 4,
    nombre: 'Sistema de Monitoreo Ambiental',
    especialidad: 'Programación',
    grupo: '6° A',
    profesor: 'Laura Pérez',
    promedio: 8.5,
  },
  {
    id: 5,
    nombre: 'Planta de Tratamiento de Aguas',
    especialidad: 'Química',
    grupo: '5° C',
    profesor: 'Javier López',
    promedio: 8.3,
  },
];

const PantallaRanking: React.FC = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const proyectosFiltrados = proyectosRanking.filter((proyecto) =>
    proyecto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    proyecto.especialidad.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    proyecto.grupo.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={() => router.back()} style={estilos.botonAtras}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Ranking</Text>
        <View style={estilos.espacioVacio} />
      </View>

      <View style={estilos.formulario}>
        {/* Buscador */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Buscar en el Ranking</Text>

          <View style={estilos.contenedorBusqueda}>
            <Ionicons name="search" size={20} color="#9ca3af" style={estilos.iconoBusqueda} />
            <TextInput
              style={estilos.inputBusqueda}
              placeholder="Buscar por nombre, especialidad o grupo..."
              value={terminoBusqueda}
              onChangeText={setTerminoBusqueda}
            />
            {terminoBusqueda.length > 0 && (
              <TouchableOpacity onPress={() => setTerminoBusqueda('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          {terminoBusqueda.length > 0 && (
            <Text style={estilos.contadorResultados}>
              {proyectosFiltrados.length} resultado(s)
            </Text>
          )}
        </View>

        {/* Top 3 proyectos */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Top 3 Proyectos</Text>

          {proyectosRanking.slice(0, 3).map((proyecto, index) => (
            <View
              key={proyecto.id}
              style={[
                estilos.tarjetaTop,
                index === 0 && estilos.tarjetaTopPrimero,
              ]}
            >
              <View style={estilos.badgePosicion}>
                <Text style={estilos.textoBadgePosicion}>#{index + 1}</Text>
              </View>

              <View style={estilos.infoProyectoTop}>
                <Text style={estilos.nombreProyectoTop}>{proyecto.nombre}</Text>
                <Text style={estilos.especialidadProyectoTop}>
                  {proyecto.especialidad} • {proyecto.grupo}
                </Text>
                <Text style={estilos.detalleProyectoTop}>
                  Profesor: {proyecto.profesor}
                </Text>
              </View>

              <View style={estilos.badgePromedio}>
                <Text style={estilos.textoBadgePromedio}>
                  {proyecto.promedio.toFixed(1)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Ranking completo */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Ranking Completo</Text>

          {proyectosFiltrados.map((proyecto, index) => (
            <View key={proyecto.id} style={estilos.tarjetaProyecto}>
              <View style={estilos.colIzquierda}>
                <View style={estilos.circuloPosicion}>
                  <Text style={estilos.textoPosicion}>{index + 1}</Text>
                </View>
              </View>

              <View style={estilos.colCentro}>
                <Text style={estilos.nombreProyecto}>{proyecto.nombre}</Text>
                <Text style={estilos.especialidadProyecto}>
                  {proyecto.especialidad} • {proyecto.grupo}
                </Text>
                <Text style={estilos.detalleProyecto}>
                  Profesor: {proyecto.profesor}
                </Text>
              </View>

              <View style={estilos.colDerecha}>
                <View style={estilos.badgePromedioChico}>
                  <Text style={estilos.textoBadgePromedioChico}>
                    {proyecto.promedio.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {proyectosFiltrados.length === 0 && (
            <View style={estilos.sinResultados}>
              <Ionicons name="trophy-outline" size={32} color="#9ca3af" />
              <Text style={estilos.textoSinResultados}>
                No se encontraron proyectos en el ranking
              </Text>
            </View>
          )}
        </View>
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
    shadowOffset: { width: 0, height: 1 },
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
  // Top 3
  tarjetaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tarjetaTopPrimero: {
    borderColor: '#f59e0b',
    backgroundColor: '#fffbeb',
  },
  badgePosicion: {
    backgroundColor: '#4f46e5',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 12,
  },
  textoBadgePosicion: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  infoProyectoTop: {
    flex: 1,
  },
  nombreProyectoTop: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  especialidadProyectoTop: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 2,
  },
  detalleProyectoTop: {
    fontSize: 13,
    color: '#6b7280',
  },
  badgePromedio: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoBadgePromedio: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  // Lista completa
  tarjetaProyecto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  colIzquierda: {
    width: 40,
    alignItems: 'center',
  },
  colCentro: {
    flex: 1,
    paddingHorizontal: 8,
  },
  colDerecha: {
    width: 60,
    alignItems: 'flex-end',
  },
  circuloPosicion: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoPosicion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  nombreProyecto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  especialidadProyecto: {
    fontSize: 13,
    color: '#4f46e5',
    marginBottom: 2,
  },
  detalleProyecto: {
    fontSize: 12,
    color: '#6b7280',
  },
  badgePromedioChico: {
    backgroundColor: '#10b981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  textoBadgePromedioChico: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  sinResultados: {
    alignItems: 'center',
    paddingTop: 16,
  },
  textoSinResultados: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
});

export default PantallaRanking;
