import React, { createContext, ReactElement, SetStateAction, useContext, useState } from 'react';

import View from '../Types/views';
import Song from '../Types/songs';
import library from './library.json';

interface DefaultContextType {
  currentView: string,
  setCurrentView: React.Dispatch<SetStateAction<View>>,
  library: {},
  currentSong: string,
  setCurrentSong: React.Dispatch<SetStateAction<Song>>,
}

const defaultContext: DefaultContextType = {
  currentView: View.Home,
  setCurrentView: () => View,
  library,
  currentSong: Song.Butterfly,
  setCurrentSong: () => Song,
};

export const AppContext = createContext(defaultContext);

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props: { children: ReactElement }) => {
  const [currentView, setCurrentView] = useState(View.Home);
  const [currentSong, setCurrentSong] = useState(Song.Butterfly);
  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      library,
      currentSong,
      setCurrentSong
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
