import {
  Animated,
  Box,
  Grid,
  Image,
  ScrollView,
  Text,
} from "@paisidevs/tra-components";
import {} from "@paisidevs/tra-hooks";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useArtistsQuery } from "../../generated/graphql";
import { useAnimations } from "../../hooks";

const Artists: React.FC = () => {
  const { useFadeUp } = useAnimations();
  const { data } = useArtistsQuery({
    fetchPolicy: "cache-and-network",
    variables: { sort: "alias:asc" },
  });

  return (
    <ScrollView>
      <Helmet>
        <title>the-beats-app - Built with love by @paisidevs</title>
      </Helmet>
      <Animated style={useFadeUp}>
        <Grid
          gridTemplateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
          gridGap={[2, 4]}
          padding={[2, 4]}
          width="100%"
        >
          {data?.artists?.map((artist) => (
            <Link key={artist?.id} to={`/library/artists/${artist?.id}`}>
              <Image
                aspect={1}
                src={"http://localhost:1337" + artist?.avatar?.url}
              />
              <Box
                alignItems="center"
                backgroundColor="background.base"
                padding={2}
              >
                <Text fontSize={[1, 2]}>{artist?.name}</Text>
              </Box>
            </Link>
          ))}
        </Grid>
      </Animated>
    </ScrollView>
  );
};

export default Artists;
