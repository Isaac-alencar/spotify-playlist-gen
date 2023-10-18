import { FaSpotify } from "react-icons/fa";
import { Button, Container, Flex } from "@chakra-ui/react";

import { useAuth } from "@/providers/AuthenticationProvider";

export const LogInButton = () => {
  const { requestUserAuth } = useAuth();

  return (
    <Container>
      <Flex width="100%" justifyContent="center">
        <Button
          colorScheme="green"
          bgGradient="linear(to-r, #1DB954, #00BFFF)"
          _hover={{
            boxShadow: "2xl",
            bgGradient: "linear(to-r, #00BFFF, #1DB954)",
          }}
          onClick={requestUserAuth}
        >
          Log in with Spotify
          <FaSpotify
            size={24}
            color="#191414"
            style={{ marginLeft: "0.5rem" }}
          />
        </Button>
      </Flex>
    </Container>
  );
};
