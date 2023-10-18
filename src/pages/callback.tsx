import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { Container, Spinner, Stack, Text } from "@chakra-ui/react";

import { useAuth } from "@/providers/AuthenticationProvider";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  const { signIn, isLogged } = useAuth();

  const handleSignIn = useCallback(() => {
    if (isLogged) {
      router.push("search");
      return;
    }

    if (code) {
      signIn(code);
      router.push("search");
    }
  }, [code, isLogged, router, signIn]);

  useEffect(() => {
    handleSignIn();
  }, [handleSignIn]);

  return (
    <Container
      h="full"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack alignItems="center">
        <Text color="green.300" fontSize="2xl">
          Logging you, wait a minute ...
        </Text>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
      </Stack>
    </Container>
  );
}
