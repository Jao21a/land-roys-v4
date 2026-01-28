// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/Supabase.provider";
import Loader from "../components/common/Loader";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para cargar rol
  // Función para cargar rol
  const loadRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("usuario_rol")
        .select("rol(nombre_rol)")
        .eq("id_usuario", userId)
        .single();

      if (!error && data?.rol?.nombre_rol) {
        setRole(data.rol.nombre_rol);
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error("Error cargando rol:", err);
      setRole(null);
    }
  };

  // Inicializar sesión
  const initAuth = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session?.user) {
        setUser(session.user);
        await loadRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
    } catch (err) {
      console.error("Error inicializando sesión:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const loggedUser = data.user || data.session?.user;
    if (!loggedUser) throw new Error("No se pudo iniciar sesión");

    setUser(loggedUser);
    await loadRole(loggedUser.id);
    return loggedUser;
  };

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setUser(null);
    setRole(null);
  };

  // Escuchar cambios de sesión
  useEffect(() => {
    initAuth(); // cargar sesión al montar

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
