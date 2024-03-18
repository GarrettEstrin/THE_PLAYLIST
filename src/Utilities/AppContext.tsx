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
  playNextSong: (song: libraryItem) => void,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>
  play: () => void,
  pause: () => void
}

const defaultContext: DefaultContextType = {
  currentView: View.Home,
  setCurrentView: () => View,
  currentSong: library[0],
  setCurrentSong: () => Song,
  initializedLibrary: null,
  playNextSong: (song: libraryItem) => { return song },
  isPlaying: false,
  setIsPlaying: () => false,
  play: () => { },
  pause: () => { }
};

export const AppContext = createContext(defaultContext);

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props: { children: ReactElement }) => {
  const [currentView, setCurrentView] = useState(View.Home);
  const [currentSong, setCurrentSong] = useState<libraryItem>(library[Math.floor(Math.random() * ((library.length - 1) - 0 + 1) + 0)]);
  const [initializedLibrary, setInitializedLibrary] = useState<libraryItem[] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const play = () => {
    library.forEach((song: libraryItem) => {
      if (song.key === currentSongKey && song.audio) {
        song.audio.play();
      }
    });
    setIsPlaying(true);
  }

  const pause = () => {
    library.forEach((song: libraryItem) => {
      if (song.audio) {
        song.audio.pause();
      }
    });
    setIsPlaying(false);
  }

  const resetPlayingPoints = () => {
    library.forEach((song: libraryItem) => {
      if (song.audio) {
        song.audio.currentTime = 0;
      }
    });
    setIsPlaying(false);
  }
  
  const playNextSong = (selectedSong: libraryItem) => {
    pause();
    resetPlayingPoints();
    
    if (currentSongKey === selectedSong.key && currentSong.audio) {
      currentSong.audio.play()
    } else {
      if (selectedSong.audio) {
        selectedSong.audio.play();
      }
    }
    currentSongKey = selectedSong.key;
    setCurrentSong(selectedSong);
    setIsPlaying(true);
  }

  const playRandomSong = () => {
    const limitedLibrary = library.filter((song) => song.key !== currentSongKey);
    const randomSong = getRandomSong(limitedLibrary);
    setCurrentSong(randomSong);
    currentSongKey = randomSong.key;
    if (randomSong.audio) {
      randomSong.audio.play();
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
        playRandomSong();
      })
      song.processed = true;
    });
  });

  useEffect(() => {
    // console.log("CurrentSong changed", currentSong.title);
  }, [currentSong]);

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      currentSong,
      setCurrentSong,
      initializedLibrary,
      playNextSong,
      isPlaying,
      setIsPlaying,
      play,
      pause
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
