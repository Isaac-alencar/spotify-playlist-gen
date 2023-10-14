type APIResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
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

  const response = await fetch(`${BASE_URL}`, requestOptions);
  const data = await response.json();

  return data as APIResponse;
};
