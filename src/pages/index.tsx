import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const { push } = useRouter();

  return (
    <Flex
      h="50vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, #1DB954, #00BFFF)"
        bgClip="text"
        lineHeight="taller"
      >
        Spotify Playlist Generator
      </Heading>
      <Text
        color="whiteAlpha.600"
        fontWeight="bold"
        fontSize="medium"
        maxW="40%"
        textAlign="center"
        mb="10"
      >
        Unleash Your Musical Adventure Let Your Favorite Song Lead the Way. Your
        Personal Playlist Maestro. Create Playlists Tailored to Your Taste. Find
        Your Perfect Soundtrack Today!
      </Text>
      <Button
        boxShadow="2xl"
        colorScheme="green"
        bgGradient="linear(to-r, #1DB954, #00BFFF)"
        _hover={{
          bgGradient: "linear(to-r, #00BFFF, #1DB954)",
        }}
        onClick={() => push("search")}
      >
        Let&rsquo;s create one 🔥
      </Button>
    </Flex>
  );
}
