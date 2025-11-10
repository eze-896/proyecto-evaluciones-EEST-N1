import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  dni: number;
}

interface TipoContextoAuth {
  usuario: Usuario | null;
  iniciarSesion: (email: string, contraseña: string) => Promise<void>;
  registrar: (datosUsuario: DatosRegistro) => Promise<void>;
  cerrarSesion: () => void;
}

interface DatosRegistro {
  email: string;
  contraseña: string;
  nombre: string;
  apellido: string;
  dni: number
}

const ContextoAuth = createContext<TipoContextoAuth | undefined>(undefined);

export const ProveedorAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const iniciarSesion = async (email: string, contraseña: string) => {
    // Simulación de inicio de sesión
    console.log('Iniciando sesión con:', email);
    setUsuario({
      id: '1',
      email,
      nombre: 'Julio',
      apellido: 'Cortazar',
      dni: 12345678
    });
    router.replace('../PantallaDashboard');
  };

  const registrar = async (datosUsuario: DatosRegistro) => {
    // Simulación de registro
    console.log('Registrando usuario:', datosUsuario);
    setUsuario({
      id: '1',
      email: datosUsuario.email,
      nombre: datosUsuario.nombre,
      apellido: datosUsuario.apellido,
      dni: datosUsuario.dni
    });
    router.replace('../PantallaDashboard');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    router.replace('../PantallaInicioSesion');
  };

  return (
    <ContextoAuth.Provider value={{ 
      usuario, 
      iniciarSesion, 
      registrar, 
      cerrarSesion 
    }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const useAuth = () => {
  const contexto = useContext(ContextoAuth);
  if (contexto === undefined) {
    throw new Error('useAuth debe ser usado dentro de un ProveedorAuth');
  }
  return contexto;
};