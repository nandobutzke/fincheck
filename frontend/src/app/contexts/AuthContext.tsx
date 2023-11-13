import { createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from "@tanstack/react-query";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storageAccessToken;
  });

  useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => {
      return 'nando'
    },
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(true);
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
