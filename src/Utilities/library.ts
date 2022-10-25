import libraryItem from '../Types/Library';

const library: libraryItem[] = [
  {
    title: "GoldenEye 007, 007 Watch Theme",
    artist: "Arcade Player",
    file: "goldeneye.mp3",
    album_art: "goldeneye_soundtrack.jpeg",
    audio: undefined,
    canPlay: false,
    key: 'g',
    processed: false,
    unique: 0
  },
  {
    title: "Butterfly",
    artist: "Crazy Town",
    file: "butterfly.mp3",
    album_art: "gift_of_game.jpeg",
    audio: undefined,
    canPlay: false,
    key: 'b',
    processed: false,
    unique: 0,
  },
  {
    title: "Re-Arranged",
    artist: "Limp Bizkit",
    file: "re-arranged.mp3",
    album_art: "significant_other.jpeg",
    audio: undefined,
    canPlay: false,
    key: 'r',
    processed: false,
    unique: 0
  }
];

const setupLibrary = () => {
  library.forEach((song) => {
    const audio = new Audio(`/audio/${song.file}`);
    song.audio = audio;
  })
  return library;
}

export default setupLibrary();
