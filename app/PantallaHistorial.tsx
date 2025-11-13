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

type TipoEvento = 'proyecto' | 'evaluacion';

interface EventoHistorial {
  id: number;
  tipo: TipoEvento;
  nombreProyecto: string;
  especialidad: string;
  fecha: string;      // YYYY-MM-DD o texto
  descripcion: string;
}

// Datos de ejemplo – después se conectan a Laravel
const datosHistorial: EventoHistorial[] = [
  {
    id: 1,
    tipo: 'evaluacion',
    nombreProyecto: 'Sistema de Riego Automatizado',
    especialidad: 'Electrónica',
    fecha: '2024-01-16',
    descripcion: 'Evaluación final – promedio 9.2/10',
  },
  {
    id: 2,
    tipo: 'proyecto',
    nombreProyecto: 'App para Gestión Escolar',
    especialidad: 'Programación',
    fecha: '2024-01-15',
    descripcion: 'Proyecto cargado por el profesor García',
  },
  {
    id: 3,
    tipo: 'evaluacion',
    nombreProyecto: 'Robot Seguidor de Línea',
    especialidad: 'Electromecánica',
    fecha: '2024-01-14',
    descripcion: 'Primera evaluación del jurado interno',
  },
  {
    id: 4,
    tipo: 'proyecto',
    nombreProyecto: 'Sistema de Monitoreo Ambiental',
    especialidad: 'Programación',
    fecha: '2024-01-13',
    descripcion: 'Proyecto cargado por la profesora Pérez',
  },
];

const PantallaHistorial: React.FC = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TipoEvento>('todos');

  const formatearFecha = (fecha: string): string => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      const [y, m, d] = fecha.split('-');
      return `${d}/${m}/${y}`;
    }
    return fecha;
  };

  const historialFiltrado = datosHistorial.filter((evento) => {
    const texto = terminoBusqueda.toLowerCase();

    const coincideTexto =
      evento.nombreProyecto.toLowerCase().includes(texto) ||
      evento.especialidad.toLowerCase().includes(texto) ||
      evento.descripcion.toLowerCase().includes(texto);

    const coincideTipo =
      filtroTipo === 'todos' ? true : evento.tipo === filtroTipo;

    return coincideTexto && coincideTipo;
  });

  const handleVolver = () => {
    // si no hay nada atrás, volvemos al Dashboard
    try {
      // @ts-ignore por si la versión de expo-router no lo tipa
      if (router.canGoBack && router.canGoBack()) {
        router.back();
      } else {
        router.replace('/PantallaDashboard');
      }
    } catch {
      router.replace('/PantallaDashboard');
    }
  };

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={handleVolver} style={estilos.botonAtras}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Historial</Text>
        <View style={estilos.espacioVacio} />
      </View>

      <View style={estilos.formulario}>
        {/* Buscador + filtros */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Buscar en el Historial</Text>

          <View style={estilos.contenedorBusqueda}>
            <Ionicons name="search" size={20} color="#9ca3af" style={estilos.iconoBusqueda} />
            <TextInput
              style={estilos.inputBusqueda}
              placeholder="Buscar por proyecto, especialidad o descripción..."
              value={terminoBusqueda}
              onChangeText={setTerminoBusqueda}
            />
            {terminoBusqueda.length > 0 && (
              <TouchableOpacity onPress={() => setTerminoBusqueda('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          <View style={estilos.filtrosTipo}>
            <TouchableOpacity
              style={[
                estilos.chipFiltro,
                filtroTipo === 'todos' && estilos.chipFiltroActivo,
              ]}
              onPress={() => setFiltroTipo('todos')}
            >
              <Text
                style={[
                  estilos.textoChip,
                  filtroTipo === 'todos' && estilos.textoChipActivo,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                estilos.chipFiltro,
                filtroTipo === 'proyecto' && estilos.chipFiltroActivo,
              ]}
              onPress={() => setFiltroTipo('proyecto')}
            >
              <Text
                style={[
                  estilos.textoChip,
                  filtroTipo === 'proyecto' && estilos.textoChipActivo,
                ]}
              >
                Proyectos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                estilos.chipFiltro,
                filtroTipo === 'evaluacion' && estilos.chipFiltroActivo,
              ]}
              onPress={() => setFiltroTipo('evaluacion')}
            >
              <Text
                style={[
                  estilos.textoChip,
                  filtroTipo === 'evaluacion' && estilos.textoChipActivo,
                ]}
              >
                Evaluaciones
              </Text>
            </TouchableOpacity>
          </View>

          {(terminoBusqueda.length > 0 || filtroTipo !== 'todos') && (
            <Text style={estilos.contadorResultados}>
              {historialFiltrado.length} registro(s) encontrado(s)
            </Text>
          )}
        </View>

        {/* Lista del historial */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Historial de proyectos/evaluaciones</Text>

          {historialFiltrado.map((evento) => (
            <View key={evento.id} style={estilos.tarjetaEvento}>
              <View style={estilos.colIcono}>
                <View
                  style={[
                    estilos.iconoFondo,
                    evento.tipo === 'proyecto'
                      ? estilos.iconoProyecto
                      : estilos.iconoEvaluacion,
                  ]}
                >
                  <Ionicons
                    name={evento.tipo === 'proyecto' ? 'folder-open' : 'document-text'}
                    size={20}
                    color="white"
                  />
                </View>
              </View>

              <View style={estilos.colContenido}>
                <Text style={estilos.nombreProyecto}>{evento.nombreProyecto}</Text>
                <Text style={estilos.especialidad}>{evento.especialidad}</Text>
                <Text style={estilos.descripcion}>{evento.descripcion}</Text>
              </View>

              <View style={estilos.colFecha}>
                <View style={estilos.badgeFecha}>
                  <Ionicons name="calendar-outline" size={14} color="#4b5563" />
                  <Text style={estilos.textoFecha}>
                    {formatearFecha(evento.fecha)}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {historialFiltrado.length === 0 && (
            <View style={estilos.sinResultados}>
              <Ionicons name="time-outline" size={32} color="#9ca3af" />
              <Text style={estilos.textoSinResultados}>
                No se encontraron registros en el historial
              </Text>
              <Text style={estilos.subtextoSinResultados}>
                Probá cambiando el filtro o el término de búsqueda
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
  filtrosTipo: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  chipFiltro: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  chipFiltroActivo: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  textoChip: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  textoChipActivo: {
    color: 'white',
  },
  contadorResultados: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  tarjetaEvento: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  colIcono: {
    width: 40,
    alignItems: 'center',
    marginRight: 8,
  },
  iconoFondo: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoProyecto: {
    backgroundColor: '#3b82f6',
  },
  iconoEvaluacion: {
    backgroundColor: '#059669',
  },
  colContenido: {
    flex: 1,
    paddingRight: 8,
  },
  colFecha: {
    alignItems: 'flex-end',
  },
  nombreProyecto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  especialidad: {
    fontSize: 13,
    color: '#4f46e5',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 12,
    color: '#6b7280',
  },
  badgeFecha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  textoFecha: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  sinResultados: {
    alignItems: 'center',
    paddingTop: 16,
  },
  textoSinResultados: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    marginBottom: 4,
  },
  subtextoSinResultados: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default PantallaHistorial;
