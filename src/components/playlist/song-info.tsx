import { Button, Stack, Text } from "@chakra-ui/react";

import { Track } from "@/domain/Track";

export const SongInfo = ({ track }: { track: Track }) => {
  return (
    <Stack w="100%">
      <Text
        w="fit-content"
        color="gray.200"
        fontWeight="bold"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {track.name}
      </Text>
      <Text color="gray.200">{track.artist}</Text>
      {track.previewSongUrl && (
        <Button justifyContent="flex-start" variant="link" colorScheme="green">
          <a href={track.previewSongUrl} target="_blank">
            Check the song
          </a>
        </Button>
      )}
    </Stack>
  );
};
