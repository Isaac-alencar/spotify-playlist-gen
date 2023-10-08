import { Track } from "@/domain/Track";
import { Container, List } from "@chakra-ui/react";
import { RenderListItem } from "./render-list-item";

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
