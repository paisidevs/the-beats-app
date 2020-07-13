import {
  Animated,
  Box,
  Grid,
  H3,
  Image,
  ScrollView,
  Text,
} from "@paisidevs/tra-components";
import React, { FC } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import Truncate from "react-truncate";
import { Track } from "../../components";
import { Enum_Album_Releasetype, useAlbumQuery } from "../../generated/graphql";
import { useAnimations } from "../../hooks";
import { reduceArtists } from "../../utilities";

export const AlbumBreadcrumb: FC<RouteComponentProps<{ id: string }>> = ({
  match: { params },
}) => {
  const { data } = useAlbumQuery({
    variables: { id: params.id },
  });

  const isSingle = data?.album?.releaseType === Enum_Album_Releasetype.Single;

  return (
    <React.Fragment>
      {`${data?.album?.name}${isSingle ? " - Single" : ""}`}
    </React.Fragment>
  );
};

const ViewAlbum: FC = () => {
  const { useFadeIn, useFadeUp } = useAnimations();
  const { id } = useParams<{ id: string }>();
  const { data } = useAlbumQuery({ variables: { id } });

  const album = data?.album;
  const artists = album?.artists || [];
  const tracks = album?.tracks || [];

  return (
    <ScrollView>
      <Animated display="none" padding={2} style={useFadeIn}>
        <Grid gridTemplateColumns="5fr 7fr" gridGap={2} width="100%">
          <Box flex="none">
            <Image
              aspect={1}
              src={"http://localhost:1337" + album?.artwork?.url}
            />
          </Box>
          <Box flex={1}>
            <H3 fontSize={[4, 5]} fontWeight={500} margin={0}>
              <Truncate lines={3}>{album?.name}</Truncate>
            </H3>
            <Text lineHeight={1.5}>
              <Truncate lines={1}>{reduceArtists(artists)}</Truncate>
            </Text>
          </Box>
        </Grid>
      </Animated>
      <Animated style={useFadeUp} paddingX={2} width="100%">
        {tracks.map((track, index) =>
          track ? (
            <Box
              key={track.id}
              borderBottom={index === tracks.length - 1 ? 0 : 1}
              borderColor="border.default"
            >
              <Track showTrackNumber data={track} />
            </Box>
          ) : null
        )}
      </Animated>
    </ScrollView>
  );
};

export default ViewAlbum;
