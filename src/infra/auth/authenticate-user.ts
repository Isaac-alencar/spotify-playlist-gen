type AuthenticateUserParams = {
  code: string;
};

type APIResponse = {
  access_token: string;
  scope: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
};

const isDevelopment = process.env.NODE_ENV === "development";

export const authenticateUser = async ({ code }: AuthenticateUserParams) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const BASE_URL = "https://accounts.spotify.com/api/token";

  const REDIRECT_URI = isDevelopment
    ? "http://localhost:3000/callback"
    : process.env.NEXT_PUBLIC_CALLBACK_URI;

  const bodyRequest = new URLSearchParams();
  bodyRequest.append("code", code);
  bodyRequest.append("grant_type", "authorization_code");
  bodyRequest.append("redirect_uri", REDIRECT_URI as string);

  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyRequest,
  };

  const response = await fetch(`${BASE_URL}`, requestOptions);
  const data = await response.json();

  return data as APIResponse;
};

type RefreshAuthTokenParams = {
  refresh_token: string;
};

export const refreshAuthToken = async ({
  refresh_token,
}: RefreshAuthTokenParams) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const BASE_URL = "https://accounts.spotify.com/api/token";

  const bodyRequest = new URLSearchParams();
  bodyRequest.append("grant_type", "refresh_token");
  bodyRequest.append("refresh_token", refresh_token);

  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyRequest,
  };

  const response = await fetch(`${BASE_URL}`, requestOptions);
  const data = await response.json();

  return data as APIResponse;
};
