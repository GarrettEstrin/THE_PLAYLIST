import libraryItem from '../Types/Library';

export const handleClick = (song: libraryItem, currentSong: libraryItem, playNextSong: (song: libraryItem) => void) => {
  if (song.key !== currentSong.key) {
    playNextSong(song);
  }
};