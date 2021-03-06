import { Context } from "../../typings";
import { getDuration } from "../../utils";
import { UnknownError } from "../../utils/errors";
import { createArtists } from "../Artist/Artist.service";

/**
 * Creates an track
 * @param track - Object of track to create
 * @param context - Exposes prisma
 */
// TODO: We need to think about handling possible duplicates.
export const createTrack = async (
  track,
  context: Context,
  album = { id: undefined }
) => {
  const { prisma } = context;
  const { artists, featuring, name, trackNumber } = track;

  const artistsToConnect = await createArtists(artists, context);
  const featuringToConnect = await createArtists(featuring, context);

  const payload = {
    name,
    trackNumber,
    duration: getDuration(track),
    genre: "",
    album: {
      connect: { id: album.id }
    },
    artists: {
      connect: artistsToConnect
    },
    featuring: {
      connect: featuringToConnect
    }
  };

  try {
    const createdTrack = await prisma.track.create({ data: payload });

    return createdTrack;
  } catch (error) {
    throw new UnknownError({
      message: error.message
    });
  }
};

/**
 * Creates many tracks
 * @param tracks - Array of tracks to create
 * @param context - Exposes prisma
 */
export const createTracks = async (tracks, context: Context, album) => {
  if (!tracks) {
    return;
  }

  return new Promise<Array<any>>(resolve => {
    const createdTracks = [];

    tracks.forEach((track, index) => {
      createTrack(track, context, album).then(createdTrack => {
        createdTracks.push({ id: createdTrack.id });

        if (index === tracks.length - 1) {
          resolve(createdTracks);
        }
      });
    });
  });
};
