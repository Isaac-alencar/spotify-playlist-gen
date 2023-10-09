import { Track, createTrack } from "@/domain/Track";

type Artist = {
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

type Album = {
  name: string;
  images: {
    url: string;
  }[];
};

type Results = {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
};

type SpotifyAPIResponse = {
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

export const searchTrack = async (searchTerm: string): Promise<Track[]> => {
  const { token } = await getAuthToken();

  const requestParams = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
    requestParams
  );
  const data = await response.json();

  return mapToDomainFormat(data);
};

export const getAuthToken = async () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const BASE_URL = "https://accounts.spotify.com/api/token";

  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  };

  const response = await fetch(BASE_URL, requestOptions);

  const data = await response.json();

  return { token: data.access_token };
};

const mapToDomainFormat = (data: SpotifyAPIResponse): Track[] => {
  const tracks = data.tracks.items.map((item) => {
    return createTrack({
      id: item.id,
      name: item.name,
      album: item.album.name,
      albumCover: item.album.images[0].url,
      artist: item.artists[0].name,
    });
  });

  return tracks;
};
