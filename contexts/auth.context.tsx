import React, { Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'usehooks-ts'
import { useLogin } from '../hooks/api/useLogin';
import { User } from '../types/user';
import { useMixpanel } from './mixpanel.context';

interface AuthContextProps {
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  login: (userEmail: string) => void;
  logout: () => void;
  user: User | null;
  reset: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);

export function AuthContextProvider<T>({ children }: PropsWithChildren<T>) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const router = useRouter();

  const mixpanel = useMixpanel();

  const { mutate, isLoading, isError, reset } = useLogin({
    onSuccess: (data) => {
      setUser(data);
      setIsLoggedIn(true);

      mixpanel.identify(data.id);
      mixpanel.people.set({
        'age': data.age,
        'gender': data.gender.toLowerCase(),
        'subscription_plan': data.subscriptionPlan.toLowerCase(),
        'company': data.company,
      });
      mixpanel.track('login_completed', {
        'login_method': 'email'
      })

      void router.push('/dashboard');
    },
  });

  const login = (email: string) => {
    reset();
    mutate({ email });
  }

  const logout = () => {
    mixpanel.reset();
    setIsLoggedIn(false);
    setUser(null);
    void router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        isError,
        login,
        reset,
        user,
        logout,
        setUser,
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

