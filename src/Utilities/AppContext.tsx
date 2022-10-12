import React, { createContext, ReactElement, SetStateAction, useContext, useState } from 'react';

import View from '../Types/views';

interface DefaultContextType {
  currentView: string,
  setCurrentView: React.Dispatch<SetStateAction<View>>
}

const defaultContext: DefaultContextType = {
  currentView: View.Home,
  setCurrentView: () => View
};

export const AppContext = createContext(defaultContext);

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props: { children: ReactElement }) => {
  const [currentView, setCurrentView] = useState(View.Home);
  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
