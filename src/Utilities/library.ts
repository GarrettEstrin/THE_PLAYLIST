import libraryItem from '../Types/Library';

const tags = "chill party chillin";
const s3_path = "https://theplaylist.s3.us-west-2.amazonaws.com";

const library: libraryItem[] = [
  {
    title: "007 Watch Theme",
    artist: "Arcade Player",
    file: "goldeneye.mp3",
    album_art: "goldeneye_soundtrack.jpeg",
    audio: undefined,
    canPlay: false,
    key: 'g',
    processed: false,
    unique: 0,
    favorite: false,
    tags,
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
    favorite: false,
    tags,
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
    unique: 0,
    favorite: false,
    tags,
  }
];

const getFavorites = () => {
  const rawFavorites = localStorage.favorites;
  let parsedFavorites: string[] = [];
  if (rawFavorites) {
    try {
      parsedFavorites = JSON.parse(rawFavorites);
    } catch (error) {}
  }
  return parsedFavorites;
}

const saveFavorites = (favorites: string[]) => {
  localStorage.favorites = JSON.stringify(favorites);
};

const setupLibrary = () => {

  library.forEach((song) => {
    if (process.env.NODE_ENV === 'development') { 
      song.file = song.file.replace('.mp3', '-dev.mp3', );
    }
    const parsedFavorites = getFavorites();
    const audio = new Audio(s3_path + `/audio/${song.file}`);
    song.audio = audio;
    if (parsedFavorites.includes(song.key)) {
      song.favorite = true;
    }
    // set s3_path for album_art
    song.album_art = `${s3_path}/album_covers/${song.album_art}`
  })
  return library;
}

export default setupLibrary();
export { getFavorites, saveFavorites };
