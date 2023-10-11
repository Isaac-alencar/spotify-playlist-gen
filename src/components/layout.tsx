import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxW="100%" w="full" minH="100vh" h="full" bg="black">
      {children}
    </Container>
  );
};
