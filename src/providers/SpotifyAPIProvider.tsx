import { Track } from "@/domain/Track";
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

type SpotifyAPIContextProps = {
  data: Track[];
  fetchSong: (term: string) => void;
};

export const SpotifyAPIContext = createContext<SpotifyAPIContextProps>(
  {} as SpotifyAPIContextProps
);

export const SpotifyAPIProvider = ({ children }: PropsWithChildren) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Track[]>([]);

  const fetchSong = useCallback((term: string) => setSearchTerm(term), []);

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
      fetchSong,
    }),
    [searchResult, fetchSong]
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
