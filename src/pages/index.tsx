import { Flex, Heading, Text } from "@chakra-ui/react";

import { LogInButton } from "@/components/login-button";

import React from "react";

export default function Home() {
  return (
    <Flex
      h={["100vh", null, null]}
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
        Unleash Your Musical Adventure Let Your Favorite Song Lead the Way.
        Create Playlists Tailored to Your Taste!
      </Text>
      <Flex flexDir="column" alignItems="center" gap={4}>
        <LogInButton />
      </Flex>
    </Flex>
  );
}
