const isDevelopment = process.env.NODE_ENV === "development";

export const requestUserAuth = async () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = isDevelopment
    ? "http://localhost:3000/callback"
    : process.env.NEXT_PUBLIC_CALLBACK_URI;
  const BASE_URL = "https://accounts.spotify.com/authorize";

  const state = crypto.getRandomValues(new Uint32Array(4)).join("");

  const scope =
    "user-read-private playlist-modify-public playlist-modify-private";
  const queryParams = new URLSearchParams();
  queryParams.set("response_type", "code");
  queryParams.set("client_id", CLIENT_ID as string);
  queryParams.set("scope", scope);
  queryParams.set("state", state);
  queryParams.set("redirect_uri", REDIRECT_URI as string);

  const spotifyAuthURL = `${BASE_URL}?${queryParams}`;

  window.location.href = spotifyAuthURL;
};
