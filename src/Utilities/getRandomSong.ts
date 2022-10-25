import libraryItem from '../Types/Library';

export const randomIndex = (maxNumber: number) => Math.floor(Math.random() * ((maxNumber - 1) - 0 + 1) + 0);

const getRandomSong = (library: libraryItem[]): libraryItem => library[randomIndex(library.length)];

export default getRandomSong;
