import "@fontsource/roboto";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { Layout } from "@/components/layout";
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
        <Layout>
          <Component {...pageProps} theme={theme} />
        </Layout>
      </ChakraProvider>
    </SpotifyAPIProvider>
  );
}
