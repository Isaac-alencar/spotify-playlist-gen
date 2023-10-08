import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import "@fontsource/roboto";
import { SpotifyAPIProvider } from "@/providers/SpotifyAPIProvider";

export const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SpotifyAPIProvider>
      <ChakraProvider>
        <Component {...pageProps} theme={theme} />
      </ChakraProvider>
    </SpotifyAPIProvider>
  );
}
