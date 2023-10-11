import React from "react";

import { useSpotifyAPI } from "@/providers/SpotifyAPIProvider";
import { PlaylistGrid } from "@/components/playlist";

export default function Playlist() {
  const { playlistSeed } = useSpotifyAPI();

  return (
    <React.Fragment>
      <PlaylistGrid playlist={playlistSeed} />
    </React.Fragment>
  );
}
