import _ from "lodash";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Stack,
  Text,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { Track } from "@/domain/Track";
import { useSpotifyAPI } from "@/providers/SpotifyAPIProvider";
import { useSearchTrack } from "@/hooks/useSearchTrack";

import { SearchBar, ComboBox, SongCard } from "@/components";
import { Header } from "@/components/header";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const { push } = useRouter();

  const { fetchSong, generatePlaylist } = useSpotifyAPI();

  const { searchResult, selectedItems, selectItem, removeSelectedItem } =
    useSearchTrack({ searchTerm });

  const DEBOUNCE_TIME_IN_MS = 1000;

  const debouncedFetchSong = useMemo(() => {
    return _.debounce(
      (trackName: string) => fetchSong(trackName),
      DEBOUNCE_TIME_IN_MS
    );
  }, [fetchSong]);

  const handleSearchBar = (value: string) => {
    setSearchTerm(value);

    debouncedFetchSong(value);
  };

  const handleClick = async (selectedItem: Track[]) => {
    setIsLoading(true);

    try {
      await generatePlaylist({
        limit: 10,
        artistId: selectedItems.flatMap((i) => i.artistId),
        genres: selectedItem.flatMap((i) => i.genres),
        track: selectedItem.map((i) => i.id),
      });

      push("playlist");
    } catch (error) {
      toast({
        title: "Error while creating your playlist",
        description: "We've not created your playlist.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <SearchBar value={searchTerm} onChange={handleSearchBar} />
      <ComboBox
        items={searchResult}
        onSelectItem={(item) => {
          selectItem(item);
          setSearchTerm("");
        }}
      />
      {selectedItems.length > 0 && (
        <Container>
          <Stack spacing={6}>
            <Text color="gray.200" fontWeight="bold">
              Selected song(s):
            </Text>
            {selectedItems.map((item) => {
              return (
                <SongCard
                  key={item.id}
                  track={item}
                  removeItem={() => removeSelectedItem(item)}
                />
              );
            })}
          </Stack>
          <Button
            w="full"
            colorScheme="green"
            my={6}
            onClick={() => handleClick(selectedItems)}
          >
            {isLoading ? <Spinner /> : "Generate Playlist"}
          </Button>
        </Container>
      )}
    </React.Fragment>
  );
}
