import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'usehooks-ts'
import { useLogin } from '../hooks/api/useLogin';
import { User } from '../types/user';

interface AuthContextProps {
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  login: (userEmail: string) => void;
  logout: () => void;
  user: User | null;
  reset: () => void;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);

export function AuthContextProvider<T>({ children }: PropsWithChildren<T>) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const router = useRouter();

  const { mutate, isLoading, isError, reset } = useLogin({
    onSuccess: (data) => {
      setUser(data);
      setIsLoggedIn(true);
    },
  });

  const login = (email: string) => {
    reset();
    mutate({ email });
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  }

  useEffect(() => {
    if (user) {
      void router.push('/dashboard');
    } else {
      void router.push('/');
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        isError,
        login,
        reset,
        user,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext can only be used inside AuthContextProvider');
  }
  return context;
}

