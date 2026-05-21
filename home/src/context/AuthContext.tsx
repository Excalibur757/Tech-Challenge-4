"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  verificarTokenService,
  logoutService,
} from "@/context/auth/auth.service";

type AuthContextType = {
  token: string | null;
  userName: string | null;
  loading: boolean;
  login: (token: string, userName: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verificarAuth() {
      try {
        const data = await verificarTokenService();

        if (data.verificarToken.success) {
          setToken("authenticated");
          setUserName(
            data.verificarToken.user?.email || null
          );
        }
      } catch (error) {
        setToken(null);
        setUserName(null);
      } finally {
        setLoading(false);
      }
    }

    verificarAuth();
  }, []);

  function login(token: string, userName: string) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", userName);

    setToken(token);
    setUserName(userName);
  }

  const logout = async () => {
    await logoutService();

    // Limpa autenticação
    setToken(null);
    setUserName(null);

    // Limpa cache local
    localStorage.removeItem("extratos");

    // Limpa outros dados locais
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");

    window.location.href = "http://localhost:3001/";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be usado dentro do AuthProvider"
    );
  }

  return ctx;
}