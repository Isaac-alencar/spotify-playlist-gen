import { Track } from "@/domain/Track";
import { useCallback, useEffect, useState } from "react";

import { useSpotifyAPI } from "@/providers/SpotifyAPIProvider";
import { includesSubstr } from "@/utils/include-substr";

type UseSearchTrackParams = {
  searchTerm: string;
};

export const useSearchTrack = ({ searchTerm }: UseSearchTrackParams) => {
  const { data } = useSpotifyAPI();

  const [searchResult, setSearchResult] = useState<Track[]>([]);
  const [selectedItem, setSelectedItem] = useState<Track>();

  const filterList = useCallback(() => {
    if (searchTerm) {
      const nextResults = data.filter((track) =>
        includesSubstr(track.name, searchTerm)
      );

      setSearchResult(nextResults);
      return;
    }

    setSearchResult([]);
  }, [searchTerm, data]);

  const selectItem = (track: Track) => setSelectedItem(track);
  const removeSelectedItem = () => setSelectedItem(undefined);

  useEffect(() => {
    filterList();
  }, [filterList]);

  return {
    searchResult,
    selectedItem,
    selectItem,
    removeSelectedItem,
  };
};
