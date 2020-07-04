import { Box, H2, ScrollView } from "@paisidevs/tra-components";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const links = [
    { label: "Playlists", to: "/library/playlists" },
    { label: "Artists", to: "/library/artists" },
    { label: "Albums", to: "/library/albums" },
    { label: "Songs", to: "/library/songs" },
  ];

  return (
    <ScrollView>
      <Helmet>
        <title>the-beats-app - Built with love by @paisidevs</title>
      </Helmet>
      <Box padding={2}>
        <H2 fontSize={[6, 7]} margin={0} marginBottom={2}>
          Library
        </H2>
        {links.map(({ label, to }, index) => (
          <Link key={index} to={to}>
            <Box
              borderBottom={1}
              borderTop={index === 0 ? 1 : 0}
              borderColor="border.default"
              paddingY={2}
            >
              {label}
            </Box>
          </Link>
        ))}
      </Box>
    </ScrollView>
  );
};

export default Home;
