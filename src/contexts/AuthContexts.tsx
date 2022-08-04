import { createContext, ReactNode, useState } from "react";

import axios from "axios";
import { setCookie } from "nookies";

import { UserLoginProps } from "../@types/UserProps";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ username, password }: UserLoginProps) => Promise<boolean>;
  logOut: () => Promise<any>;
  user: string | null;
}

interface AuthProviderType {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<string | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ username, password }: UserLoginProps) {
    try {
      const response = await axios.post(
        `/api/login?USERNAME=${username.toUpperCase()}&`,
        {
          username,
          password,
        }
      );
      if (!response || response.status != 200) {
        return false;
      }

      setCookie(undefined, "access_token", response.data.access, {
        maxAge: 60 * 60 * 3, // 3 horas
      });
      setCookie(undefined, "usuario", username, {
        maxAge: 60 * 60 * 3, // 3 horas
      });
      setCookie(undefined, "logado", 'TRUE', {
        maxAge: 60 * 60 * 3, // 3 horas
      });

      setUser(username);
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function logOut() {

    setCookie(undefined, "access_token", "", {
      maxAge: 60 * 60 * 3, // 3 horas
    });
    setCookie(undefined, "usuario", "", {
      maxAge: 60 * 60 * 3, // 3 horas
    });
    setCookie(undefined, "logado", 'FALSE', {
      maxAge: 60 * 60 * 3, // 3 horas
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
