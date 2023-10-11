import { getAuthToken } from "./getApiToken";
import { mapToDomainFormat } from "./mapToDomainFormat";

type GetPlaylistRecommendationParams = {
  artistId: string;
  limit: number;
  genres: string[];
  track: string;
};

export const getPlaylistRecommendation = async ({
  artistId,
  genres,
  limit,
  track,
}: GetPlaylistRecommendationParams) => {
  const { token } = await getAuthToken();

  const seed_genres = genres.join("%2C");
  const BASE_URL = "https://api.spotify.com/v1/recommendations";
  const response = await fetch(
    `${BASE_URL}?limit=${limit}&seed_artists=${artistId}&seed_genres=${seed_genres}&seed_tracks=${track}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return mapToDomainFormat(data.tracks);
};
