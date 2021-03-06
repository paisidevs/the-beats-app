import { Context } from "../../typings";
import { generateAlias } from "../../utils";
import { UnknownError } from "../../utils/errors";

/**
 * Creates an artist
 * @param artist - Object of artist to create
 * @param context - Exposes prisma
 */
export const createArtist = async (artist, { prisma }: Context) => {
  const { name } = artist;
  const alias = generateAlias(name);

  const artistExists = await prisma.artist.findOne({ where: { alias } });

  if (artistExists) {
    return artistExists;
  }

  const payload = {
    alias,
    name
  };

  try {
    const createdArtist = await prisma.artist.create({ data: payload });

    return createdArtist;
  } catch (error) {
    throw new UnknownError({
      message: error.message
    });
  }
};

/**
 * Creates many artists
 * @param artists - Array of artists to create
 * @param context - Exposes prisma
 */
export const createArtists = async (artists, context: Context) => {
  if (!artists) {
    return;
  }

  if (artists.length < 1) {
    return [];
  }

  return new Promise<Array<{ id: number }>>(resolve => {
    const createdArtists = [];

    artists.forEach((artist, index) => {
      createArtist(artist, context).then(createdArtist => {
        createdArtists.push({ id: createdArtist.id });

        if (index === artists.length - 1) {
          resolve(createdArtists);
        }
      });
    });
  });
};
