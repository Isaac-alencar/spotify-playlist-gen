import {
  Container,
  Divider,
  Flex,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";

export type Track = {
  name: string;
  artist: string;
  album: string;
  albumCover: string;
};

type ComboBoxProps = {
  items: Track[];
  onSelectItem: (item: Track) => void;
};

export const ComboBox = ({ items, onSelectItem }: ComboBoxProps) => {
  if (!items.length) {
    return null;
  }

  const handleClick = (name: string) => {
    const selectedItem = items.find((track) => track.name === name);

    if (selectedItem) onSelectItem(selectedItem);

    return;
  };

  return (
    <Container borderRadius="md" padding={4}>
      <List
        spacing={4}
        p={4}
        bg="blackAlpha.200"
        borderRadius="md"
        border="1px"
        borderColor="blackAlpha.300"
      >
        {items.map((track) => {
          return (
            <RenderListItem
              key={track.name}
              track={track}
              onClick={() => handleClick(track.name)}
            />
          );
        })}
      </List>
    </Container>
  );
};

type RenderListItemProps = {
  track: Track;
  onClick: () => void;
};

const RenderListItem = ({
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
