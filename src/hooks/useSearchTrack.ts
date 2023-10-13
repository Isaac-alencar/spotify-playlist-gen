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
  const [selectedItems, setSelectedItems] = useState<Track[]>([]);

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

  const selectItem = (track: Track) =>
    setSelectedItems((old) => {
      if (old.length >= 2) {
        return old;
      }

      return [...old, track];
    });

  const removeSelectedItem = (track: Track) =>
    setSelectedItems((old) => {
      return old.filter((item) => item.id !== track.id);
    });

  useEffect(() => {
    filterList();
  }, [filterList]);

  return {
    searchResult,
    selectedItems,
    selectItem,
    removeSelectedItem,
  };
};
