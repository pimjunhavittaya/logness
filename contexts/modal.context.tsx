import React, { Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

export enum Modal {
  Login,
  SignUp,
  Newsletter,
}

interface ModalContextProps {
  modalOpened: Modal | null;
  setModalOpened: Dispatch<SetStateAction<Modal | null>>;
}

export const ModalContext = React.createContext<ModalContextProps | null>(null);

export function ModalContextProvider<T>({ children }: PropsWithChildren<T>) {
  const [modalOpened, setModalOpened] = useState<Modal | null>(null);

  return (
    <ModalContext.Provider
      value={{
        modalOpened,
        setModalOpened,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext can only be used inside ModalContextProvider');
  }
  return context;
}
