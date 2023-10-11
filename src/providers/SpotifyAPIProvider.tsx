import { Track } from "@/domain/Track";
import { getPlaylistRecommendation } from "@/infra/getPlaylistRecommendation";
import { searchTrack } from "@/infra/searchTrack";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type GeneratePlaylistParams = {
  artistId: string;
  limit: number;
  genres: string[];
  track: string;
};

type SpotifyAPIContextProps = {
  data: Track[];
  playlistSeed: Track[];
  fetchSong: (term: string) => void;
  generatePlaylist: (params: GeneratePlaylistParams) => Promise<void>;
};

export const SpotifyAPIContext = createContext<SpotifyAPIContextProps>(
  {} as SpotifyAPIContextProps
);

export const SpotifyAPIProvider = ({ children }: PropsWithChildren) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Track[]>([]);
  const [playlistSeed, setPlaylistSeed] = useState<Track[]>([]);

  const fetchSong = useCallback((term: string) => setSearchTerm(term), []);

  const generatePlaylist = async (params: GeneratePlaylistParams) => {
    const playlist = await getPlaylistRecommendation(params);

    setPlaylistSeed(playlist);
  };

  useEffect(() => {
    if (!searchTerm) return;

    searchTrack(searchTerm)
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchTerm]);

  const value = useMemo(
    () => ({
      data: searchResult,
      playlistSeed,
      fetchSong,
      generatePlaylist,
    }),
    [searchResult, fetchSong, playlistSeed]
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
