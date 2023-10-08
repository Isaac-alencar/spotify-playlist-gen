export type Track = {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumCover: string;
};

export const createTrack = <T extends Track>(props: T): Track => {
  return {
    id: props.id,
    name: props.name,
    artist: props.artist,
    album: props.album,
    albumCover: props.albumCover,
  };
};
