import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const login = async (usuario) => {
    setUsuarioLogado(usuario);
  };

  const logout = async () => {
    setUsuarioLogado(null);
  };

  const isFuncionario = () => {
    return !!usuarioLogado && usuarioLogado.cargo?.toString().trim().toLowerCase() === 'funcionario';
  };

  const isGerente = () => {
    return !!usuarioLogado && usuarioLogado.cargo?.toString().trim().toLowerCase() === 'gerente';
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout, isFuncionario, isGerente }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
