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
  playNextSong: (song: string) => void,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>
  play: () => void,
  pause: () => void
  getSearchSuggestion: () => string
  setHeaderHeight: React.Dispatch<SetStateAction<number>>
  setFooterHeight: React.Dispatch<SetStateAction<number>>
  viewHeight: number
}

const defaultContext: DefaultContextType = {
  currentView: View.Home,
  setCurrentView: () => View,
  currentSong: library[0],
  setCurrentSong: () => Song,
  initializedLibrary: null,
  playNextSong: (song: string) => { return song },
  isPlaying: false,
  setIsPlaying: () => false,
  play: () => { },
  pause: () => { },
  getSearchSuggestion: () => { return "" },
  setHeaderHeight: () => 0,
  setFooterHeight: () => 0,
  viewHeight: 0
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [viewHeight, setViewHeight] = useState(0)
  let currentSongKey = currentSong.key;

  const getSearchSuggestion = (): string => {
    const searchSuggestions = library.reduce((accSearchTerms: string[], song: libraryItem) => { 
      accSearchTerms.push(song.artist);
      accSearchTerms.push(song.title);
      return accSearchTerms;
    }, [])
    return searchSuggestions[Math.floor(Math.random() * ((searchSuggestions.length - 1) - 0 + 1) + 0)];
  }

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
  
  const playNextSong = (selectedSongKey: string) => {
    pause();
    resetPlayingPoints();

    const selectedSong = library.find((song) => {
      return selectedSongKey === song.key;
    });
    if (!selectedSong) {
      return;
    }

    if (selectedSong.audio) {
      selectedSong.audio.play();
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
    console.log({ headerHeight, footerHeight });
    const htmlHeight = document.body.clientHeight;
    setViewHeight(htmlHeight - headerHeight - footerHeight);
  }, [headerHeight, footerHeight])

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
      pause,
      getSearchSuggestion,
      setHeaderHeight,
      setFooterHeight,
      viewHeight
    }}>
      {props.children}
    </AppContext.Provider>
  );
};
