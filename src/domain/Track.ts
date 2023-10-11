export type Track = {
  id: string;
  name: string;
  artistId: string;
  artist: string;
  album: string;
  albumCover: string;
  genres: string[];
  previewSongUrl: string;
};

export const createTrack = <T extends Track>(props: T): Track => {
  return {
    id: props.id,
    name: props.name,
    artistId: props.artistId,
    artist: props.artist,
    album: props.album,
    albumCover: props.albumCover,
    genres: props.genres,
    previewSongUrl: props.previewSongUrl,
  };
};
