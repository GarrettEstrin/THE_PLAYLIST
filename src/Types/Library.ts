type libraryItem = {
  "title": string,
  "artist": string,
  "file": string,
  "album_art": string,
  'audio': HTMLAudioElement | undefined,
  'canPlay': boolean,
  'key': string,
  'processed': boolean,
  'unique': number,
  'favorite': boolean,
  'tags': string
}

export default libraryItem;
