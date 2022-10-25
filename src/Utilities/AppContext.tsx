import React, { createContext, ReactElement, SetStateAction, useContext, useEffect, useState } from 'react';

import View from '../Types/views';
import Song from '../Types/songs';
import libraryItem from '../Types/Library';
import library from './library';
import getRandomSong from './getRandomSong';

interface DefaultContextType {
  currentView: string,
  setCurrentView: React.Dispatch<SetStateAction<View>>,
  currentSong: libraryItem,
  setCurrentSong: React.Dispatch<SetStateAction<libraryItem>>,
  initializedLibrary: libraryItem[] | null,
  playNextSong: (song: libraryItem) => void
}

const defaultContext: DefaultContextType = {
  currentView: View.Home,
  setCurrentView: () => View,
  currentSong: library[0],
  setCurrentSong: () => Song,
  initializedLibrary: null,
  playNextSong: (song: libraryItem) => {return song}
};

export const AppContext = createContext(defaultContext);

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props: { children: ReactElement }) => {
  const [currentView, setCurrentView] = useState(View.Home);
  const [currentSong, setCurrentSong] = useState<libraryItem>(library[Math.floor(Math.random() * ((library.length - 1) - 0 + 1) + 0)]);
  const [initializedLibrary, setInitializedLibrary] = useState<libraryItem[] | null>(null);
  let currentSongKey = currentSong.key;

  const updateCanPlayStatus = (key: string) => {
    library?.forEach((song: libraryItem) => {
      if (song.key === key) {
        song.canPlay = true;
      }
    })
    const canPlay = library.filter((song: libraryItem) => song.canPlay === true);
    if (canPlay.length === library.length) {
      setInitializedLibrary(library);
    }
  };
  
  const playNextSong = (selectedSong?: libraryItem) => {
    if (currentSong.audio) {
      currentSong.audio.pause();
      currentSong.audio.currentTime = 0;
    }
    if (selectedSong != null) {
      setCurrentSong(selectedSong);
      currentSongKey = selectedSong.key;
    } else {
      const limitedLibrary = library.filter((song) => song.key !== currentSongKey);
      const randomSong = getRandomSong(limitedLibrary);
      setCurrentSong(randomSong);
      currentSongKey = randomSong.key;
    }
  }
  
  useEffect(() => {
    library.forEach((song: libraryItem) => {
      if (song.processed) {
        return;
      }
      song?.audio?.addEventListener('canplaythrough', () => {
        updateCanPlayStatus(song.key);
      })
      song?.audio?.addEventListener('ended', () => {
        playNextSong();
      })
      song.processed = true;
    });
  });

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      currentSong,
      setCurrentSong,
      initializedLibrary,
      playNextSong
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
