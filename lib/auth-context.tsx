"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  updateUserRole: (role: UserRole) => void;
  logout: () => void;
  isSeller: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("titan_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem("titan_user");
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, _password: string, role: UserRole) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser: User = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        name: email.split("@")[0],
        email,
        role,
      };
      setUser(newUser);
      localStorage.setItem("titan_user", JSON.stringify(newUser));
      setIsLoading(false);
    },
    []
  );

  const signup = useCallback(
    async (name: string, email: string, _password: string, role: UserRole) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser: User = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        name,
        email,
        role,
      };
      setUser(newUser);
      localStorage.setItem("titan_user", JSON.stringify(newUser));
      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("titan_user");
  }, []);

  const updateUserRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, role };
      localStorage.setItem("titan_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        updateUserRole,
        logout,
        isSeller: user?.role === "seller",
        isUser: user?.role === "user",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
