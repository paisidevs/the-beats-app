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
      prisma.artist.findMany({ orderBy: { name: "asc" } })
  },
  Artist: {
    albums: ({ id }, _, { prisma }: Context) => {
      return prisma.artist.findOne({ where: { id } }).albums();
    },
    avatar: ({ id }, _, { prisma }: Context) => {
      return prisma.artist.findOne({ where: { id } }).avatar();
    },
    featuresIn: ({ id }, _, { prisma }: Context) => {
      return prisma.artist.findOne({ where: { id } }).featuresIn();
    },
    tracks: ({ id }, _, { prisma }: Context) => {
      return prisma.artist.findOne({ where: { id } }).tracks();
    }
  },
  Node: {
    __resolveType() {
      return null;
    }
  }
};
