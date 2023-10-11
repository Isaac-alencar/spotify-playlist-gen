import { Track, createTrack } from "@/domain/Track";
type Artist = {
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
  genres: string[];
};

type Album = {
  name: string;
  images: {
    url: string;
  }[];
};

type Results = {
  id: string;
  preview_url: string;
  name: string;
  album: Album;
  artists: Artist[];
};

type SpotifySearchAPIResponse = {
  tracks: {
    href: string;
    items: Results[];
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
  };
};

export const mapToDomainFormat = (
  data: SpotifySearchAPIResponse["tracks"]["items"]
): Track[] => {
  const tracks = data.map((item) => {
    return createTrack({
      id: item.id,
      name: item.name,
      album: item.album.name,
      albumCover: item.album.images[0].url,
      artistId: item.artists[0].id,
      artist: item.artists[0].name,
      genres: item.artists[0].genres,
      previewSongUrl: item.preview_url,
    });
  });

  return tracks;
};
