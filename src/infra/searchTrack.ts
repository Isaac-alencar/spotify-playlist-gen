import { Track } from "@/domain/Track";
import { getAuthToken } from "./getApiToken";
import { mapToDomainFormat } from "./mapToDomainFormat";

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

  return mapToDomainFormat(data.tracks.items);
};
