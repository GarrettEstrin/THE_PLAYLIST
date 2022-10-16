import libraryItem from '../Types/Library';

const getRandomSong = (library: libraryItem[]): libraryItem => {
  const randomIndex = Math.floor(Math.random() * ((library.length - 1) - 0 + 1) + 0);
  return library[randomIndex];
}

export default getRandomSong;
