import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const { push } = useRouter();

  return (
    <Flex
      h={["100vh", null, "50vh"]}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, #1DB954, #00BFFF)"
        bgClip="text"
        textAlign={["center", null, null]}
        lineHeight={["normal", null, "taller"]}
      >
        Spotify Playlist Generator
      </Heading>
      <Text
        color="whiteAlpha.600"
        fontWeight="bold"
        fontSize="medium"
        mt={["10", null, null]}
        maxW={["100%", null, "40%"]}
        textAlign="center"
        mb="10"
      >
        Unleash Your Musical Adventure Let Your Favorite Song Lead the Way. Your
        Personal Playlist Maestro. Create Playlists Tailored to Your Taste. Find
        Your Perfect Soundtrack Today!
      </Text>
      <Button
        colorScheme="green"
        bgGradient="linear(to-r, #1DB954, #00BFFF)"
        _hover={{
          boxShadow: "2xl",
          bgGradient: "linear(to-r, #00BFFF, #1DB954)",
        }}
        onClick={() => push("search")}
      >
        Let&rsquo;s create one 🔥
      </Button>
    </Flex>
  );
}
