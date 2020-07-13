import { Animated, Box, Loader, ScrollView } from "@paisidevs/tra-components";
import { logger } from "@paisidevs/tra-utilities";
import React, { FC } from "react";
import { Track } from "../../components";
import { useTracksQuery } from "../../generated/graphql";
import { useAnimations } from "../../hooks";

const Songs: FC = () => {
  const { useFadeUp } = useAnimations();
  const { data, loading } = useTracksQuery({
    variables: { sort: "name:asc" },
  });
  logger({ data });

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <Animated style={useFadeUp} paddingX={2} width="100%">
        {data.tracks?.map((track, index) =>
          track ? (
            <Box
              key={track.id}
              borderBottom={
                data?.tracks && index === data.tracks.length - 1 ? 0 : 1
              }
              borderColor="border.default"
            >
              <Track data={track} />
            </Box>
          ) : null
        )}
      </Animated>
    </ScrollView>
  );
};

export default Songs;
