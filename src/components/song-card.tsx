import { Track } from "@/domain/Track";
import { CloseButton, Container, Flex, Image, Text } from "@chakra-ui/react";

type SongCardProps = {
  track: Track;
  removeItem: () => void;
};

export const SongCard = ({ track, removeItem }: SongCardProps) => {
  return (
    <Container
      bg="whiteAlpha.200"
      borderRadius="md"
      border="1px"
      borderColor="whiteAlpha.300"
      p={4}
    >
      <Flex alignItems="center" gap={4} justifyContent="space-between">
        <Flex alignItems="center" gap={4}>
          <Image src={track.albumCover} alt={track.album} w={10} h={10} />
          <Text color="gray.200" fontWeight="bold">
            {track.name}
          </Text>
        </Flex>
        <CloseButton color="gray.200" onClick={removeItem} />
      </Flex>
    </Container>
  );
};
