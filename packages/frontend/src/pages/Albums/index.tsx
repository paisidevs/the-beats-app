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
import Truncate from "react-truncate";
import { useAlbumsQuery } from "../../generated/graphql";
import { useAnimations } from "../../hooks";
import { reduceArtists } from "../../utilities";

const Albums: React.FC = () => {
  const { useFadeUp } = useAnimations();
  const { data } = useAlbumsQuery({ fetchPolicy: "cache-and-network" });

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
          {data?.albums?.map((album) => (
            <Link key={album?.id} to={`/library/albums/${album?.id}`}>
              <Image
                aspect={1}
                src={"http://localhost:1337" + album?.artwork?.url}
              />
              <Box
                alignItems="center"
                backgroundColor="background.base"
                padding={2}
                width="100%"
              >
                <Text fontSize={[1, 2]} textAlign="center" width="100%">
                  <Truncate lines={1}>{album?.name}</Truncate>
                </Text>
                <Text
                  fontSize={[0, 1]}
                  opacity={0.65}
                  textAlign="center"
                  width="100%"
                >
                  <Truncate lines={1}>{reduceArtists(album?.artists)}</Truncate>
                </Text>
              </Box>
            </Link>
          ))}
        </Grid>
      </Animated>
    </ScrollView>
  );
};

export default Albums;
