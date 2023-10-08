import { CloseButton, Container, Flex, Image, Text } from "@chakra-ui/react";
import { Track } from "./combo-box/combo-box";

type SongCardProps = {
  track: Track;
  removeItem: () => void;
};

export const SongCard = ({ track, removeItem }: SongCardProps) => {
  return (
    <Container
      bg="blackAlpha.200"
      borderRadius="md"
      border="1px"
      borderColor="blackAlpha.300"
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
