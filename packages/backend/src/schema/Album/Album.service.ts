import { AlbumCreateInput } from "@prisma/client";
import { Context } from "../../typings";
import { generateAlias, getAuthenticatedUser, getDuration } from "../../utils";
import {
  AlbumExistsError,
  ForbiddenError,
  UnknownError
} from "../../utils/errors";
import { createArtists } from "../Artist/Artist.service";
import { createTracks } from "../Track/Track.service";

/**
 * Creates an album
 * @param album - An input object
 * @param context - Exposes prisma
 */
export const createAlbum = async (album, context: Context) => {
  const { prisma, request } = context;

  const authenticatedUserRole = getAuthenticatedUser(request).role;

  if (authenticatedUserRole !== "ADMIN") {
    throw new ForbiddenError({
      message: "You do not have permission to create an album."
    });
  }

  const { artists, name, releaseDate, releaseType, tracks, genres } = album;
  const alias = generateAlias(name, { suffix: releaseType });

  const albumExists = await prisma.album.findOne({ where: { alias } });

  if (albumExists) {
    throw new AlbumExistsError();
  }

  const numTracks = tracks ? tracks.length : 0;
  const duration = tracks ? getDuration(tracks) : 0;

  const artistsToConnect = await createArtists(artists, context);

  const payload: AlbumCreateInput = {
    alias,
    name,
    releaseDate,
    releaseType,
    numTracks,
    duration,
    genres: { set: genres },
    artists: {
      connect: artistsToConnect
    },
    uploadedBy: {
      connect: { id: getAuthenticatedUser(request).id }
    }
  };

  try {
    const createdAlbum = await prisma.album.create({ data: payload });
    // Create tracks and connect them to 'createdAlbum'
    await createTracks(tracks, context, createdAlbum);

    return createdAlbum;
  } catch (error) {
    throw new UnknownError({
      message: error.message
    });
  }
};
