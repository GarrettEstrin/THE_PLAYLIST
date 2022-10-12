import React, { createContext, ReactElement, SetStateAction, useContext, useState } from 'react';

interface DefaultContextType {
  currentView: string,
  setCurrentView: React.Dispatch<SetStateAction<string>>
}

const defaultContext: DefaultContextType = {
  currentView: 'home',
  setCurrentView: () => String
};

export const AppContext = createContext(defaultContext);

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props: { children: ReactElement }) => {
  const [currentView, setCurrentView] = useState('home');
  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
