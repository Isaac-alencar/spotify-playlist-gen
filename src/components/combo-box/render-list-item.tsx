import { Track } from "@/domain/Track";
import { Divider, Flex, Image, ListItem, Stack, Text } from "@chakra-ui/react";

type RenderListItemProps = {
  track: Track;
  onClick: () => void;
};

export const RenderListItem = ({
  track: { name, album, albumCover, artist },
  onClick,
}: RenderListItemProps) => {
  return (
    <ListItem key={name} cursor="pointer" onClick={onClick}>
      <Flex gap={4} alignItems="center">
        <Image src={albumCover} alt={album} w={20} h={20} />
        <Stack>
          <Text color="gray.200" fontWeight="bold">
            {name}
          </Text>
          <Text color="gray.500">{artist}</Text>
        </Stack>
      </Flex>
      <Divider mt={4} color="blue.100" />
    </ListItem>
  );
};
