import { Track } from "@/domain/Track";
import { cacheService } from "@/services/cacheService";

import { getAuthToken } from "./getApiToken";
import { mapToDomainFormat } from "./mapToDomainFormat";

type GetApiToken = ReturnType<typeof getAuthToken>;

export const searchTrack = async (searchTerm: string): Promise<Track[]> => {
  const { fetch: fetchCache } = cacheService({
    callback: getAuthToken,
    expirationTime: 3600,
  });

  const credentials = await fetchCache<GetApiToken>("credentials");

  const requestParams = {
    method: "GET",
    headers: {
      Authorization: `${credentials?.token_type} ${credentials?.access_token}`,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
    requestParams
  );
  const data = await response.json();

  return mapToDomainFormat(data.tracks.items);
};
