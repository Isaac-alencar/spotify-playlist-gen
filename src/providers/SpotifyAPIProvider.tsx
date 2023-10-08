import { Track } from "@/domain/Track";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type SpotifyAPIContextProps = {
  items: Track[];
};

export const SpotifyAPIContext = createContext<SpotifyAPIContextProps>(
  {} as SpotifyAPIContextProps
);

export const SpotifyAPIProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(
    () => ({
      items,
    }),
    []
  );

  return (
    <SpotifyAPIContext.Provider value={value}>
      {children}
    </SpotifyAPIContext.Provider>
  );
};

export const useSpotifyAPI = () => {
  const context = useContext(SpotifyAPIContext);

  if (!context) {
    throw new Error("useSpotifyAPI must be inside SpotifyAPIProvider!");
  }

  return context;
};

const items = [
  {
    name: "Clarity",
    artist: "John Mayer",
    album: "heavier things",
    albumCover:
      "https://imusic.b-cdn.net/images/item/original/224/5099751347224.jpg?john-mayer-2003-heavier-things-cd&class=scaled&v=1091440603",
  },
  {
    name: "Are you bored yet?",
    artist: "Wallows",
    album: "Nothing Happens",
    albumCover:
      "https://e.snmc.io/i/600/w/eedcdfbc92c93f9cb7c40595f3c9d8b0/9360399/wallows-nothing-happens-Cover-Art.jpg",
  },
];
