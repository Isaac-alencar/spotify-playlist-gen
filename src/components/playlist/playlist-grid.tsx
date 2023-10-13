import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";

import { Track } from "@/domain/Track";
import { SongInfo } from "./song-info";

export const PlaylistGrid = ({ playlist }: { playlist: Track[] }) => {
  const { push } = useRouter();

  if (!playlist.length)
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        minH="50vh"
        h="full"
        flexDir="column"
      >
        <Text color="gray.200" fontWeight="bold" textAlign="center">
          You have not generated your playlist yet! :)
        </Text>
        <Button colorScheme="green" variant="link" onClick={() => push("/")}>
          Generate one!
        </Button>
      </Flex>
    );

  return (
    <Box width="full" maxW="container.md" mx="auto" py={8}>
      <Grid
        bg="whiteAlpha.200"
        borderRadius="md"
        border="1px"
        borderColor="whiteAlpha.300"
        templateColumns={["1fr", null, "repeat(2, 50%)"]}
        alignItems="center"
      >
        {playlist.map((item) => {
          return (
            <GridItem key={item.id} p={4} overflow="hidden">
              <Flex alignItems="center" gap={4} justifyContent="space-between">
                <Flex alignItems="center" gap={4}>
                  <Image src={item.albumCover} alt={item.album} w="24" h="24" />
                  <SongInfo track={item} />
                </Flex>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
      <Flex
        justifyContent="center"
        alignItems="center"
        minH="10vh"
        h="full"
        flexDir="column"
      >
        <Text color="gray.200" fontWeight="bold" textAlign="center">
          Didn&rsquo;t like it?
        </Text>
        <Button
          colorScheme="green"
          variant="link"
          onClick={() => push("search")}
        >
          Generate a new one!
        </Button>
      </Flex>
    </Box>
  );
};
