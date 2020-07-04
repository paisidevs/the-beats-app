import { Box, Flex, Image, Text } from "@paisidevs/tra-components";
import React, { FC } from "react";
import { API_HOST } from "../../constants";
import { Track as TTrack } from "../../generated/graphql";
import { reduceArtists } from "../../utilities";
import Explicit from "../Explicit";

const Track: FC<{ data: TTrack; showTrackNumber?: boolean }> = ({
  data: track,
  showTrackNumber,
}) => {
  return (
    <Box flexDirection="row" paddingY={1} width="100%">
      <Box justifyContent="center" flex="none" size={40} marginRight={1}>
        {showTrackNumber && (
          <Box alignItems="flex-end" fontSize={2} opacity={0.65} padding={1}>
            {track?.trackNumber}
          </Box>
        )}
        {!showTrackNumber && (
          <Image aspect={1} src={`${API_HOST}${track?.album?.artwork?.url}`} />
        )}
      </Box>
      <Box truncate>
        <Flex alignItems="center">
          <Text truncate fontSize={2} width="100%">
            {`${track?.name}${reduceArtists(track?.featuring, {
              isFeaturing: true,
            })}`}
          </Text>
          {track?.explicit && <Explicit />}
        </Flex>
        <Text truncate fontSize={1} opacity={0.65} width="100%">
          {reduceArtists(track?.artists)}
        </Text>
      </Box>
    </Box>
  );
};

export default Track;
