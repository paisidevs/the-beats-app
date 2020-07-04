import { Context } from "../../typings";
import * as service from "./Artist.service";

/**
 * Resolvers for Artist
 */

export default {
  Mutation: {
    createArtist: (_, { input }, context: Context) =>
      service.createArtist(input, context)
  },
  Query: {
    artist: (_, { id }, { prisma }: Context) =>
      prisma.artist.findOne({ where: { id } }),
    artists: (_, __, { prisma }: Context) =>
      prisma.artist.findMany({ orderBy: { alias: "asc" } })
  },
  Artist: {
    albums: ({ id }, _, { prisma }: Context) => {
      return prisma.artist
        .findOne({ where: { id } })
        .albums({ orderBy: { name: "asc" } });
    },
    avatar: ({ id }, _, { prisma }: Context) => {
      return prisma.artist.findOne({ where: { id } }).avatar();
    },
    featuresIn: ({ id }, _, { prisma }: Context) => {
      return prisma.artist
        .findOne({ where: { id } })
        .featuresIn({ orderBy: { name: "asc" } });
    },
    tracks: ({ id }, _, { prisma }: Context) => {
      return prisma.artist
        .findOne({ where: { id } })
        .tracks({ orderBy: { name: "asc" } });
    }
  },
  Node: {
    __resolveType() {
      return null;
    }
  }
};
