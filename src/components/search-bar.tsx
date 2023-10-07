import { Button, Container, Input } from "@chakra-ui/react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Container display="flex" w="full" gap={2} py={4}>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="text"
        placeholder="Search for an artist"
        variant="filled"
        borderColor="blackAlpha.200"
        bg="blackAlpha.200"
        color="gray.200"
        _focus={{
          borderColor: "green.200",
        }}
        _hover={{
          bg: "blackAlpha.300",
        }}
      />
      <Button colorScheme="green">Search</Button>
    </Container>
  );
};
