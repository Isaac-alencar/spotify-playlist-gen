import { cacheService } from "@/services/cacheService";

import { getAuthToken } from "./getApiToken";
import { mapToDomainFormat } from "./mapToDomainFormat";

type GetApiToken = ReturnType<typeof getAuthToken>;

type GetPlaylistRecommendationParams = {
  artistId: string[];
  limit: number;
  genres: string[];
  track: string[];
};

export const getPlaylistRecommendation = async ({
  artistId,
  genres,
  limit,
  track,
}: GetPlaylistRecommendationParams) => {
  const { fetch: fetchCache } = cacheService({
    callback: getAuthToken,
    expirationTime: 3600,
  });

  const credentials = await fetchCache<GetApiToken>("credentials");

  const seed_genres = artistId.join("%2C");
  const seed_artists = genres.join("%2C");
  const seed_tracks = track.join("%2C");

  const BASE_URL = "https://api.spotify.com/v1/recommendations";

  const response = await fetch(
    `${BASE_URL}?limit=${limit}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}`,
    {
      headers: {
        Authorization: `Bearer ${credentials?.access_token}`,
      },
    }
  );
  const data = await response.json();

  return mapToDomainFormat(data.tracks);
};
