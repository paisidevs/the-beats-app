import { ScrollView } from "@paisidevs/tra-components";
import React from "react";
import { Helmet } from "react-helmet";

const Playlists: React.FC = () => {
  return (
    <ScrollView>
      <Helmet>
        <title>the-beats-app - Playlists</title>
      </Helmet>
    </ScrollView>
  );
};

export default Playlists;
